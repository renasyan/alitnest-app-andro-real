import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  ListRenderItem,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { content, Content } from "./content";
import { Link, router } from "expo-router";
import { FEATURE } from "@/utlis/config";

interface ItemsProps {
  id: string;
  title: string;
  date: string;
  content: string;
  image: string;
}

const renderItem: ListRenderItem<ItemsProps> = ({ item }) => (
  <Pressable
    className="p-5"
    key={item.id}
    onPress={() => router.push(`/articlePage/${item.id}`)}
  >
    <Image source={{ uri: item.image }} className="h-40 w-full rounded-lg" />
    <Text className="font-PoppinsMedium text-base/27 mt-1">{item.title}</Text>
    <Text className="font-Poppins text-xs/27">{item.date}</Text>
  </Pressable>
);

const article = () => {
  return (
    <SafeAreaView className="flex-1 bg-white ">
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
                Artikel
              </Text>
            </LinearGradient>
          </View>
          <FlatList
            data={content}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
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

export default article;
