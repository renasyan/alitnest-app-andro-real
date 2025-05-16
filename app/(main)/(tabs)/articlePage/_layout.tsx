import { Stack, Tabs } from "expo-router";

const TabsHome = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Tabs.Screen name="[id]" />
    </Stack>
  );
};

export default TabsHome;
