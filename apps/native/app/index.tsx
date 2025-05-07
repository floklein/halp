import { ArrowBigLeft, ArrowBigRight } from "@tamagui/lucide-icons";
import {
  Button,
  Card,
  H2,
  Paragraph,
  View,
  XStack,
  YStack,
  ZStack,
} from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

function DilemmaCard({ index }: { index: number }) {
  return (
    <Card
      height="95%"
      scale={1 - index * 0.1}
      y={`${index * 7.5}%`}
      elevate
      elevation={1000}
      overflow="hidden"
      filter={`blur(${index * 1}px) brightness(${1 - index * 0.33})`}
    >
      <Card.Header padded>
        <H2>next holidays</H2>
      </Card.Header>
      <YStack z={1} px="$4">
        <View flex={1}>
          <Paragraph size="$8">italy</Paragraph>
        </View>
        <View flex={1} ml="auto">
          <Paragraph size="$8">france</Paragraph>
        </View>
      </YStack>
      <Card.Footer padded>
        <XStack width="100%" gap="$8" justify="space-between">
          <Button
            theme="red"
            themeInverse
            width="$6"
            maxW="$6"
            height="$6"
            maxH="$6"
            circular
          >
            <ArrowBigLeft />
          </Button>
          <Button
            theme="blue"
            themeInverse
            width="$6"
            maxW="$6"
            height="$6"
            maxH="$6"
            circular
          >
            <ArrowBigRight />
          </Button>
        </XStack>
      </Card.Footer>
      <Card.Background>
        <LinearGradient
          colors={["$red8", "$blue8"]}
          start={[0, 0.5]}
          end={[1, 0.5]}
          width="100%"
          height="100%"
        />
      </Card.Background>
    </Card>
  );
}

export default function Index() {
  return (
    <View height="100%" px="$2">
      <ZStack height="100%">
        <DilemmaCard index={2} />
        <DilemmaCard index={1} />
        <DilemmaCard index={0} />
      </ZStack>
    </View>
  );
}
