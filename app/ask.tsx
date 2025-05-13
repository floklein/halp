import AskCard from "@/components/AskCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "tamagui";

export default function Ask() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <ScrollView p="$4" flex={1} contentContainerStyle={{ flex: 1 }}>
        <AskCard />
      </ScrollView>
    </SafeAreaView>
  );
}
