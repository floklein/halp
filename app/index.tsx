import DilemmaCard from "@/components/DilemmaCard";
import ProtectedAlertDialog from "@/components/ProtectedAlertDialog";
import { dilemma, type Dilemma } from "@/db/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swiper, SwiperCardRefType } from "rn-swiper-list";
import { View } from "tamagui";

export default function Index() {
  const queryClient = useQueryClient();

  const swiperRef = useRef<SwiperCardRefType>(null);

  const [alertOpen, setAlertOpen] = useState(false);

  const { data: dilemmas = [] } = useQuery<Dilemma[]>({
    queryKey: ["dilemmas"],
    queryFn: async () => (await axios.get("/api/dilemmas")).data,
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["votesSummary", dilemma.id],
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

  return (
    <View height="100%" p="$4">
      <GestureHandlerRootView>
        <Swiper
          ref={swiperRef}
          data={dilemmas}
          renderCard={(item) => <DilemmaCard dilemma={item} />}
          cardStyle={{ height: "100%" }}
          onSwipeRight={vote("1")}
          onSwipeLeft={vote("0")}
          onSwipeTop={vote("skipped")}
          OverlayLabelLeft={RedOverlay}
          OverlayLabelRight={BlueOverlay}
        />
      </GestureHandlerRootView>
      <ProtectedAlertDialog open={alertOpen} onOpenChange={setAlertOpen} />
    </View>
  );
}

function BlueOverlay() {
  return <View height="100%" bg="$blue8" rounded="$4" />;
}

function RedOverlay() {
  return <View height="100%" bg="$red8" rounded="$4" />;
}
