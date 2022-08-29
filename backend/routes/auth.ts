import { HandlerContext, Handlers } from "$fresh/src/server/types.ts";

export const handler: Handlers = {
  GET(req: Request, _ctx: HandlerContext) {
    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    return new Response("Hello");
  },
};
