import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts"

export const publicFileResponse = (req: Request) => serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
});

export const indexHTMLResponse = (url: URL) => fetch(`${url.protocol}//${url.host}`)