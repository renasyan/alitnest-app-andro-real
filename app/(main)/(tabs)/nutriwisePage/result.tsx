import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { nutrition, Nutrition } from "@/components/NutriWise/Content";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getData } from "@/utlis/storage";
import { API_URL, getAddMode, setAddMode } from "@/utlis/config";

const BreakdownNutriwise = () => {
  const { id, scanData, img } = useLocalSearchParams();
  const [user, setUser] = useState(null);
  const [nutritionData, setNutritionData] = useState<Nutrition[] | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  // const isFromAdd = getAddMode();

  useEffect(() => {
    const loadUserAndData = async () => {
      const storedUser = await getData("user");
      if (storedUser) setUser(storedUser);
      const isFromAdd = getAddMode();
      console.log("isFromAdd", isFromAdd);
      console.log("storedUser", storedUser);
      console.log("scanData", scanData);

      if (!scanData) return;

      try {
        const responseData = JSON.parse(scanData);

        const dailyValues = {
          fat: 70,
          carbs: 325,
          protein: 50,
          vitaminA: 900,
          calcium: 1000,
          iron: 18,
          potassium: 4700,
        };

        setDescription(responseData.data.description);
        setTitle(responseData.data.name);

        const formattedData: Nutrition[] = [
          {
            title: "Total Calories",
            value: responseData.data.calories,
            precentage: (responseData.data.calories / 2000) * 100,
          },
          {
            title: "Total Fat",
            value: responseData.data.fat,
            precentage: (responseData.data.fat / dailyValues.fat) * 100,
          },
          {
            title: "Total Carbohydrate",
            value: responseData.data.carbs,
            precentage: (responseData.data.carbs / dailyValues.carbs) * 100,
          },
          {
            title: "Protein",
            value: responseData.data.protein,
            precentage: (responseData.data.protein / dailyValues.protein) * 100,
          },
          {
            title: "Vitamin",
            precentage:
              ((responseData.data.vitamins.vitaminA / dailyValues.vitaminA +
                responseData.data.vitamins.calcium / dailyValues.calcium +
                responseData.data.vitamins.iron / dailyValues.iron +
                responseData.data.vitamins.potassium / dailyValues.potassium) /
                4) *
              100,
            value: (
              responseData.data.vitamins.vitaminA +
              responseData.data.vitamins.calcium +
              responseData.data.vitamins.iron +
              responseData.data.vitamins.potassium
            ).toFixed(2),
            details: [
              {
                title: "Vitamin A",
                value: responseData.data.vitamins.vitaminA,
                precentage:
                  (responseData.data.vitamins.vitaminA / dailyValues.vitaminA) *
                  100,
              },
              {
                title: "Calcium",
                value: responseData.data.vitamins.calcium,
                precentage:
                  (responseData.data.vitamins.calcium / dailyValues.calcium) *
                  100,
              },
              {
                title: "Iron",
                value: responseData.data.vitamins.iron,
                precentage:
                  (responseData.data.vitamins.iron / dailyValues.iron) * 100,
              },
              {
                title: "Potassium",
                value: responseData.data.vitamins.potassium,
                precentage:
                  (responseData.data.vitamins.potassium /
                    dailyValues.potassium) *
                  100,
              },
            ],
          },
        ];

        setNutritionData(formattedData);

        if (isFromAdd) {
          console.log("isFromAdd", isFromAdd);
          console.log("adding to backend", {
            storedUser,
            formattedData,
          });
          await sendToBackend(
            storedUser,
            formattedData,
            responseData.data.name
          );
        }
      } catch (error) {
        console.error("Error parsing scanData:", error);
      }
    };

    loadUserAndData();
  }, [scanData]);

  // const sendToBackend = async (userData, data, name) => {
  //   console.log("user :", userData);
  //   console.log("data :", data);
  //   console.log("name :", name);

  //   const currentDate = new Date();
  //   const wibDate = new Date(
  //     currentDate.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  //   );
  //   const formattedDate = wibDate.toISOString().split("T")[0];

  //   // const parsed = JSON.parse(userData);
  //   const time = currentDate.toLocaleTimeString("en-GB", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });

  //   console.log("formattedDate", formattedDate);

  //   const payload = {
  //     userId: userData._id,
  //     date: formattedDate,
  //     meal: {
  //       name: name,
  //       calories:
  //         data.find((item) => item.title === "Total Calories")?.value || 0,
  //       protein: data.find((item) => item.title === "Protein")?.value || 0,
  //       fat: data.find((item) => item.title === "Total Fat")?.value || 0,
  //       carbs:
  //         data.find((item) => item.title === "Total Carbohydrate")?.value || 0,
  //       time,
  //     },
  //   };

  //   console.log("Payload:", payload);
  //   try {
  //     const res = await fetch(`${API_URL}/daily-goals`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const text = await res.text();
  //     if (!res.ok) {
  //       console.error("Gagal kirim data:", res.status, text);
  //       return;
  //     }

  //     console.log("Data berhasil dikirim:", text);

  //     setAddMode(false);
  //   } catch (error) {
  //     console.error("Gagal kirim data:", error);
  //   }
  // };

  const sendToBackend = async (userData, data, name) => {
    const parsedUser =
      typeof userData === "string" ? JSON.parse(userData) : userData;
    const currentDate = new Date(); // Mendapatkan tanggal dan waktu saat ini

    // Mengubah tanggal ke format YYYY-MM-DD
    const day = currentDate.getDate(); // Tanggal
    const month = currentDate.getMonth() + 1; // Bulan (index dari 0)
    const year = currentDate.getFullYear(); // Tahun
    const getDateToday = year + "-" + month + "-" + day;
    // const formattedDate = currentDate.toISOString().split("T")[0];
    const time = currentDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const payload = {
      userId: parsedUser._id,
      date: getDateToday,
      meal: {
        name,
        calories:
          data.find((item) => item.title === "Total Calories")?.value || 0,
        protein: data.find((item) => item.title === "Protein")?.value || 0,
        fat: data.find((item) => item.title === "Total Fat")?.value || 0,
        carbs:
          data.find((item) => item.title === "Total Carbohydrate")?.value || 0,
        time,
      },
    };

    try {
      const res = await fetch(`${API_URL}/daily-goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      if (!res.ok) {
        console.error("Gagal kirim data:", res.status, text);
        return;
      }

      console.log("Data berhasil dikirim:", text);
      setAddMode(false);
    } catch (error) {
      console.error("Gagal kirim data:", error);
    }
  };

  if (!nutritionData) {
    return <Text>Loading...</Text>;
  }

  const dataNutriwise = [
    {
      id: "1",
      value:
        nutritionData.find((item) => item.title === "Total Fat")?.value || 0,
      category: "Fat",
      icon: "percent",
      color: "#0AA7FF",
    },
    {
      id: "2",
      value:
        nutritionData.find((item) => item.title === "Total Carbohydrate")
          ?.value || 0,
      category: "Carbs",
      icon: "info",
      color: "#FD7900",
    },
    {
      id: "3",
      value: nutritionData.find((item) => item.title === "Protein")?.value || 0,
      category: "Protein",
      icon: "compass",
      color: "#0077B6",
    },
  ];

  // console.log("render dataNutriwise", dataNutriwise);
  const CardDetailNutriwise = () => (
    <View className="flex-row justify-between">
      {dataNutriwise.map((item, index) => (
        <View
          key={index}
          className="flex-1 rounded-lg justify-center items-center"
        >
          <Feather
            name={item.icon as keyof typeof Feather.glyphMap}
            color="white"
            size={12}
            style={{
              padding: 8,
              backgroundColor: item.color,
              borderRadius: 50,
              marginBottom: 8,
            }}
          />
          <Text className="font-Poppins text-sm">{item.value}g</Text>
          <Text className="font-Poppins text-xs text-[#B1B5C7]">
            {item.category}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <>
      <SafeAreaView className="flex-row justify-between px-10 py-5 bg-terangDikit">
        <Pressable>
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>
        <Text className="font-PoppinsSemiBold text-lg text-[#2C3968]">
          {title}
        </Text>
        <Pressable>
          <Feather name="more-horizontal" size={24} color="black" />
        </Pressable>
      </SafeAreaView>
      <View className="flex bg-terangDikit rounded-md align-middle justify-center items-center h-auto">
        <Image
          className="object-contain bg-black"
          source={{ uri: Array.isArray(img) ? img[0] : img }}
          style={{ width: 200, height: 200 }}
          onError={(e) =>
            console.error("Error loading image:", e.nativeEvent.error)
          }
        />
        {/* selector */}
        <View className="flex-row my-7 items-center justify-center">
          {/* <Pressable className="rounded p-2 px-4">
            <Text className="text-center font-PoppinsSemiBold text-xs text-gelapBanget">
              1 Oz
            </Text>
          </Pressable>
          <Pressable className="rounded-full p-2 px-4 bg-gelapDikit">
            <Text className="text-center font-PoppinsBold text-xs text-white">
              100g
            </Text>
          </Pressable>
          <Pressable className="rounded p-2 px-4">
            <Text className="text-center font-PoppinsSemiBold text-xs text-gelapBanget">
              1 fruit
            </Text>
          </Pressable> */}
          <Pressable className="rounded p-2 px-4">
            <Text className="text-center font-PoppinsSemiBold text-xs text-gelapBanget">
              {" "}
            </Text>
          </Pressable>
        </View>
      </View>
      <View className="px-10 gap-4 mt-9">
        <CardDetailNutriwise />
        <View className="">
          <View className="gap-5">
            {/* information */}
            <View className="">
              <Text className="text-left font-PoppinsSemiBold text-lg text-[#2C3968]">
                Information
              </Text>
              {/* <Text className="text-left font-PoppinsSemiBold text-base text-[#2C3968]">
                Pinneapple Healts Benefits:
              </Text> */}
              <Text className="text-left font-Poppins text-sm text-[#2C3968]">
                {description}
              </Text>
              {/* <Pressable className="my-3">
                <Text className="text-center font-Poppins text-xl text-gelapDikit">
                  View All {">"}
                </Text>
              </Pressable> */}
            </View>
          </View>
          <View className="gap-5">
            {/* information */}
            <View className="mt-4">
              <Text className="text-left font-PoppinsSemiBold text-lg text-[#2C3968]">
                Nutrition Facts
              </Text>
              <View>
                {nutritionData.map((item, index) => (
                  <Pressable className="py-2" key={index}>
                    <View className="flex-row justify-between py-1">
                      <View>
                        <Feather
                          name="zap"
                          color="white"
                          size={12}
                          className="bg-gelapDikit rounded-full p-1"
                        />
                      </View>
                      <Text className="align-middle font-PoppinsSemiBold text-lg text-[#2C3968] flex-1 px-3">
                        {item.title}{" "}
                        {item.value && (
                          <Text className="text-[#3AC7BF] text-xs">
                            {item.precentage.toFixed(1)}%
                          </Text>
                        )}
                      </Text>
                      <Text className="align-middle font-PoppinsSemiBold text-lg text-[#2C3968]">
                        {item.value}g
                      </Text>
                    </View>
                    {item.details && (
                      <View className="ml-9">
                        {item.details.map((detail, index) => (
                          <View
                            className="flex-row justify-between py-1"
                            key={index}
                          >
                            <View>
                              <Feather
                                name="zap"
                                color="#FD7900"
                                size={12}
                                className="bg-[#fd7a0052] rounded-full p-1"
                              />
                            </View>
                            <View className="flex-1 px-3">
                              <Text className="align-middle font-Poppins text-base text-[#2C3968]">
                                {detail.title}
                              </Text>
                              <Text className="text-[#B1B5C7] text-xs">
                                {detail.precentage.toFixed(1)}%
                              </Text>
                            </View>
                            <Text className="align-middle font-PoppinsSemiBold text-lg text-[#B1B5C7]">
                              {detail.value}g
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const resultNutriwise = () => {
  return (
    <ScrollView style={{ flex: 1 }} className="bg-white">
      <StatusBar style="dark" />
      <Text>a</Text>
      {/* container atas */}
      {/* container bawah */}
      <BreakdownNutriwise />
    </ScrollView>
  );
};

export default resultNutriwise;
