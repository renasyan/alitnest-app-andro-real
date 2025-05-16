import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  HeartIcon,
  LogoutIcon,
  NotifIcon,
  ProfileIcon,
  SettingIcon,
} from "@/assets/icons/icon";
import { useEffect, useState } from "react";
import { getData } from "@/utlis/storage";
import { getProfile } from "@/utlis/api";
import { parse } from "@babel/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [user, setUser] = useState(null);

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

  // console.log("User:", user._id); // Debugging
  // const parsed = JSON.parse(user);
  // console.log("id:", user._id);

  return (
    <SafeAreaView className="flex-1 bg-terangBanget">
      <StatusBar style="dark" />
      {/* head */}
      <View className="flex items-center py-4 justify-center gap-4 mt-4 mb-8">
        <Text className="text-center font-PoppinsSemiBold text-lg text-gelapDikit">
          User Profile
        </Text>
        <View className="aspect-square h-24 rounded-full  bg-white py-14 items-center content-center align-middle justify-center">
          <Image
            className="aspect-square object-contain h-20"
            source={require("@/assets/images/ava.png")}
          />
        </View>
        <Text className="text-center font-PoppinsSemiBold text-xl text-gelapDikit">
          {user?.name}
        </Text>
      </View>
      {/* container putih */}
      <View className="flex-1 bg-white p-4 rounded-t-2xl py-6">
        {/* section satu */}
        <View className="gap-6 py-7 px-5 rounded-md">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(tabs)/profilePage/edit",
                params: { id: user._id },
              })
            }
            className="rounded flex-row justify-between items-center flex gap-4"
          >
            <View className="flex-none p-3 bg-white rounded-full">
              <ProfileIcon size={20} />
            </View>
            <View className="flex-col flex-1">
              <Text className="text-hitam font-PoppinsMedium text-sm">
                Akun Saya
              </Text>
              <Text className="text-abuAbu font-Poppins text-xs">
                Edit Profile
              </Text>
            </View>
            <Feather
              name="chevron-right"
              color="#ABABAB"
              size={22}
              className="flex-none"
            />
          </TouchableOpacity>
          <View className="rounded flex-row justify-between items-center flex gap-4">
            <View className="flex-none p-3 bg-white rounded-full">
              <SettingIcon size={20} />
            </View>
            <View className="flex-col flex-1">
              <Text className="text-hitam font-PoppinsMedium text-sm">
                Pengaturan
              </Text>
              <Text className="text-abuAbu font-Poppins text-xs">
                Atur pengaturanmu disini
              </Text>
            </View>
            <Feather
              name="chevron-right"
              color="#ABABAB"
              size={22}
              className="flex-none"
            />
          </View>
          <View className="rounded flex-row justify-between items-center flex gap-4">
            <View className="flex-none p-3 bg-white rounded-full">
              <LogoutIcon size={20} />
            </View>
            <TouchableOpacity
              className="flex-col flex-1"
              onPress={async () => {
                await AsyncStorage.clear();
                router.replace("/login");
              }}
            >
              <Text className="text-hitam font-PoppinsMedium text-sm">
                Keluar
              </Text>
              <Text className="text-abuAbu font-Poppins text-xs">
                Amankan lebih lanjut akun demi keamanan
              </Text>
            </TouchableOpacity>
            <Feather
              name="chevron-right"
              color="#ABABAB"
              size={22}
              className="flex-none"
            />
          </View>
        </View>
        {/* section 2 */}
        <View className="px-5 py-5">
          <Text className="font-PoppinsMedium text-sm text-hitam">Lainnya</Text>
          <View className="gap-6">
            <View className="rounded flex-row justify-between items-center flex gap-4">
              <View className="flex-none p-3 bg-white rounded-full">
                <NotifIcon size={20} />
              </View>
              <View className="flex-col flex-1">
                <Text className="text-hitam font-PoppinsMedium text-sm">
                  Bantuan & Dukungan
                </Text>
              </View>
              <Feather
                name="chevron-right"
                color="#ABABAB"
                size={22}
                className="flex-none"
              />
            </View>
            <View className="rounded flex-row justify-between items-center flex gap-4">
              <View className="flex-none p-3 bg-white rounded-full">
                <HeartIcon size={20} />
              </View>
              <View className="flex-col flex-1">
                <Text className="text-hitam font-PoppinsMedium text-sm">
                  Tentang Aplikasi
                </Text>
              </View>
              <Feather
                name="chevron-right"
                color="#ABABAB"
                size={22}
                className="flex-none"
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
