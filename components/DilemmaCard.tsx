import { ArrowBigLeft, ArrowBigRight } from "@tamagui/lucide-icons";
import { Button, Card, H2, Paragraph, View, XStack, YStack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import { Dilemma } from "../types/dilemma";

export default function DilemmaCard({
  zIndex,
  dilemma,
}: {
  zIndex: number;
  dilemma: Dilemma;
}) {
  return (
    <Card
      height="95%"
      scale={1 - zIndex * 0.1}
      y={`${zIndex * 7.5}%`}
      elevate
      elevation={1000}
      overflow="hidden"
      filter={`blur(${zIndex * 1}px) brightness(${1 - zIndex * 0.33})`}
    >
      <Card.Header padded>
        <H2>{dilemma.question}</H2>
      </Card.Header>
      <YStack z={1} px="$4">
        <View flex={1}>
          <Paragraph size="$8">{dilemma.options[0]}</Paragraph>
        </View>
        <View flex={1} ml="auto">
          <Paragraph size="$8">{dilemma.options[1]}</Paragraph>
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
