import { host, isSecureProtocol } from "@/connect/hostEnv"
import { addAuthHeader } from "@/connect/authToken"

export class WebAPI {

    private constructor(
        private readonly baseURL: string,
    ) {}

    private static readonly PROTOCOL = isSecureProtocol() ? "https" : "http";
    public static readonly ENV_URL = `${this.PROTOCOL}://${host()}`;

    public static makeByEnv = (): WebAPI => {
        return new WebAPI(this.ENV_URL);
    }

    public fetch = async (path: string, init: RequestInit = {}) => {
        const headers = new Headers(init.headers);
        await addAuthHeader(headers);
        init.headers = headers;
        await fetch(this.baseURL + path, init);
    }
}