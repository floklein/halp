import React from "react";
import { Button, Form, H2, Input, YStack } from "tamagui";

export default function SignUp() {
  return (
    <YStack flex={1} justify="center" items="center">
      <Form gap="$4">
        <H2>new here?</H2>
        <Input placeholder="choose a username" />
        <Input placeholder="choose a password" />
        <Button themeInverse>sign up</Button>
      </Form>
    </YStack>
  );
}
