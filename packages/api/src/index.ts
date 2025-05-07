import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { publicProcedure, router } from "./trpc.js";

export interface Dilemma {
  id: string;
  question: string;
  options: [string, string];
}

const appRouter = router({
  dilemma: {
    list: publicProcedure.query<Dilemma[]>(() => {
      return [
        {
          id: "1",
          question: "next holidays plsss",
          options: ["italy", "france"],
        },
        {
          id: "2",
          question: "what should i wear for my date?",
          options: ["suit", "casual"],
        },
        {
          id: "3",
          question: "what should i eat for lunch?",
          options: ["pizza", "salad"],
        },
      ];
    }),
  },
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
});

server.listen(3000);
