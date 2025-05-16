import "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import DailyGoalsIndicator from "@/components/dailyGoalsIndicator";
import { getData } from "@/utlis/storage";
import { API_URL } from "@/utlis/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const today = new Date();
const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
const dayName = days[today.getDay()];
const day = today.getDate();
const month = today.getMonth() + 1;
const monthName = months[today.getMonth()];
const year = today.getFullYear();
const getDateToday = `${year}-${month}-${day}`;

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await getData("user");
        if (storedUser) {
          console.log("User data loaded:", storedUser);
          // const parsed = JSON.parse(storedUser);
          setUser(storedUser);
          setName(storedUser.name);
        } else {
          console.log("No user data found in storage");
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    };

    loadUser();
  }, []);

  const [data, setData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        if (!user || !user._id) return;

        try {
          const res = await fetch(
            `${API_URL}/daily-goals/totals/${user._id}/${getDateToday}`
          );

          if (!res.ok) {
            console.error("Gagal ambil data goals:", res.status);
            return;
          }

          const result = await res.json();
          setData(result);
          // await AsyncStorage.setItem("@daily_goals", JSON.stringify(result));
        } catch (e) {
          console.error("Error ambil goals:", e);
        }
      };

      fetchData();
    }, [user])
  );

  useEffect(() => {
    console.log("Data updated:", data);
  }, [data]);

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="bg-[#FAFAFA] flex-1 container p-6 py-10 gap-6">
        <View
          className="absolute top-0 left-0 right-0 h-[40%]"
          style={{ borderRadius: 1000, transform: [{ scaleX: 2 }] }}
        >
          <LinearGradient
            colors={["#00A5CD", "#02317D"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            className="w-full h-full"
          />
        </View>

        <View className="flex flex-row justify-between gap-3 items-center p-4">
          <View className="aspect-square w-12 rounded-full bg-white p-2">
            <Image
              className="aspect-square rounded-full"
              source={require("@/assets/images/ava.png")}
            />
          </View>
          <View className="flex-1">
            <Text className="text-white font-PoppinsSemiBold text-lg">
              Hello, {name}
            </Text>
            <Text className="text-white font-PoppinsMedium text-xs">
              {day} {monthName} {year} | {dayName}
            </Text>
          </View>
          <Pressable className="bg-white p-2 rounded-lg">
            <Image
              className="aspect-square h-9"
              source={require("@/assets/images/alarm.png")}
            />
          </Pressable>
        </View>

        <View className="bg-white px-4 rounded-lg flex-row items-center h-11 gap-3">
          <Feather name="search" size={20} color="#999" />
          <TextInput
            className="flex-1 font-Poppins text-xs"
            placeholder="Cari"
            placeholderTextColor="#999"
            style={{ fontSize: 12, lineHeight: 24 }}
          />
        </View>

        <DailyGoalsIndicator key={data?.totals?.calories} data={data} />

        <View className="flex flex-row justify-between gap-3">
          <Pressable
            className="flex-1 bg-white rounded-lg h-20"
            onPress={() => router.push("(pages)/dailyGoalsPage")}
          >
            <Image
              className="absolute w-full h-full rounded-lg"
              source={require("@/assets/images/menu/DailyGoals.png")}
              style={{ resizeMode: "cover" }}
            />
            <Text className="font-bold text-base text-white mx-2 my-2">
              Latihan
            </Text>
          </Pressable>

          <Pressable
            className="flex-1 bg-black rounded-lg h-20"
            onPress={() => router.push("(pages)/dailyFood")}
          >
            <Image
              className="absolute w-full h-full rounded-lg"
              source={require("@/assets/images/menu/Latihan.png")}
              style={{ resizeMode: "cover" }}
            />
            <Text className="font-bold text-base text-white mx-2 my-2">
              Daily Goals
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Dashboard;
