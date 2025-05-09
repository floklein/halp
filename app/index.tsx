import DilemmaCard from "@/components/DilemmaCard";
import type { Dilemma } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { View, ZStack } from "tamagui";

export default function Index() {
  const { data: dilemmas } = useQuery<Dilemma[]>({
    queryKey: ["dilemmas"],
    queryFn: async () => (await axios.get("/api/dilemmas")).data,
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
