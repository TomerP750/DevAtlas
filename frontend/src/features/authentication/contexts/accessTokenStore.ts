let accessToken: string | null = null;

export const accessTokenStore = {
    get: () => accessToken,
    set: (token: string) => { accessToken = token; },
    remove: () => { accessToken = null; },
}