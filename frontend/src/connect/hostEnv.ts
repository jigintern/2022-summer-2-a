export const isSecureProtocol = (): boolean => {
    return import.meta.env.VITE_PROTOCOL === "secure";
}

export const host = (): string => {
    return import.meta.env.VITE_HOST;
}