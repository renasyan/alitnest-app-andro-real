import {
  ClockIcon,
  FireIcon,
  HandIcon,
  LeaderboardIcon,
} from "@/assets/icons/icon";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

const historyGoals = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const getDateToday = `${year}-${month}-${day}`;

  const [data, setData] = useState(null);
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");

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
  const [completedDays, setCompletedDays] = useState(
    generateMarkedDates([
      "2025-05-11",
      "2025-05-12",
      "2025-05-14",
      "2025-05-15",
      "2025-05-17",
    ])
  );

  const dataLaporan = {
    latihan: "23",
    kalori: "3204",
    waktu: "2",
  };

  return (
    <>
      <StatusBar style="dark" />
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
            className="p-3 rounded-xl bg-white"
            onPress={() => router.back()}
          />
          <Text className="text-white text-2xl font-PoppinsBold flex-1 text-center">
            Riwayat
          </Text>
          <LeaderboardIcon size={27} fill="white" />
        </LinearGradient>
      </View>
      <SafeAreaView className="flex-1 p-6 py-10 ">
        <Calendar markingType="period" markedDates={completedDays} />
        <Text className="font-PoppinsSemiBold text-xl text-center my-8">
          Laporan
        </Text>
        <View className="bg-gelapBanget flex-row justify-between rounded-xl">
          <LinearGradient
            colors={["#0184B6", "#035595"]}
            start={{ x: 0, y: 0 }} // Titik awal (kiri atas)
            end={{ x: 0, y: 1 }} // Titik akhir (kanan bawah)// Warna gradien
            className="flex w-full flex-row justify-between items-center gap-4 px-6 py-9 rounded-xl overflow-hidden"
          >
            <View className="justify-center items-center gap-2">
              <HandIcon size={22} fill="white" />
              <Text className="font-PoppinsBold text-base text-white">
                {dataLaporan.latihan}
              </Text>
              <Text className="font-Poppins text-base text-white">Latihan</Text>
            </View>
            <View className="justify-center items-center gap-2">
              <FireIcon size={22} fill="white" />
              <Text className="font-PoppinsBold text-base text-white">
                {dataLaporan.kalori}
              </Text>
              <Text className="font-Poppins text-base text-white">Kcal</Text>
            </View>
            <View className="justify-center items-center gap-2">
              <ClockIcon size={22} color="white" />
              <Text className="font-PoppinsBold text-base text-white">
                {dataLaporan.waktu} jam
              </Text>
              <Text className="font-Poppins text-base text-white">
                Waktu latihan
              </Text>
            </View>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </>
  );
};

export default historyGoals;
