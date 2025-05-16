import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";

const tabsHome = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* <Stack.Screen name="edit" />
      <Stack.Screen name="test" /> */}
    </Stack>
  );
};

export default tabsHome;
