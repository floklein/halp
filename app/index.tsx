import { View, ZStack } from "tamagui";
import DilemmaCard, { Dilemma } from "../components/DilemmaCard";

export default function Index() {
  const dilemmas: Dilemma[] = [];

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
