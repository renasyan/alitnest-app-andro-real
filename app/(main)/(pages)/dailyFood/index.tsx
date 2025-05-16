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

import { HistoricIcon } from "@/assets/icons/icon";

// import { content, Content } from "./content";
import { router } from "expo-router";
import dayjs from "dayjs";

interface ItemsProps {
  id: string;
  title: string;
  date: string;
  content: string;
  image: string;
}

interface DayProps {
  id: number;
  name: string;
  status: "complete" | "incomplete" | "failed";
}

const goToHistory = () => {
  router.push("/dailyFood/history");
};

const currentDay = dayjs().date(); // Tanggal sekarang (1-31)
const currentMonth = dayjs().month() + 1; // Bulan sekarang (1-12)
const currentYear = dayjs().year(); // Tahun sekarang
const daysInMonth = dayjs(`${currentYear}-${currentMonth}-01`).daysInMonth(); // Jumlah hari

const daysArray = Array.from({ length: daysInMonth }, (_, i) => ({
  id: i + 1,
  name: `Hari ${i + 1}`,
  status: "complete",
}));

const renderItem: ListRenderItem<DayProps> = ({ item }) => (
  <Pressable
    className="py-7 px-4 border border-gray-300 rounded-lg my-2 justify-between flex-row items-center"
    key={item.id}
    onPress={() => router.push(`/dailyFood/${item.id}`)}
  >
    <Text className="text-lg font-PoppinsMedium">{item.name}</Text>
    {/* {item.status === "incomplete" ? (
      <Feather name="clock" size={24} color="#0077B6" />
    ) : item.status === "complete" ? (
      <Feather name="check-circle" size={24} color="#0077B6" />
    ) : (
      <Feather name="x-circle" size={24} color="red" />
    )} */}
    {item.id === currentDay && (
      <Text className="text-sm text-[#4CA259] font-PoppinsMedium">
        Hari ini
      </Text>
    )}
  </Pressable>
);

const handleAdd = (data: String) => {
  console.log("Add", data);
  router.push({
    pathname: "/dailyFood/add",
    // params: { id },
  });
};

const dailyFood = () => {
  console.log("daysArray", daysArray);
  return (
    <SafeAreaView className="flex-1 bg-white ">
      <View className="h-40">
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
            Jadwal Makan
          </Text>
          <Pressable className="p-3 rounded-xl" onPress={goToHistory}>
            <HistoricIcon size={27} fill="white" />
          </Pressable>
        </LinearGradient>
      </View>

      <View className="flex-1 p-6">
        {/* flatlist should be here lmao */}
        <FlatList
          data={daysArray}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View className="absolute bottom-4 right-4 p-4 bg-white shadow-md rounded-t-2xl">
        <Pressable
          className="bg-[#0077B6] p-4 rounded-lg flex-row justify-center items-center"
          onPress={() => handleAdd("add")}
        >
          <Feather name="plus" size={20} color="white" className="" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default dailyFood;
