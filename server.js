import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
import { indexHTMLResponse, publicFileResponse } from "./response.ts";

await serve(async (req) => {
  const url = new URL(req.url);
  console.log(url.pathname);

  const fileResponse = await publicFileResponse(req);
  return fileResponse.status === 404 ? indexHTMLResponse(url) : fileResponse
});