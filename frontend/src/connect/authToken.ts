import { WebAPI } from "@/connect/webAPI"

const tokenKey = 'token';

const fetchToken = async (): Promise<string> => {
    const response = await fetch(WebAPI.ENV_URL + "/auth");
    const token = await response.text();
    sessionStorage.setItem(tokenKey, token);
    return token;
}

export const authToken = async (): Promise<string> => {
    const sessionToken = sessionStorage.getItem(tokenKey);
    if (sessionToken !== null) return sessionToken;
    return await fetchToken();
}

export const addAuthHeader = async (headers: Headers): Promise<void> => {
    const token = await authToken();
    headers.append('Authorization', `Bearer: ${token}`);
}