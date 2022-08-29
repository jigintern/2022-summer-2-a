import { host, isSecureProtocol } from "@/connect/hostEnv"
import { authToken } from "@/connect/authToken"

export type OnMessageCallBack = (socket: Socket, event: MessageEvent<string>) => void | Promise<void>
export type OnOpenCallBack = (socket: Socket, event: Event) => void | Promise<void>;

export class Socket {

    private socket: WebSocket;
    private isPingedButNotReturnedPong = false;

    private onMessage: OnMessageCallBack = () => {};
    private onOpen: OnOpenCallBack = () => {};

    private static readonly PROTOCOl = isSecureProtocol() ? "wss" : "ws";
    private static readonly PING_INTERVAL = 10 * 1000;
    private static readonly ON_ERROR = (event: Event) => console.error(event);

    private constructor(
        private readonly url: string,
    ) {
        // connect(); だとsocketが未定義判定になってできない
        this.socket = new WebSocket(this.url);
        this.connect();
        this.continuousPing();
    }

    public static makeByEnv = (path: string): Socket => {
        return new Socket(`${this.PROTOCOl}://${host()}` + path);
    }

    public send = async (data: Object | Record<string, unknown>): Promise<void> => {
        const authedData = Object.assign(data, { authentication: await authToken() });
        const json = JSON.stringify(authedData);
        this.socket.send(json);
    }

    public set onmessage(cb: OnMessageCallBack) {
        this.onMessage = cb;
        this.socket.onmessage = this.wsOnMessage;
    }

    public set onopen(cb: OnOpenCallBack) {
        this.onOpen = cb;
        this.socket.onopen = this.wsOnOpen;
    }

    private connect = (): void => {
        this.socket = new WebSocket(this.url);
        this.socket.onerror = Socket.ON_ERROR;
        this.socket.onclose = this.connect;
        this.socket.onmessage = this.wsOnMessage;
        this.socket.onopen = this.wsOnOpen;
    }

    private wsOnMessage = (event: MessageEvent<string>): void | Promise<void> => {
        if (this.onPong(event)) return;
        return this.onMessage(this, event);
    }

    private wsOnOpen = (event: Event): void | Promise<void> => {
        return this.onOpen(this, event);
    }

    /** 一定時間ごとにpingを送信し、pongが返ってこなければ、再接続する */
    private continuousPing = (): void => {
        setInterval(async () => {
            this.sendPing();
            await this.checkPong;
        }, Socket.PING_INTERVAL);
    }

    private sendPing = (): void => {
        this.socket.send("ping");
        this.isPingedButNotReturnedPong = true;
    }

    /** 1秒以内にpongが返ってきていなければ再接続する */
    private checkPong = async (): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (this.isPingedButNotReturnedPong) this.connect();
    }

    /** pong時の行動
     * @param event
     * @return pongメッセージならばtrue
     */
    private onPong = (event: MessageEvent<string>): boolean => {
        if (event.data !== 'pong') return false;
        this.isPingedButNotReturnedPong = false;
        return true;
    }

}