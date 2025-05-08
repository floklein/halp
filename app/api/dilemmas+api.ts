import { Dilemma } from "../../types/dilemma";

export function GET(request: Request) {
  const dilemmas: Dilemma[] = [
    {
      id: "1",
      question: "next trip plsss?",
      options: ["italy", "france"],
    },
    {
      id: "2",
      question: "what should i wear for my date?",
      options: ["black", "white"],
    },
    {
      id: "3",
      question: "lunch?",
      options: ["pizza", "burger"],
    },
  ];
  return Response.json(dilemmas);
}
