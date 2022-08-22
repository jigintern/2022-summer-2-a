import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";

serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(Deno.env.toObject())
  console.log(Deno.env.get("HOST"))
  if (pathname === '/host') return new Response(Deno.env.get("HOST"));
  console.log(pathname)
  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
