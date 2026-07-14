import { createContext, useContext, useMemo, useCallback } from "react";
import type { UserDto } from "../models/UserDto";
import type { LoginRequestDto } from "../models/LoginRequestDto";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import authService from "../api/authService";
import userService from "../../dashboard/settings/api/UserService";
import type { AuthResponseDto } from "../models/AuthResponseDto";
import type { SignUpRequestDto } from "../models/SignUpRequestDto";


const TOKEN_STORAGE_KEY = "token";
const USER_QUERY_KEY = ["auth", "user"] as const;

type AuthState = {
    user: UserDto | null;
    /** True while the initial user fetch (from a saved token) is in flight. */
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
     * Loads the current user from the saved token when the app starts.
     * Login/signup seed this same cache key, so consumers read one source of truth.
     */
    const { data: user = null, isLoading } = useQuery<UserDto | null>({
        queryKey: USER_QUERY_KEY,
        queryFn: () => userService.me(),
        enabled: Boolean(localStorage.getItem(TOKEN_STORAGE_KEY)),
        retry: false,
        staleTime: Infinity,
    });

    /**
     * Persists the returned JWT and seeds the user cache from an auth response,
     * keeping login and signup in sync.
     */
    const applyAuthResponse = useCallback(({ token, userDto }: AuthResponseDto) => {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
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
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        queryClient.setQueryData(USER_QUERY_KEY, null);
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