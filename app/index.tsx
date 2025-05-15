import DilemmaCard from "@/components/DilemmaCard";
import ProtectedAlertDialog from "@/components/ProtectedAlertDialog";
import type { Dilemma } from "@/db/schema";
import { authClient } from "@/utils/auth-client";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swiper, SwiperCardRefType } from "rn-swiper-list";
import { View } from "tamagui";

export default function Index() {
  const queryClient = useQueryClient();

  const isSignedIn = !!authClient.useSession().data;

  const [dilemmas, setDilemmas] = useState<Dilemma[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);

  const swiperRef = useRef<SwiperCardRefType>(null);

  const { data, fetchNextPage } = useInfiniteQuery<Dilemma[]>({
    queryKey: ["dilemmas"],
    queryFn: async () => (await axios.get(`/api/dilemmas`)).data,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
  });

  const { mutate: postVote } = useMutation({
    mutationFn: async ({
      dilemmaId,
      option,
    }: {
      dilemmaId: string;
      option: "0" | "1" | "skipped";
    }) =>
      await axios.post(`/api/votes/${dilemmaId}`, {
        option,
      }),
    onSuccess: async (_, { dilemmaId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["votesSummary", dilemmaId],
      });
    },
    onError: (error) => {
      swiperRef.current?.swipeBack();
      if (error instanceof AxiosError && error.status === 401) {
        setAlertOpen(true);
      }
    },
  });

  function vote(option: "0" | "1" | "skipped") {
    return (cardIndex: number) => {
      postVote({
        dilemmaId: dilemmas[cardIndex].id,
        option,
      });
    };
  }

  function onIndexChange(index: number) {
    setActiveIndex(index);
  }

  useEffect(() => {
    setDilemmas((oldDilemmas) => {
      const newDilemmas = data?.pages.at(-1) ?? [];
      const filteredNewDilemmas = newDilemmas.filter(
        (dilemma) =>
          !oldDilemmas.some((oldDilemma) => oldDilemma.id === dilemma.id),
      );
      return [...oldDilemmas, ...filteredNewDilemmas];
    });
  }, [data?.pages]);

  useEffect(() => {
    if (activeIndex === dilemmas.length - 1) {
      fetchNextPage();
    }
  }, [activeIndex, dilemmas.length, fetchNextPage]);

  return (
    <View height="100%" p="$4">
      <GestureHandlerRootView>
        <Swiper
          ref={swiperRef}
          data={dilemmas}
          renderCard={(item, index) =>
            index >= activeIndex - 1 && index <= activeIndex + 1 ? (
              <DilemmaCard dilemma={item} />
            ) : null
          }
          cardStyle={{ width: "100%", height: "100%" }}
          onSwipeLeft={vote("0")}
          onSwipeRight={vote("1")}
          onSwipeTop={!isSignedIn ? undefined : vote("skipped")}
          onIndexChange={onIndexChange}
          OverlayLabelLeft={RedOverlay}
          OverlayLabelRight={BlueOverlay}
          OverlayLabelTop={BlackOverlay}
          disableBottomSwipe
        />
      </GestureHandlerRootView>
      <ProtectedAlertDialog open={alertOpen} onOpenChange={setAlertOpen} />
    </View>
  );
}

function BlueOverlay() {
  return <View height="100%" bg="$blue9" rounded="$4" />;
}

function RedOverlay() {
  return <View height="100%" bg="$red9" rounded="$4" />;
}

function BlackOverlay() {
  return <View height="100%" bg="$black1" rounded="$4" opacity={0.5} />;
}
