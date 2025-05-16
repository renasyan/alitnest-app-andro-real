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
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { API_URL } from "@/utlis/config";

const { getData } = require("@/utlis/storage");

const transformMeals = (apiResponse) => {
  const meals = apiResponse.meals || [];

  const defaultImage =
    "https://cdn.vanderbilt.edu/vu-URL/wp-content/uploads/sites/288/2019/03/19223634/Image-Coming-Soon-Placeholder.png";

  const categories = {
    Pagi: [],
    Siang: [],
    Sore: [],
  };

  meals.forEach((meal, index) => {
    const [hourStr] = meal.time.split(":");
    const hour = parseInt(hourStr, 10);

    let waktuMakan = "Sore";
    if (hour >= 4 && hour < 11) waktuMakan = "Pagi";
    else if (hour >= 11 && hour < 15) waktuMakan = "Siang";

    const formattedMeal = {
      id: String(index + 1),
      name: meal.name,
      calories: `${meal.calories} Kalori`,
      protein: `${meal.protein} gr Protein`,
      image: defaultImage, // ganti sesuai backend kalau udah ada
    };

    categories[waktuMakan].push(formattedMeal);
  });

  return Object.keys(categories).map((key) => ({
    title: key,
    data: categories[key],
  }));
};

const ListItem = ({ item }) => (
  <View className="w-44 bg-white rounded-2xl mr-3 shadow-md overflow-visible">
    <Image
      source={{ uri: item.image || defaultImage }}
      className="w-full h-32"
    />
    <View className="p-3">
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        className="text-lg font-bold text-gray-900"
      >
        {item.name}
      </Text>
      <Text className="text-sm text-gray-600">{item.calories}</Text>
      <Text className="text-sm text-gray-600">{item.protein}</Text>
    </View>
  </View>
);

const FoodToday = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [menuData, setMenuData] = useState(null);
  const [user, setUser] = useState(null);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = `${year}-${month}-${id}`;

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await getData("user");
        if (storedUser) {
          console.log("User data loaded:", storedUser);
          // const parsed = JSON.parse(storedUser);
          setUser(storedUser);
        } else {
          console.log("No user data found in storage");
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user._id) return;

      try {
        const response = await fetch(
          `${API_URL}/daily-goals/meals/${user._id}/${date}`
        );
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchData();
  }, [user]);

  const menu_items = transformMeals(menuData || {});

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
              Hari {id}
            </Text>
          </LinearGradient>
        </View>
        <SectionList
          sections={menu_items}
          keyExtractor={(item, index) => item.id || index.toString()}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section }) => (
            <View className="my-4">
              <Text className="font-PoppinsSemiBold text-xl mb-2">
                {section.title}
              </Text>
              <FlatList
                data={section.data}
                horizontal
                keyExtractor={(item, index) => item.id || index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View className="mr-3 overflow-visible">
                    <ListItem item={item} />
                  </View>
                )}
              />
            </View>
          )}
          renderItem={() => null}
        />
      </SafeAreaView>
    </View>
  );
};

export default FoodToday;
