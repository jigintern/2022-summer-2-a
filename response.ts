import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts"

export const publicFileResponse = (req: Request) => serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
});

export const indexHTMLResponse = async (): Promise<Response> => {
    const indexHTMLText = await Deno.readTextFile('./public/index.html');
    const HTMLHeaders = new Headers({ "Content-Type": "text/html; charset=utf-8" })
    return new Response(indexHTMLText, { headers: HTMLHeaders });
}