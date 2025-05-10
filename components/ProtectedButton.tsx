import { authClient } from "@/utils/auth-client";
import { Button, ButtonProps } from "tamagui";
import ProtectedAlertDialog from "./ProtectedAlertDialog";

export default function ProtectedButton(props: ButtonProps) {
  const { data: session } = authClient.useSession();

  if (session) {
    return <Button {...props} />;
  }
  const { onPress, ...rest } = props;
  return <ProtectedAlertDialog button={<Button {...rest} />} />;
}
