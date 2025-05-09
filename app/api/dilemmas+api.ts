import { db } from "../../db";
import type { Dilemma } from "../../db/schema";
import { dilemma as dilemmaTable } from "../../db/schema";
import { auth } from "../../utils/auth";
import { dilemmaBodySchema } from "../../zod";

export async function GET(request: Request) {
  const dilemmas = await db.select().from(dilemmaTable);
  return Response.json(dilemmas);
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) {
    return Response.json("Unauthorized", { status: 401 });
  }
  const { success, data, error } = dilemmaBodySchema.safeParse(
    await request.json(),
  );
  if (!success) {
    return Response.json(error.format(), { status: 400 });
  }
  const dilemma: Dilemma = {
    id: crypto.randomUUID(),
    question: data.question,
    options: data.options as [string, string],
    userId: session.user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await db.insert(dilemmaTable).values(dilemma);
  return Response.json(dilemma);
}
