import type { VotesSummary } from "@/app/api/votes/[dilemmaId]+api";
import type { Dilemma } from "@/db/schema";
import { ArrowBigLeft, ArrowBigRight } from "@tamagui/lucide-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Card, H2, Paragraph, View, XStack, YStack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import ProtectedButton from "./ProtectedButton";

export default function DilemmaCard({
  zIndex,
  dilemma,
}: {
  zIndex: number;
  dilemma: Dilemma;
}) {
  const queryClient = useQueryClient();

  const { data: votesSummary } = useQuery<VotesSummary>({
    queryKey: ["votesSummary", dilemma.id],
    queryFn: async () => (await axios.get(`/api/votes/${dilemma.id}`)).data,
  });

  const { mutate: postVote, isPending: isVoting } = useMutation({
    mutationFn: async (option: "0" | "1" | "skipped") =>
      await axios.post(`/api/votes/${dilemma.id}`, {
        option,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dilemmas"] });
      await queryClient.invalidateQueries({
        queryKey: ["votesSummary", dilemma.id],
      });
    },
  });

  function vote(option: "0" | "1" | "skipped") {
    return () => {
      postVote(option);
    };
  }

  const percent0 =
    votesSummary && (votesSummary?.votes[0] > 0 || votesSummary?.votes[1] > 0)
      ? Math.round(
          (votesSummary.votes[0] /
            (votesSummary.votes[0] + votesSummary.votes[1])) *
            100,
        )
      : null;
  const percent1 =
    votesSummary && (votesSummary?.votes[0] > 0 || votesSummary?.votes[1] > 0)
      ? Math.round(
          (votesSummary.votes[1] /
            (votesSummary.votes[0] + votesSummary.votes[1])) *
            100,
        )
      : null;

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
      <YStack z={1} px="$4" gap="$4">
        <View width="80%">
          <Paragraph size="$8">{dilemma.options[0]}</Paragraph>
          {percent0 !== null && (
            <Paragraph color="$red11">{percent0}%</Paragraph>
          )}
        </View>
        <View width="80%" self="flex-end">
          <Paragraph size="$8" text="right">
            {dilemma.options[1]}
          </Paragraph>
          {percent1 !== null && (
            <Paragraph text="right" color="$blue11">
              {percent1}%
            </Paragraph>
          )}
        </View>
      </YStack>
      <Card.Footer padded>
        <XStack width="100%" gap="$8" items="center" justify="space-between">
          <ProtectedButton
            theme="red"
            themeInverse
            width="$6"
            maxW="$6"
            height="$6"
            maxH="$6"
            circular
            onPress={vote("0")}
            disabled={isVoting}
          >
            <ArrowBigLeft />
          </ProtectedButton>
          <ProtectedButton
            rounded="$8"
            onPress={vote("skipped")}
            disabled={isVoting}
          >
            skip
          </ProtectedButton>
          <ProtectedButton
            theme="blue"
            themeInverse
            width="$6"
            maxW="$6"
            height="$6"
            maxH="$6"
            circular
            onPress={vote("1")}
            disabled={isVoting}
          >
            <ArrowBigRight />
          </ProtectedButton>
        </XStack>
      </Card.Footer>
      <Card.Background>
        <LinearGradient
          colors={["$red8", "$blue8"]}
          start={[0, 0.5]}
          end={[1, 0.5]}
          locations={
            percent0 !== null && percent1 !== null
              ? [percent0 / 100 - 0.5, (100 - percent1) / 100 + 0.5]
              : undefined
          }
          width="100%"
          height="100%"
        />
      </Card.Background>
    </Card>
  );
}
