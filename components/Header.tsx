import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string | string[]; // Required
  backgroundColor?: string; // Optional
};

const Header: React.FC<Props> = ({ title, backgroundColor = "white" }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[{ marginTop: insets.top, backgroundColor }]}
      className="p-4 flex-row justify-center items-center"
    >
      <Text className="font-semibold text-lg text-[#2C3968]">{title}</Text>
    </View>
  );
};

export default Header;
