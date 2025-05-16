import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";

const taskPage = () => {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 p-6 py-10 flex-col justify-evenly bg-[#FAFAFA]">
        <View className="absolute top-4 left-0 p-4 z-10">
          <Feather name="arrow-left" size={24} color="black" />
        </View>
        <View className="justify-center items-center bg-red">
          {/* <Text className="text-2xl font-PoppinsSemiBold">History Goals</Text> */}
          <View className="flex justify-center items-center mt-10 bg-black">
            <Image
              source={require("@/assets/images/thumbnailtask.png")}
              className="aspect-square h-96"
            />
          </View>
          <Text className="text-xl font-PoppinsSemiBold mt-16">Squad Jump</Text>
          <Pressable className="bg-gelapDikit mt-24 rounded-xl w-full justify-center items-center">
            <LinearGradient
              colors={["#42A2D3", "#035B99"]}
              start={{ x: 0, y: 0 }} // Titik awal (kiri atas)
              end={{ x: 1, y: 1 }} // Titik akhir (kanan bawah)// Warna gradien
              className="flex flex-row justify-center items-center gap-4 p-6 w-full rounded-lg overflow-hidden"
            >
              <Text className="font-PoppinsSemiBold text-xl text-white">
                Mulai
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

export default taskPage;
