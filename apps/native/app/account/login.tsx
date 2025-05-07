import React from "react";
import { Button, Form, H2, Input, YStack } from "tamagui";

export default function Login() {
  return (
    <YStack flex={1} justify="center" items="center">
      <Form gap="$4">
        <H2>
          welcome
          <br />
          back.
        </H2>
        <Input placeholder="username" />
        <Input placeholder="password" />
        <Button themeInverse>Login</Button>
      </Form>
    </YStack>
  );
}
