import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: any) => {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(key, json);
    // console.log("Data berhasil disimpan:", json);
  } catch (e) {
    console.error("Gagal menyimpan data:", e);
  }
};

export const getData = async (key: string) => {
  try {
    const json = await AsyncStorage.getItem(key);
    return json != null ? JSON.parse(json) : null;
  } catch (e) {
    console.error("Gagal mengambil data:", e);
    return null;
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Gagal menghapus data:", e);
  }
};
