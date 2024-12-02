import type { APIHandler } from "@solidjs/start/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { router } from "./procedures.ts";
import { test } from "./routers/TestRouter.ts";

export type AppRouter = typeof appRouter;
const appRouter = router({
  test,
});

export const createHandlers = () => {
  const handler: APIHandler = ({ request }) =>
    fetchRequestHandler({
      createContext: () => Promise.resolve(),
      endpoint: "/api/trpc",
      router: appRouter,
      req: request,
    });

  return { GET: handler, POST: handler };
};
