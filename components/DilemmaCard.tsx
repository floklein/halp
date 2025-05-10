import type { VotesSummary } from "@/app/api/votes/[dilemmaId]+api";
import type { Dilemma } from "@/db/schema";
import { authClient } from "@/utils/auth-client";
import { ArrowBigLeft, ArrowBigRight, ChevronUp } from "@tamagui/lucide-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Button, Card, H2, Paragraph, View, XStack, YStack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import ProtectedButton from "./ProtectedButton";

export default function DilemmaCard({ dilemma }: { dilemma: Dilemma }) {
  const queryClient = useQueryClient();

  const isSignedIn = !!authClient.useSession().data;

  const { data: votesSummary } = useQuery<VotesSummary>({
    queryKey: ["votesSummary", dilemma.id],
    queryFn: async () => (await axios.get(`/api/votes/${dilemma.id}`)).data,
    enabled: isSignedIn,
  });

  const { mutate: postVote, isPending: isVoting } = useMutation({
    mutationFn: async (option: "0" | "1" | "skipped") =>
      await axios.post(`/api/votes/${dilemma.id}`, {
        option,
      }),
    onSuccess: async () => {
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
    <Card elevate elevation="$10" overflow="hidden" flex={1} height="100%">
      <Card.Header padded>
        <H2>{dilemma.question}</H2>
      </Card.Header>
      <YStack z={10} px="$4" gap="$4">
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
            <YStack items="center">
              <ChevronUp size={18} color="$accent10" />
              <Button.Text mt={-6}>skip</Button.Text>
            </YStack>
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
