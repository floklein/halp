import { db } from "@/db";
import {
  Dilemma,
  dilemma as dilemmaTable,
  vote as voteTable,
} from "@/db/schema";
import { auth } from "@/utils/auth";
import { dilemmaBodySchema } from "@/zod";
import { and, eq, notExists, sql } from "drizzle-orm";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  const dilemmas = session
    ? await db
        .select()
        .from(dilemmaTable)
        .where(
          notExists(
            db
              .select({ temp: sql`1` })
              .from(voteTable)
              .where(
                and(
                  eq(voteTable.userId, session.user.id),
                  eq(voteTable.dilemmaId, dilemmaTable.id),
                ),
              ),
          ),
        )
    : await db.select().from(dilemmaTable);
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
