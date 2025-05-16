import DailyGoalsIndicator from "@/components/dailyGoalsIndicator";
import { API_URL } from "@/utlis/config";
import { getData } from "@/utlis/storage";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

const historyFood = () => {
  const generateMarkedDates = (completedDates: string[]) => {
    if (completedDates.length === 0) return {};

    const sortedDates = completedDates.sort(
      (a, b) => new Date(a) - new Date(b)
    );

    let markedDates: Record<string, any> = {};
    let tempGroup = [sortedDates[0]];

    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1]);
      const currentDate = new Date(sortedDates[i]);

      if ((currentDate - prevDate) / (1000 * 60 * 60 * 24) === 1) {
        tempGroup.push(sortedDates[i]);
      } else {
        addToMarkedDates(tempGroup, markedDates);
        tempGroup = [sortedDates[i]];
      }
    }

    addToMarkedDates(tempGroup, markedDates);

    return markedDates;
  };

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const getDateToday = `${year}-${month}-${day}`;

  const [data, setData] = useState(null);
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await getData("user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          setName(parsed.name);
        } else {
          console.log("No user data found in storage");
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    };

    loadUser();
  }, []);

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
        } catch (e) {
          console.error("Error ambil goals:", e);
        }
      };

      fetchData();
    }, [user])
  );
  // Fungsi untuk menandai setiap grup tanggal
  const addToMarkedDates = (
    group: string[],
    markedDates: Record<string, any>
  ) => {
    group.forEach((date, index) => {
      markedDates[date] = {
        color: "#03045E",
        textColor: "white",
        selected: true,
      };

      if (index === 0) markedDates[date].startingDay = true; // Hari pertama di grup
      if (index === group.length - 1) markedDates[date].endingDay = true; // Hari terakhir di grup
    });
  };

  const [completedDays, setCompletedDays] = useState(
    generateMarkedDates([
      "2025-03-11",
      "2025-03-12",
      "2025-03-14",
      "2025-03-15",
      "2025-03-17",
    ])
  );

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="h-40">
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
            className="p-3 rounded-md bg-white absolute left-4"
            onPress={() => router.back()}
          />
          <Text className="text-white text-2xl font-PoppinsBold flex-1 text-center">
            Riwayat
          </Text>
        </LinearGradient>
      </SafeAreaView>
      <ScrollView className="flex-1 p-6 py-10 ">
        <Calendar markingType="period" markedDates={completedDays} />
        <Text className="font-PoppinsSemiBold text-xl text-center my-8">
          Laporan
        </Text>
        {/* <View className="bg-gelapBanget flex-row justify-between px-6 py-9 rounded-xl">
          <View className="justify-center items-center gap-2">
            <Feather name="list" size={22} color="white" />
            <Text className="font-PoppinsBold text-base text-white">23</Text>
            <Text className="font-Poppins text-base text-white">Latihan</Text>
          </View>
          <View className="justify-center items-center gap-2">
            <Feather name="list" size={22} color="white" />
            <Text className="font-PoppinsBold text-base text-white">23</Text>
            <Text className="font-Poppins text-base text-white">Kcal</Text>
          </View>
          <View className="justify-center items-center gap-2">
            <Feather name="list" size={22} color="white" />
            <Text className="font-PoppinsBold text-base text-white">23</Text>
            <Text className="font-Poppins text-base text-white">
              Waktu latihan
            </Text>
          </View>
        </View> */}
        <View className="mb-5">
          <DailyGoalsIndicator data={data} />
        </View>
      </ScrollView>
    </>
  );
};

export default historyFood;
