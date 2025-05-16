import { FEATURE } from "@/utlis/config";
import { useHideTabBar } from "@/utlis/hitTabBar";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  ListRenderItem,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import { content, Content } from "./content";

interface ItemsProps {
  id: number;
  avatar: string;
  name: string;
  msg: string;
  time: string;
}

const chatList = [
  {
    id: 1,
    avatar: "https://avatar.iran.liara.run/public/62",
    name: "Coach Aya",
    msg: "Halo",
    time: "13.00",
  },
  {
    id: 2,
    avatar: "https://avatar.iran.liara.run/public/62",
    name: "Coach Aya",
    msg: "Halo",
    time: "13.00",
  },
  {
    id: 3,
    avatar: "https://avatar.iran.liara.run/public/62",
    name: "Coach Aya",
    msg: "Halo",
    time: "13.00",
  },
];

const renderItem: ListRenderItem<ItemsProps> = ({ item }) => (
  <Pressable
    className="p-5 px-7 flex-row justify-between  content-start gap-5 border-b border-t border-gray-200"
    // route into chatRoom with params
    onPress={() =>
      router.push({
        pathname: "/chatPage/chatInbox",
        params: { id: item.id, name: item.name },
      })
    }
  >
    <Image
      source={{ uri: item.avatar }}
      className="h-14 aspect-square rounded-lg"
    />
    <View className="flex-1 justify-between">
      <Text className="font-PoppinsMedium text-base mt-1">{item.name}</Text>
      <Text>{item.msg}</Text>
    </View>
    <View className="justify-between">
      <Text className="font-Poppins text-sm">{item.time}</Text>
    </View>
  </Pressable>
);

const constultation = () => {
  return (
    <SafeAreaView className="flex-1 bg-wdhite ">
      {FEATURE ? (
        <>
          <View className="h-24 ">
            <LinearGradient
              colors={["#00B4D8", "#03045E"]}
              start={{ x: 0, y: 0 }} // Titik awal (kiri atas)
              end={{ x: 1, y: 1 }} // Titik akhir (kanan bawah)// Warna gradien
              className="flex h-full"
            >
              <Text className="text-white text-2xl font-PoppinsBold p-5 pt-7">
                Konsultasi
              </Text>
            </LinearGradient>
          </View>
          {/* cards? */}

          {/* flatlist should be here lmao */}
          <FlatList
            data={chatList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            className="m-6"
          />
        </>
      ) : (
        <View className="flex-1 justify-center align-middle items-center">
          <Text>Fitur belum tersedia</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default constultation;
