import { createContext, useContext, useMemo, useCallback, useState, useEffect } from "react";
import type { UserDto } from "../models/UserDto";
import type { LoginRequestDto } from "../models/LoginRequestDto";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import authService from "../api/authService";
import type { AuthResponseDto } from "../models/AuthResponseDto";
import type { SignUpRequestDto } from "../models/SignupRequestDto";
import { accessTokenStore } from "./accessTokenStore";
import axios from "axios";
import sessionHint from "./sessionHint";
import { registerAuthInterceptor } from "../api/registerAuthInterceptor";
import { discardRefreshSession, refreshSession } from "../api/refreshSession";


const USER_QUERY_KEY = ["auth", "user"] as const;

type AuthState = {
    user: UserDto | null;
    /** True while the initial user fetch (from the refresh cookie) is in flight. */
    isLoading: boolean;
}

type AuthContextValues = AuthState & {
    login: (dto: LoginRequestDto) => Promise<void>;
    signup: (dto: SignUpRequestDto) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValues | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

    const queryClient = useQueryClient();

    /**
     * Whether this browser was left logged in, read once on mount. Later logins
     * seed the cache directly, so this only decides if the app starts by trying
     * to restore a session.
     */
    const [hasSessionHint] = useState(sessionHint.exists);

    /**
     * Restores the user from the refresh cookie when the app starts, so a reload
     * or a new tab does not drop the session along with the in-memory token.
     * Login/signup seed this same cache key, so consumers read one source of truth.
     *
     * Goes through `refreshSession` rather than calling the endpoint directly so
     * that requests which 401 during this first render wait on this exchange
     * instead of spending the rotating cookie a second time.
     *
     * Skipped entirely for visitors with no session hint: they have no refresh
     * cookie to exchange, and the request would only ever come back 401.
     */
    const { data: user = null, isLoading } = useQuery<UserDto | null>({
        queryKey: USER_QUERY_KEY,
        queryFn: async () => {
            try {
                const { userDto } = await refreshSession();
                return userDto;
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    sessionHint.clear();
                    return null;
                }
                throw error;
            }
        },
        enabled: hasSessionHint,
        retry: false,
        staleTime: Infinity,
    });

    useEffect(() => {
        return registerAuthInterceptor(() => {
            sessionHint.clear();
            queryClient.setQueryData(USER_QUERY_KEY, null);
        });
    }, [queryClient]);

    /**
     * Persists the returned JWT and seeds the user cache from an auth response,
     * keeping login and signup in sync.
     */
    const applyAuthResponse = useCallback(({ accessToken, userDto }: AuthResponseDto) => {
        accessTokenStore.set(accessToken);
        sessionHint.set();
        queryClient.setQueryData(USER_QUERY_KEY, userDto);
    }, [queryClient]);

    /**
     * Authenticates the user, stores the returned JWT, and seeds the user cache.
     */
    const login = useCallback(async (dto: LoginRequestDto) => {
        applyAuthResponse(await authService.login(dto));
    }, [applyAuthResponse]);

    /**
     * Creates a new account, stores the returned JWT, and seeds the user cache.
     */
    const signup = useCallback(async (dto: SignUpRequestDto) => {
        applyAuthResponse(await authService.signUp(dto));
    }, [applyAuthResponse]);

    /**
     * Logs the user out locally by removing the token and clearing cached user data.
     */
    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } finally {
            discardRefreshSession();
            accessTokenStore.remove();
            sessionHint.clear();
            queryClient.setQueryData(USER_QUERY_KEY, null);
        }
    }, [queryClient]);

    const ctx = useMemo<AuthContextValues>(
        () => ({ user, isLoading, login, signup, logout }),
        [user, isLoading, login, signup, logout],
    );

    return (
        <AuthContext.Provider value={ctx}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
