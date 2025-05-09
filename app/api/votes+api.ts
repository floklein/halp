import { db } from "../../db";
import { Vote, vote as voteTable } from "../../db/schema";
import { auth } from "../../utils/auth";
import { voteBodySchema } from "../../zod";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) {
    return Response.json("Unauthorized", { status: 401 });
  }
  const { success, data, error } = voteBodySchema.safeParse(
    await request.json()
  );
  if (!success) {
    return Response.json(error.format(), { status: 400 });
  }
  const vote: Vote = {
    id: crypto.randomUUID(),
    userId: session.user.id,
    dilemmaId: data.dilemmaId,
    option: data.option,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await db.insert(voteTable).values(vote);
  return Response.json(vote);
}
