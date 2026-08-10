import { accessTokenStore } from "../contexts/accessTokenStore";
import axios, { type InternalAxiosRequestConfig } from "axios";
import { refreshSession } from "./refreshSession";

/**
 * An axios request config tagged with `hasBeenRetried` so a request that has
 * already been replayed after a token refresh is never retried a second time.
 */
type RetriableRequestConfig = InternalAxiosRequestConfig & {
    hasBeenRetried?: boolean;
};

/**
 * Installs a global axios response interceptor that transparently recovers from
 * an expired access token.
 *
 * When a protected request fails with 401, it refreshes the access token once,
 * replays the original request with the new token, and returns its result so
 * callers never observe the expiry. If the refresh is itself rejected with 401
 * the session is gone for good, so the stored token is cleared and
 * `onSessionExpired` is invoked to let the caller tear down its own state (e.g.
 * clear the cached user). A refresh that fails for any other reason is treated
 * as a transient error and leaves the session intact.
 *
 * Guards that keep this from looping forever:
 * - Only 401 responses are handled; everything else is rejected untouched.
 * - Requests to `/api/auth/*` (including the refresh call) are ignored, so a
 *   failing refresh cannot trigger another refresh.
 * - Each request is retried at most once, tracked via `hasBeenRetried`.
 * - Requests that fail together share one refresh instead of racing.
 *
 * @param onSessionExpired Called when the session cannot be recovered.
 * @returns A cleanup function that removes the interceptor.
 */
export function registerAuthInterceptor(onSessionExpired: () => void) {
    const interceptorId = axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const failedRequest = error.config as RetriableRequestConfig | undefined;
            const isUnauthorized = axios.isAxiosError(error) && error.response?.status === 401;
            const isAuthEndpoint = failedRequest?.url?.includes("/api/auth/") ?? false;

            if (!isUnauthorized || !failedRequest || failedRequest.hasBeenRetried || isAuthEndpoint) {
                return Promise.reject(error);
            }

            failedRequest.hasBeenRetried = true;

            try {
                const { accessToken } = await refreshSession();
                failedRequest.headers.Authorization = `Bearer ${accessToken}`;
                return await axios(failedRequest);
            } catch (refreshError) {
                const sessionRejected =
                    axios.isAxiosError(refreshError) && refreshError.response?.status === 401;
            
                if (sessionRejected) {
                    accessTokenStore.remove();
                    onSessionExpired();
                }
            
                return Promise.reject(error);
            }
        },
    );

    return () => axios.interceptors.response.eject(interceptorId);
}
