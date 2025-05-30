import DilemmaCard from "@/components/DilemmaCard";
import ProtectedAlertDialog from "@/components/ProtectedAlertDialog";
import type { Dilemma } from "@/db/schema";
import { authClient } from "@/utils/auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swiper, SwiperCardRefType } from "rn-swiper-list";
import { View } from "tamagui";

const defaultApiDilemmas: Dilemma[] = [];

export default function Index() {
  const isSignedIn = !!authClient.useSession().data;

  const [dilemmas, setDilemmas] = useState<Dilemma[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);

  const swiperRef = useRef<SwiperCardRefType>(null);

  const { data: apiDilemmas = defaultApiDilemmas, refetch } = useQuery<
    Dilemma[]
  >({
    queryKey: ["dilemmas"],
    queryFn: async () => (await axios.get(`/api/dilemmas`)).data,
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
      const filteredNewDilemmas = apiDilemmas.filter(
        (dilemma) =>
          !oldDilemmas.some((oldDilemma) => oldDilemma.id === dilemma.id),
      );
      return [...oldDilemmas, ...filteredNewDilemmas];
    });
  }, [apiDilemmas]);

  useEffect(() => {
    if (activeIndex === dilemmas.length - 1) {
      refetch();
    }
  }, [activeIndex, dilemmas.length, refetch]);

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
