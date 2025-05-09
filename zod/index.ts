import { dilemma } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const dilemmaSchema = createSelectSchema(dilemma);

export const dilemmaBodySchema = z.object({
  question: z
    .string()
    .min(1, "question is required")
    .max(100, "question is too long"),
  options: z
    .array(
      z.string().min(1, "choice is required").max(50, "choice is too long"),
    )
    .min(2)
    .max(2),
});

export type DilemmaBody = z.infer<typeof dilemmaBodySchema>;

export const voteBodySchema = z.object({
  option: z.enum(["0", "1", "skipped"]),
});

export type VoteBody = z.infer<typeof voteBodySchema>;

export const votesSummaryBodySchema = z.object({
  dilemmaId: z.string().min(1),
});

export type VotesSummaryBody = z.infer<typeof votesSummaryBodySchema>;
