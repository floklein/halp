import { Text } from "tamagui";

export default function ZodError({ error }: { error: string[] | undefined }) {
  if (!error) return null;
  return (
    <Text fontSize="$1" px="$4">
      {error.join(", ")}
    </Text>
  );
}
