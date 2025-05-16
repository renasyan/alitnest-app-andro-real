import {
  View,
  Text,
  Image,
  ScrollView,
  Share,
  ListRenderItem,
  Pressable,
  FlatList,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

// import { content, Content } from "./content";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

interface TaskProps {
  id: number;
  image: string;
  taskName: String;
  status: "complete" | "incomplete" | "failed";
}

const taskDay: TaskProps[] = [
  {
    id: 1,
    image: "",
    taskName: "Squad Jump",
    status: "complete",
  },
  {
    id: 2,
    image: "",
    taskName: "Squad Jump",
    status: "incomplete",
  },
  {
    id: 3,
    image: "",
    taskName: "Squad Jump",
    status: "complete",
  },
  {
    id: 4,
    image: "",
    taskName: "Squad Jump",
    status: "failed",
  },
];

const renderItem: ListRenderItem<TaskProps> = ({ item }) => (
  <Pressable
    className="py-7 px-6 border border-gray-300 rounded-lg my-2 justify-between flex-row items-center"
    key={item.id}
    onPress={() => router.push(`/dailyGoalsPage/task`)}
  >
    <Image source={require("@/assets/images/task.png")} className="w-16 h-16" />
    <Text className="text-lg font-PoppinsMedium">{item.taskName}</Text>
    {item.status === "incomplete" ? (
      <Feather name="clock" size={24} color="#0077B6" />
    ) : item.status === "complete" ? (
      <Feather name="check-circle" size={24} color="#0077B6" />
    ) : (
      <Feather name="x-circle" size={24} color="red" />
    )}
  </Pressable>
);

const taskDetails = () => {
  const { id } = useLocalSearchParams();

  console.log(id);
  return (
    <SafeAreaView className="flex-1 bg-white ">
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
            className="p-3 rounded-xl bg-white absolute left-4"
            onPress={() => router.back()}
          />
          <Text className="text-white text-2xl font-PoppinsBold flex-1 text-center">
            Hari {id}
          </Text>
        </LinearGradient>
      </View>
      <View className="p-6">
        <FlatList
          data={taskDay}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default taskDetails;
