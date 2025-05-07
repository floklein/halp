import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { publicProcedure, router } from "./trpc.js";

const appRouter = router({
  dilemma: {
    list: publicProcedure.query(() => {
      return [];
    }),
  },
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
