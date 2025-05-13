import { Sheet } from "tamagui";
import AskCard from "./AskCard";

export default function AskSheet({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      forceRemoveScrollEnabled={open}
      dismissOnSnapToBottom
      animation="medium"
      snapPoints={[80]}
    >
      <Sheet.Overlay
        animation="lazy"
        bg="$shadow6"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle />
      <Sheet.Frame p="$8">
        <AskCard setOpen={setOpen} />
      </Sheet.Frame>
    </Sheet>
  );
}
