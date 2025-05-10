import { db } from "@/db";
import { Vote, vote as voteTable } from "@/db/schema";
import { auth } from "@/utils/auth";
import { voteBodySchema } from "@/zod";
import { and, count, eq } from "drizzle-orm";

export interface VotesSummary {
  votes: [number, number];
}

export async function GET(request: Request, params: { dilemmaId: string }) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) {
    return Response.json("Unauthorized", { status: 401 });
  }
  const userVotes = await db
    .select({ id: voteTable.id })
    .from(voteTable)
    .where(
      and(
        eq(voteTable.userId, session.user.id),
        eq(voteTable.dilemmaId, params.dilemmaId),
      ),
    )
    .limit(1);
  if (userVotes.length === 0) {
    return Response.json("you must vote first", { status: 403 });
  }
  const voteCounts = await db
    .select({
      option: voteTable.option,
      count: count(voteTable.option),
    })
    .from(voteTable)
    .where(eq(voteTable.dilemmaId, params.dilemmaId))
    .groupBy(voteTable.option);
  let votesForOption0 = 0;
  let votesForOption1 = 0;
  for (const row of voteCounts) {
    if (row.option === "0") {
      votesForOption0 = row.count;
    } else if (row.option === "1") {
      votesForOption1 = row.count;
    }
  }
  const summary: VotesSummary = {
    votes: [votesForOption0, votesForOption1],
  };
  return Response.json(summary);
}

export async function POST(request: Request, params: { dilemmaId: string }) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) {
    return Response.json("Unauthorized", { status: 401 });
  }
  const existingVotes = await db
    .select({ id: voteTable.id })
    .from(voteTable)
    .where(
      and(
        eq(voteTable.userId, session.user.id),
        eq(voteTable.dilemmaId, params.dilemmaId),
      ),
    )
    .limit(1);
  if (existingVotes.length > 0) {
    return Response.json({ message: "you already voted" }, { status: 409 });
  }
  const { success, data, error } = voteBodySchema.safeParse(
    await request.json(),
  );
  if (!success) {
    return Response.json(error.format(), { status: 400 });
  }
  const vote: Vote = {
    id: crypto.randomUUID(),
    userId: session.user.id,
    dilemmaId: params.dilemmaId,
    option: data.option,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await db.insert(voteTable).values(vote);
  return Response.json(vote);
}
