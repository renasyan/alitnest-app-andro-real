import { View, Text, Image, ScrollView, Share } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { content, Content } from "./content";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useHideTabBar } from "@/utlis/hitTabBar";

const ArticleDetails = () => {
  useHideTabBar();

  const { id } = useLocalSearchParams();
  const article = content.find((item) => item.id === Number(id));

  if (!article) {
    return (
      <View>
        <Text>Artikel tidak ditemukan</Text>
      </View>
    );
  }

  const onShare = async () => {
    try {
      await Share.share({
        message: "Ayo cek artikel ini: https://example.com/article/123",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(String(error));
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <ScrollView>
        <View className="h-24 ">
          <LinearGradient
            colors={["#00B4D8", "#03045E"]}
            start={{ x: 0, y: 0 }} // Titik awal (kiri atas)
            end={{ x: 1, y: 1 }} // Titik akhir (kanan bawah)// Warna gradien
            className="flex h-full flex-row justify-between items-center gap-4 p-6"
          >
            <Feather
              name="arrow-left"
              size={14}
              color="black"
              className="p-3 rounded-full bg-white"
              onPress={() => router.back()}
            />
            <Text className="text-white text-2xl font-PoppinsBold flex-1">
              Artikel
            </Text>
            <Feather
              name="share-2"
              size={14}
              color="black"
              className="p-3 rounded-xl bg-white"
              onPress={onShare}
            />
          </LinearGradient>
        </View>
        <View className="p-6 gap-4">
          <Text className="font-PoppinsSemiBold text-xl text-center">
            {article.title}
          </Text>
          <Image
            source={{ uri: article.image }}
            style={{ width: "100%", height: 113, borderRadius: 10 }}
          />
          <Text className="font-Poppins text-sm/27 text-justify">
            {article.content}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArticleDetails;
