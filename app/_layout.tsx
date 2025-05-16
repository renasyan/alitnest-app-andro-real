import { router, Slot, useSegments } from "expo-router";
import { InteractionManager, View } from "react-native";
import { AuthProvider, useAuth } from "./ctx";
import "../global.css";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./(services)/queryClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const segments = useSegments();
  console.log("1");

  const [loaded] = useFonts({
    Poppins: require("@/assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("@/assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("@/assets/fonts/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("@/assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsExtraBold: require("@/assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsBlack: require("@/assets/fonts/Poppins-Black.ttf"),
  });
  //check if user authenticated
  //   useEffect(() => {
  //     if (typeof isAuthenticated === "undefined") return;
  //     if (!isAuthenticated && segments[0] !== "(auth)") {
  //       console.log("2");
  //       router.replace("/(main)/(tabs)");
  //     } else if (isAuthenticated == false) {
  //       console.log("3");
  //       router.replace("/SignIn");
  //     }
  //   }, [isAuthenticated]);

  // useEffect(() => {
  //   console.log("isAuthenticated:", isAuthenticated);
  //   if (typeof isAuthenticated === "undefined") return;

  //   if (!isAuthenticated) {
  //     // Jika belum autentikasi, arahkan ke SignIn
  //     console.log("berhasil login");
  //     router.replace("/(auth)/onboard");
  //   } else {
  //     // Jika sudah autentikasi, arahkan ke tab utama
  //     console.log("berhasil login");
  //     router.replace("/(main)/(tabs)");
  //   }
  // }, [isAuthenticated]);

  useEffect(() => {
    // Jangan langsung trigger navigasi sebelum Slot siap
    if (!loaded) return;

    // Cek login setelah layout render
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem("user");

      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          if (user) {
            router.replace("/(main)/(tabs)"); // navigasi ke main tabs
          } else {
            router.replace("/(auth)/onboard"); // navigasi ke login
          }
        }, 100); // Delay sedikit untuk memastikan layout sudah mount
      });
    };

    checkLogin();
  }, [loaded]); // Gunakan `loaded` sebagai dependency

  return <Slot />; // Setelah pengecekan selesai, render Slot
};

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </QueryClientProvider>
  );
}
