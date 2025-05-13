import { reset, seed } from "drizzle-seed";
import { db } from ".";
import { account, dilemma, session, user, verification, vote } from "./schema";

async function main() {
  await reset(db, { user, session, account, verification, dilemma, vote });
  await seed(db, { user, account, dilemma, vote }).refine((f) => ({
    user: {
      count: 100,
      with: {
        account: 1,
        dilemma: 10,
        vote: 50,
      },
    },
    dilemma: {
      columns: {
        question: f.loremIpsum({
          sentencesCount: 1,
        }),
        options: f.loremIpsum({
          sentencesCount: 1,
          arraySize: 2,
        }),
      },
    },
    vote: {
      columns: {
        option: f.valuesFromArray({ values: ["0", "1", "skipped"] }),
      },
    },
  }));
}

main();
