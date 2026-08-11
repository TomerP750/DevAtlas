import { accessTokenStore } from "../contexts/accessTokenStore";
import type { AuthResponseDto } from "../models/AuthResponseDto";
import authService from "./authService";

let refreshInFlight: Promise<AuthResponseDto> | null = null;

/**
 * Exchanges the refresh cookie for a new access token and stores it.
 *
 * Concurrent callers share a single request: the cookie is rotated server side,
 * so a second parallel exchange would send an already-used token and end the
 * session. Every refresh in the app must go through here for that to hold.
 */
export function refreshSession(): Promise<AuthResponseDto> {
    if (refreshInFlight) {
        return refreshInFlight;
    }

    const request: Promise<AuthResponseDto> = authService
        .refreshToken()
        .then((response) => {
            // A logout may have landed while this was in flight; adopting its
            // token would revive the session the user just ended.
            if (refreshInFlight === request) {
                accessTokenStore.set(response.access_token);
            }
            return response;
        })
        .finally(() => {
            if (refreshInFlight === request) {
                refreshInFlight = null;
            }
        });

    refreshInFlight = request;
    return request;
}

/**
 * Detaches any in-flight refresh so its response is ignored. Called on logout.
 */
export function discardRefreshSession() {
    refreshInFlight = null;
}
