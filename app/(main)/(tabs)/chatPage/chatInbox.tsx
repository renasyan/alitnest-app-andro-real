import { useHideTabBar } from "@/utlis/hitTabBar";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  ListRenderItem,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ItemsProps {
  id: number;
  sender: string;
  message: string;
  time: string;
}

const dummyMessages = [
  {
    id: 1,
    sender: "coach",
    message: "Hallo ada yang bisa aku bantu terkait perkembangan kamu?",
    time: "11.59",
  },
  {
    id: 2,
    sender: "trainee",
    message: "Hallo Coach, jadi aku mau tanya nih coach",
    time: "11.59",
  },
];

const MessageBubble: ListRenderItem<ItemsProps> = ({ item }) => {
  const isCoach = item.sender === "coach";
  return (
    <View
      style={{
        alignSelf: isCoach ? "flex-start" : "flex-end",
        backgroundColor: isCoach ? "#00B4D8" : "#03045E",
        borderRadius: 4,
        borderTopRightRadius: isCoach ? 4 : 0,
        borderTopLeftRadius: isCoach ? 0 : 4,
        padding: 10,
        marginVertical: 5,
        maxWidth: "70%",
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: isCoach ? -5 : undefined,
          right: isCoach ? undefined : -5,
          width: 0,
          height: 0,
          borderTopWidth: 5,
          borderTopColor: isCoach ? "#00B4D8" : "#03045E",
          borderBottomWidth: 5,
          borderBottomColor: "transparent",
          borderLeftWidth: isCoach ? 0 : 5,
          borderRightColor: isCoach ? "#00B4D8" : "transparent",
          borderRightWidth: isCoach ? 5 : 0,
          borderLeftColor: isCoach ? "transparent" : "#03045E",
        }}
      />
      <Text style={{ color: "white" }} className="font-Poppins text-base">
        {item.message}
      </Text>
      <Text className="self-end text-white font-Poppins text-sm">
        {item.time}
      </Text>
    </View>
  );
};

const chatInbox = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  console.log("name : ", name);

  const navigation = useNavigation();

  useHideTabBar();

  //   useEffect(() => {
  //     navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
  //   }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-24">
        <LinearGradient
          colors={["#00B4D8", "#03045E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex h-full flex-row items-center px-4 gap-2"
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} color="white" />
          </Pressable>
          <Image
            source={{ uri: "https://avatar.iran.liara.run/public/62" }}
            className="h-12 aspect-square rounded-lg"
          />
          <View className="flex-1 ml-4">
            <Text className="text-white font-PoppinsBold text-base">
              {name}
            </Text>
            <Text className="text-white font-PoppinsSemiBold text-xs">
              Online
            </Text>
          </View>
          <Feather name="phone" size={24} color="white" />
          <Feather name="more-vertical" size={24} color="white" />
        </LinearGradient>
      </View>
      <FlatList
        data={dummyMessages}
        renderItem={MessageBubble}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20 }}
      />
      <View className="flex-row items-center p-4 ">
        <TextInput
          placeholder="Message"
          className="flex-1 bg-gelapDikit p-3 px-5 rounded-full font-PoppinsMedium text-xl"
          style={{ color: "white", textAlignVertical: "center" }}
          placeholderTextColor="white"
        />
        <Pressable className="ml-2 bg-gelapDikit p-3 rounded-full">
          <Feather name="mic" size={24} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default chatInbox;
