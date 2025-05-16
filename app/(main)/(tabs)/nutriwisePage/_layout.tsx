import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";

const tabsHome = () => {
  // const { resultName } = useLocalSearchParams();
  // console.log("resultName:", resultName);

  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="result"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default tabsHome;
