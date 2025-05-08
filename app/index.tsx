import { useQuery } from "@tanstack/react-query";
import { View, ZStack } from "tamagui";
import DilemmaCard from "../components/DilemmaCard";
import { Dilemma } from "../types/dilemma";

export default function Index() {
  const { data: dilemmas } = useQuery<Dilemma[]>({
    queryKey: ["dilemmas"],
    queryFn: async () => (await fetch("/api/dilemmas")).json(),
  });

  return (
    <View height="100%" px="$2">
      <ZStack height="100%">
        {dilemmas?.map((dilemma, index) => (
          <DilemmaCard
            key={dilemma.id}
            zIndex={dilemmas.length - index - 1}
            dilemma={dilemma}
          />
        ))}
      </ZStack>
    </View>
  );
}
