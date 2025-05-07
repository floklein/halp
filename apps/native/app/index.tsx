import { useQuery } from "@tanstack/react-query";
import { View, ZStack } from "tamagui";
import DilemmaCard from "../components/DilemmaCard";
import { useTRPC } from "../utils/trpc";

export default function Index() {
  const trpc = useTRPC();

  const { data } = useQuery(trpc.dilemma.list.queryOptions());

  const dilemmas = data?.toReversed() ?? [];

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
