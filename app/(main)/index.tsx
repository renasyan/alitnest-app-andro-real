import { router } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaViewBase } from "react-native";

const StartPage = () => {
  console.log("StartPage");
  return (
    <SafeAreaViewBase>
      <Text>aaa</Text>
      <TouchableOpacity onPress={() => router.push("/(auth)/onboard")}>
        <Text>bbb</Text>
      </TouchableOpacity>
    </SafeAreaViewBase>
  );
};

export default StartPage;
