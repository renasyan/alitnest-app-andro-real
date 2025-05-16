"use client";

import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Linking } from "react-native";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { registerUser } from "@/utlis/api";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/utlis/config";
// import { registerUser } from "@/utlis/api";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof formSchema>;

const Register = () => {
  console.log("registerPage");

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  // Mutation untuk login
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: async (data) => {},
    onError: (error: any) => {
      console.error(error.message);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data); // Panggil API login dengan data yang tervalidasi
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  console.log("API_URL:", API_URL);

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA] py-24 px-8">
      <Text className="text-2xl font-PoppinsBold text-center">
        Selamat Datang 👋🏻
      </Text>
      <Text className="text-sm font-Poppins text-center">
        Silahkan Masukkan Data Dengan Benar
      </Text>
      <View className="my-14 gap-6">
        <View className="">
          <Text className="text-xs font-Poppins"> Email </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{ borderBottomColor: "#00B4D8", borderBottomWidth: 1 }}
                placeholder="starticas@gmail.com"
                value={watch("email")}
                onChangeText={(text) => setValue("email", text)}
              />
            )}
          />
          {errors.email && (
            <Text className="text-xs text-red-500 font-Poppins">
              Email tidak valid
            </Text>
          )}
        </View>
        <View className="">
          <Text className="text-xs font-Poppins"> Nama </Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{ borderBottomColor: "#00B4D8", borderBottomWidth: 1 }}
                placeholder="Starticas"
                value={watch("name")}
                onChangeText={(text) => setValue("name", text)}
              />
            )}
          />
          {errors.name && (
            <Text className="text-xs text-red-500 font-Poppins">
              Nama tidak valid
            </Text>
          )}
        </View>
        <View className="">
          <Text className="text-xs font-Poppins"> Kata Sandi </Text>
          <View
            className="flex-row justify-between"
            style={{
              borderBottomColor: "#00B4D8",
              borderBottomWidth: 1,
              borderWidth: 0,
            }}
          >
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Alamak123"
                  secureTextEntry={!isPasswordVisible}
                  value={watch("password")}
                  onChangeText={(text) => setValue("password", text)}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="align-middle items-center justify-center"
            >
              {isPasswordVisible ? (
                <Feather name="eye" color="#00000054" size={22} />
              ) : (
                <Feather name="eye-off" color="#00000054" size={22} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View className="">
          <Text className="text-xs font-Poppins"> Konfirmasi Kata Sandi </Text>
          <View
            className="flex-row justify-between"
            style={{
              borderBottomColor: "#00B4D8",
              borderBottomWidth: 1,
              borderWidth: 0,
            }}
          >
            <TextInput
              placeholder="alamak123"
              secureTextEntry={!isPasswordVisible}
              className="flex-1"
              // {...form.register("password")}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="align-middle items-center justify-center"
            >
              {isPasswordVisible ? (
                <Feather name="eye" color="#00000054" size={22} />
              ) : (
                <Feather name="eye-off" color="#00000054" size={22} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          className="bg-baseColor py-3 rounded-md"
          onPress={() => handleSubmit(onSubmit)()}
          // onPress={() => router.push({ pathname: "/(tabs)" })}
          disabled={mutation.isPending}
        >
          <Text className="text-white text-center font-PoppinsSemiBold text-sm">
            {mutation.isPending ? "Memproses..." : "Daftar"}
          </Text>
        </TouchableOpacity>
        <View className="gap-9 mt-20 mb-12">
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
            <View>
              <Text className="text-center text-sm mx-4 font-Poppins">
                Atau masuk dengan
              </Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          </View>
          <View className="bg-white flex items-center py-5">
            <TouchableOpacity>
              <Image
                source={require("../../../assets/images/external-icon/google.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
