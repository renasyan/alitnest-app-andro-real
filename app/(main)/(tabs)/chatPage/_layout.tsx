import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";

const tabsHome = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="chatInbox" />
    </Tabs>
  );
};

export default tabsHome;
