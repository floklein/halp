import { Link } from "expo-router";
import React, { useState } from "react";
import { Button, Form, H2, Input, Separator, YStack } from "tamagui";
import { authClient } from "../../utils/auth-client";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function signUp() {
    await authClient.signUp.email({
      email,
      password,
      name,
    });
  }

  return (
    <YStack flex={1} justify="center" items="center">
      <YStack gap="$6">
        <Form gap="$4">
          <H2>new here?</H2>
          <Input placeholder="email" value={email} onChangeText={setEmail} />
          <Input
            placeholder="new username"
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder="new password"
            value={password}
            onChangeText={setPassword}
          />
          <Button themeInverse onPress={signUp}>
            sign up
          </Button>
        </Form>
        <Separator />
        <Link href="/account/login">
          <Button width="100%">login</Button>
        </Link>
      </YStack>
    </YStack>
  );
}
