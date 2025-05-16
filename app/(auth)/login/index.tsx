"use client";

import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

import { loginUser } from "../../../utlis/api";

import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof formSchema>;

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  // Mutation untuk login
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {},
    onError: (error: any) => {
      console.error(error.message);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data); // Panggil API login dengan data yang tervalidasi
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA] py-24 px-8">
      <Text className="text-2xl font-PoppinsBold text-center">
        Selamat Datang 👋🏻
      </Text>
      <Text className="text-sm font-Poppins text-center">
        Masuk dengan akun yang telah terdaftar!
      </Text>
      <View className="my-14 gap-6">
        <View>
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
            <Text className="text-red-500">Email tidak valid</Text>
          )}
        </View>
        <View>
          <Text className="text-xs font-Poppins"> Kata Sandi </Text>
          <View
            className="flex-row justify-between"
            style={{ borderBottomColor: "#00B4D8", borderBottomWidth: 1 }}
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
            >
              <Feather
                name={isPasswordVisible ? "eye" : "eye-off"}
                color="#00000054"
                size={22}
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text className="text-red-500">Minimal 8 karakter</Text>
          )}
        </View>
        <TouchableOpacity>
          <Text className="text-xs font-PoppinsSemiBold text-right text-[#00B4D8]">
            Lupa Password?
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="bg-baseColor py-3 rounded-md"
        onPress={() => handleSubmit(onSubmit)()}
        // onPress={() => router.push({ pathname: "/(tabs)" })}
        // disabled={mutation.isPending}
      >
        <Text className="text-white text-center font-PoppinsSemiBold text-sm">
          {mutation.isPending ? "Memproses..." : "Masuk"}
        </Text>
      </TouchableOpacity>
      <View className="gap-9 mt-20 mb-12">
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          <Text className="text-center text-sm mx-4 font-Poppins">
            Atau daftar dengan
          </Text>
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
      <View>
        <Text className="text-center text-sm font-Poppins">
          Belum memiliki akun?{" "}
          <Text
            className="text-baseColor font-PoppinsBold"
            onPress={() => router.push("/(auth)/register")}
          >
            Daftar
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
