import type { AppRouter } from "@scope/server/trpc";
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    loggerLink(
      // nothing..
    ),

    httpBatchLink({
      url: `${"http://localhost:3000"}/api/trpc`,
    }),
  ],
});
