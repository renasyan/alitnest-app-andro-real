import { getProfile, updateProfile } from "@/utlis/api";
import { getData } from "@/utlis/storage";
import { Feather } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const editProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [user, setUser] = useState(null);

  const { id } = useLocalSearchParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    // password: "", // kosong default
    phone: "",
  });

  console.log(id);
  useEffect(() => {
    // console.log("api:", getProfile);
    const loadProfile = async () => {
      try {
        const data = await getProfile(id);
        // setProfile(data);
        console.log("Profile data:", data); // Debugging
        setForm({
          name: data?.data.name || "",
          email: data?.data.email || "",
          phone: data?.data.phone || "",
          // password: "",
        });
        console.log("Form data:", form); // Debugging
      } catch (error) {
        console.error("Gagal memuat profil:", error);
      }
    };

    loadProfile();
  }, []);

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      Alert.alert("Berhasil", "Data berhasil diperbarui");
      console.log("Update berhasil:", data);
    },
    onError: (error: any) => {
      Alert.alert("Gagal", error.message || "Terjadi kesalahan");
    },
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    mutation.mutate({ ...form, id: id }); // atau `profile.id` sesuai struktur
  };

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
          {form.name}
        </Text>
      </View>
      {/* container putih */}
      <View className="flex-1 bg-white p-6 rounded-t-2xl py-11 gap-3">
        <View>
          <Text className="font-PoppinsMedium text-sm">Nama Lengkap</Text>
          <View className="shadow-lg bg-white p-2 rounded-md">
            <TextInput
              placeholder="Nama Lengkap"
              className=""
              onChangeText={(text) => handleChange("name", text)}
              value={form.name}
            />
          </View>
        </View>
        <View>
          <Text className="font-PoppinsMedium text-sm">Email</Text>
          <View className="shadow-lg bg-white p-2 rounded-md">
            <TextInput
              placeholder="email"
              className=""
              onChangeText={(text) => handleChange("email", text)}
              value={form.email}
            />
          </View>
        </View>
        <View>
          <Text className="font-PoppinsMedium text-sm">No Telepon</Text>
          <View className="shadow-lg bg-white p-2 rounded-md">
            <TextInput
              placeholder="no telp"
              className=""
              onChangeText={(text) => handleChange("phone", text)}
              value={form.phone}
            />
          </View>
        </View>
        {/* <View>
          <Text className="font-PoppinsMedium text-sm">Password</Text>
          <View className="shadow-lg bg-white p-2 rounded-md">
            <TextInput placeholder="Nama Lengkap" className="" />
          </View>
        </View> */}

        <TouchableOpacity
          onPress={handleUpdate}
          disabled={mutation.isPending}
          className={`bg-gelapDikit py-4 px-2 rounded-xl ${
            mutation.isPending ? "opacity-50" : ""
          }`}
        >
          <Text className="text-white text-center font-PoppinsSemiBold text-sm">
            {mutation.isPending ? "Menyimpan..." : "Simpan"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default editProfile;
