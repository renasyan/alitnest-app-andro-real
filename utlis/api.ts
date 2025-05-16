import { router } from "expo-router";
import { z } from "zod";
import { API_URL } from "./config";
import { Alert } from "react-native";
import { storeData } from "./storage";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";

const { setUser } = useContext(AuthContext);

// LOGIN
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type loginValues = z.infer<typeof loginSchema>;

export const loginUser = async (data: loginValues) => {
  console.log("API_URL:", API_URL);
  console.log("Data yang dikirim:", data);

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("Response:", response);

    if (!response.ok) {
      const text = await response.text();
      console.log("Raw response:", text);

      let errorMessage = response.statusText;

      try {
        const errorJson = JSON.parse(text);
        if (errorJson?.message) {
          errorMessage = errorJson.message;
        }
      } catch (e) {
        console.error("Parsing error response gagal:", e);
      }

      Alert.alert("Login gagal", errorMessage);
      return;
    }

    const text = await response.text();
    const result = text ? JSON.parse(text) : null;

    let userData = result?.data;
    console.log("Tipe data awal:", typeof userData);

    if (typeof userData === "string") {
      try {
        userData = JSON.parse(userData);
        console.log("Parsed string JSON ke object:", userData);
      } catch (e) {
        console.error("Gagal parse userData:", e);
      }
    }

    await storeData("user", userData);
    console.log("Data user disimpan:", userData);

    router.push("/(tabs)");

    return userData;
  } catch (error: any) {
    console.error("Terjadi kesalahan saat login:", error.message);
    Alert.alert("Terjadi Kesalahan", error.message || "Gagal melakukan login.");
    return null;
  }
};

// REGIS
const registSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(8),
});

type registValues = z.infer<typeof registSchema>;

export const registerUser = async (data: registValues) => {
  try {
    console.log("API_URL:", API_URL);
    console.log("Register endpoint:", `${API_URL}/register`);
    console.log("Form Input:", data);

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error Response Body:", errorText);

      let errorMessage = `Error ${response.status}`;
      try {
        const parsedError = JSON.parse(errorText);
        if (parsedError?.message) {
          errorMessage = parsedError.message;
        }
      } catch (e) {
        console.error("Gagal parsing error:", e);
      }

      Alert.alert("Registrasi Gagal", errorMessage);
      return null;
    }

    const text = await response.text();
    const result = text ? JSON.parse(text) : null;

    console.log("Parsed response:", result);

    if (result.status === "SUCCESS") {
      await storeData("user", result.data);
      console.log("User data stored:", result.data);

      Alert.alert(
        "Registrasi Berhasil",
        "Akun berhasil dibuat.",
        [
          {
            text: "OK",
            onPress: () => router.push("/(auth)/inApp-survey"),
          },
        ],
        { cancelable: false }
      );
      console.log("Navigating to survey page");
      console.log("User data:", result);
    }
    if (result.status === "FAILED") {
      Alert.alert("Registrasi Gagal", result.message);
      console.log("Registration failed:", result.message);
    }

    return result;
  } catch (error: any) {
    console.error("Registration failed:", error.message);
    Alert.alert(
      "Terjadi Kesalahan",
      error.message || "Gagal melakukan registrasi."
    );
    return null;
  }
};
//IN APP
export const handleSubmitSurvey = async (surveyData) => {
  try {
    console.log("Submitting survey:", surveyData);
    const response = await fetch(`${API_URL}/survey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(surveyData),
    });

    console.log("Response status:", response.status);
    if (response.ok) {
      console.log("Survey submitted successfully!");

      router.push("/(main)/(tabs)"); // Navigasi setelah submit
    } else {
      console.error("Failed to submit survey");
    }
  } catch (error) {
    console.error("Error submitting survey:", error);
  }
};

export const addMeal = async (mealData: {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  time: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/daily-goals`, mealData);
    return response.data;
  } catch (error: any) {
    console.error("Gagal menambahkan meal:", error);
    throw error;
  }
};

// GET PROFILE
export const getProfile = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Gagal mendapatkan data profil");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// UPDATE PROFILE
export const updateProfile = async (profileData: {
  name: string;
  email: string;
  password: string;
  id: string;
}) => {
  const { id, ...body } = profileData;
  console.log("Request ke API:", `${API_URL}/profile/${id}`);
  console.log("Payload:", body);
  try {
    const response = await fetch(`${API_URL}/profile/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Gagal memperbarui data profil");
    }

    const data = await response.json();

    await storeData("user", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

//get meals
export interface MealFromAPI {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  time: string;
  mealType: string;
}

export async function fetchMeals(
  id: string,
  date: string
): Promise<MealFromAPI[]> {
  try {
    const res = await axios.get(`${API_URL}/daily-goals/meals/${id}/${date}`);

    if (!res.data.success) return [];

    return res.data.meals;
  } catch (error) {
    console.error("Error fetching meals", error);
    return [];
  }
}
