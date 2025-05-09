import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Sheet,
  TextArea,
  View,
  YStack,
} from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import { DilemmaBody, dilemmaBodySchema } from "../zod";
import { useZodErrors } from "../zod/hooks";
import ZodError from "./ZodError";

export default function AskSheet({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();

  const [question, setQuestion] = useState("");
  const [option0, setOption0] = useState("");
  const [option1, setOption1] = useState("");

  const { mutate: postDilemma, error } = useMutation({
    mutationFn: async (newDilemma: DilemmaBody) =>
      axios.post("/api/dilemmas", newDilemma),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dilemmas"] });
      setOpen(false);
      setQuestion("");
      setOption0("");
      setOption1("");
    },
  });

  const errors = useZodErrors<typeof dilemmaBodySchema>(error);

  function submit() {
    postDilemma({ question, options: [option0, option1] });
  }

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      forceRemoveScrollEnabled={open}
      dismissOnSnapToBottom
      animation="bouncy"
      snapPoints={[80]}
    >
      <Sheet.Overlay
        animation="lazy"
        background="$shadow6"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        opacity={0.9}
      />
      <Sheet.Handle />
      <Sheet.Frame p="$8">
        <Form flex={1} onSubmit={submit}>
          <Card elevate elevation={1000} overflow="hidden" height="100%">
            <Card.Header padded>
              <TextArea
                placeholder="what do you want to ask?"
                value={question}
                onChangeText={setQuestion}
              />
              <ZodError error={errors?.question?._errors} />
            </Card.Header>
            <YStack gap="$2" px="$4" z={1}>
              <View>
                <Input
                  placeholder="left choice"
                  value={option0}
                  onChangeText={setOption0}
                />
                <ZodError error={errors?.options?.[0]?._errors} />
              </View>
              <View>
                <Input
                  placeholder="right choice"
                  text="right"
                  value={option1}
                  onChangeText={setOption1}
                />
                <ZodError error={errors?.options?.[1]?._errors} />
              </View>
            </YStack>
            <Card.Footer padded>
              <Form.Trigger asChild>
                <Button themeInverse width="100%">
                  ask the people
                </Button>
              </Form.Trigger>
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
        </Form>
      </Sheet.Frame>
    </Sheet>
  );
}
