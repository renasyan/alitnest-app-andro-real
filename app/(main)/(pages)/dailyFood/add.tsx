import {
  View,
  Text,
  Image,
  ScrollView,
  Share,
  Pressable,
  FlatList,
  SectionList,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import SearchFood from "@/utlis/fetch";
import { ScanIcon } from "@/assets/icons/icon";
import { getAddMode, setAddMode } from "@/utlis/config";

const AddPage = () => {
  const { id } = useLocalSearchParams();

  const handleScanToAdd = () => {
    setAddMode(true);
    console.log("mode add", getAddMode());
    router.push({
      pathname: "(tabs)/nutriwisePage",
      // params: { id },
    });
    // Navigasi ke Scan, misal buka scan.tsx dengan Linking atau navigation
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 bg-white">
        <View className="h-24">
          <LinearGradient
            colors={["#00B4D8", "#03045E"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex h-full flex-row justify-between items-center gap-4 p-6"
          >
            <Feather
              name="arrow-left"
              size={14}
              color="black"
              className="p-3 rounded-md bg-white absolute left-4"
              onPress={() => router.back()}
            />
            <Text className="text-white text-2xl font-PoppinsBold flex-1 text-center">
              Tambah Makanan
            </Text>
          </LinearGradient>
        </View>
        <View className="p-6">
          <SearchFood />
          <Pressable
            className="flex items-center justify-center align-middle gap-2 p-4 bg-gray-200 rounded-lg h-72 mt-16"
            // href={"/(main)/(tabs)/nutriwisePage"}
            onPress={() => handleScanToAdd()}
          >
            <ScanIcon size={50} />
            <Text className="text-center font-PoppinsSemiBold text-lg text-gelapBanget">
              Scan dengan nutriwise
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddPage;
