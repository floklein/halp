import type { VotesSummary } from "@/app/api/votes/[dilemmaId]+api";
import type { Dilemma } from "@/db/schema";
import { authClient } from "@/utils/auth-client";
import { ArrowBigLeft, ArrowBigRight, ArrowBigUp } from "@tamagui/lucide-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Card, H1, H2, H3, Text, View, XStack, YStack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import ProtectedButton from "./ProtectedButton";

export default function DilemmaCard({ dilemma }: { dilemma: Dilemma }) {
  const queryClient = useQueryClient();

  const isSignedIn = !!authClient.useSession().data;

  const { data: votesSummary } = useQuery<VotesSummary>({
    queryKey: ["votesSummary", dilemma.id],
    queryFn: async () => (await axios.get(`/api/votes/${dilemma.id}`)).data,
    enabled: isSignedIn,
    retry: false,
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

  const hasVoted = !!votesSummary;
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
        <H2 color="$white1">{dilemma.question}</H2>
      </Card.Header>
      <YStack z={10} px="$4" gap="$4">
        <View width="80%">
          <H3 color="$white1">{dilemma.options[0]}</H3>
          {percent0 !== null && (
            <H1 opacity={0.6} color="$white1">
              {percent0}%
            </H1>
          )}
        </View>
        <View width="80%" self="flex-end">
          <H3 color="$white1" text="right">
            {dilemma.options[1]}
          </H3>
          {percent1 !== null && (
            <H1 text="right" opacity={0.6} color="$white1">
              {percent1}%
            </H1>
          )}
        </View>
      </YStack>
      <Card.Footer padded>
        <XStack width="100%" gap="$8" items="center" justify="space-between">
          {!hasVoted && (
            <ProtectedButton
              theme="red"
              themeInverse
              size="$6"
              circular
              onPress={vote("0")}
              disabled={isVoting}
            >
              <ArrowBigLeft />
            </ProtectedButton>
          )}
          <XStack gap="$8" items="center" justify="center" mx="auto">
            <YStack items="center">
              <ArrowBigUp color="$white1" />
              <Text color="$white1">
                {hasVoted || !isSignedIn ? "next" : "skip"}
              </Text>
            </YStack>
          </XStack>
          {!hasVoted && (
            <ProtectedButton
              theme="blue"
              themeInverse
              size="$6"
              circular
              onPress={vote("1")}
              disabled={isVoting}
            >
              <ArrowBigRight />
            </ProtectedButton>
          )}
        </XStack>
      </Card.Footer>
      <Card.Background>
        <LinearGradient
          colors={["$red9", "$blue9"]}
          start={[0, 0.5]}
          end={[1, 0.5]}
          locations={
            percent0 !== null && percent1 !== null
              ? [
                  Math.max(0, percent0 / 100 - 0.5),
                  Math.min(1, (100 - percent1) / 100 + 0.5),
                ]
              : undefined
          }
          width="100%"
          height="100%"
        />
      </Card.Background>
    </Card>
  );
}
