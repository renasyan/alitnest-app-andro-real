import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { API_URL } from "./config";
import { getData } from "./storage";
import { router, useLocalSearchParams } from "expo-router";

export default function SearchFood() {
  const { id } = useLocalSearchParams();

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

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce timer
  const [debounceTimer, setDebounceTimer] = useState<any>(null);

  const fetchFoodData = async (searchTerm: string) => {
    if (!searchTerm) {
      setData([]); // Kosongkan data jika query kosong
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://id.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&json=true`
      );
      setData(response.data.products || []); // Simpan hasil pencarian
    } catch (error) {
      console.error("Gagal fetch data:", error);
    }
    setLoading(false);
  };

  const sendToBackend = async (meal: any) => {
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

    const dataToSend = {
      userId: user._id,
      date: getDateToday,
      meal: {
        name: meal.product_name || "Unknown", // Nama produk atau makanan
        calories: meal.nutriments?.energy || 0, // Kalori dari nutriment
        protein: meal.nutriments?.proteins || 0, // Protein dari nutriment
        fat: meal.nutriments?.fat || 0, // Lemak dari nutriment
        carbs: meal.nutriments?.carbohydrates || 0, // Karbohidrat dari nutriment
        time: time, // Waktu add
      },
    };

    try {
      console.log("Data yang akan dikirim:", dataToSend); // Debugging

      const response = await axios.post(`${API_URL}/daily-goals`, dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Lakukan sesuatu setelah berhasil mengirim data, misalnya menampilkan pesan sukses
      if (response.status === 200) {
        console.log("Data berhasil dikirim:", response.data);
        alert("Data berhasil disimpan!");
        router.back(); // Kembali ke halaman sebelumnya
      }
    } catch (error) {
      console.error("Gagal kirim data:", error);
    }
  };
  // Fungsi untuk menunda pemanggilan API menggunakan debounce
  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer); // Clear previous timer jika ada
    }
    const timer = setTimeout(() => {
      fetchFoodData(query); // Panggil API setelah beberapa detik
    }, 500); // Delay 500ms setelah berhenti mengetik
    setDebounceTimer(timer); // Simpan timer untuk dibersihkan nanti
    return () => clearTimeout(timer); // Cleanup jika komponen di-unmount
  }, [query]);

  return (
    <View style={{ padding: 16 }}>
      <View className="bg-gray-200 px-4 rounded-lg flex-row items-center h-11 gap-3">
        <Feather name="search" size={20} color="#999" />
        <TextInput
          className="flex-1 font-Poppins text-xs"
          placeholder="Cari Makanan"
          placeholderTextColor="#999"
          style={{
            fontSize: 12,
            lineHeight: 24,
            textAlignVertical: "center",
          }}
          onChangeText={(text) => setQuery(text)} // Update query saat teks berubah
          value={query}
        />
      </View>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="small" color="blue" />}

      {/* Tampilkan Hasil Pencarian */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => sendToBackend(item)}>
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text style={{ fontWeight: "bold" }}>{item.product_name}</Text>
              <Text>Kalori: {item.nutriments?.energy_kcal || "N/A"} Kcal</Text>
              <Text>
                Protein: {item.nutriments?.proteins_100g || "N/A"} Gram
              </Text>
              <Text>Lemak: {item.nutriments?.fat_100g || "N/A"} Gram</Text>
              <Text>
                Karbohidrat: {item.nutriments?.carbohydrates_100g || "N/A"} Gram
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
