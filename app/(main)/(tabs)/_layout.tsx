import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { Link, Tabs } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { ChatIcon, ScanIcon } from "@/assets/icons/icon";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
}) {
  return <Feather size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0077B6",
        tabBarInactiveTintColor: "#03045E",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#CAF0F8",
          justifyContent: "center",
          paddingTop: 12,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          height: 68,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="articlePage"
        options={{
          title: "Article",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="trending-up" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="nutriwisePage"
        options={{
          title: "",
          tabBarStyle: {
            display: "none",
          },
          tabBarIcon: ({ color }) => {
            // <TabBarIcon name="maximize" color={color}/>
            return (
              <View className="bg-white p-2 rounded-full" style={{ top: -16 }}>
                <View className="bg-terangBanget p-2 rounded-full h-16 w-16 items-center justify-center">
                  <ScanIcon size={24} />
                  <Text className="text-xs text-gelapBanget">Scan</Text>
                </View>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="chatPage"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => <ChatIcon size={24} />,
        }}
      />
      <Tabs.Screen
        name="profilePage"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
