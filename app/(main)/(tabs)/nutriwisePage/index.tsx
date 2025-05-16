import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as MediaLibrary from "expo-media-library";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { API_URL } from "@/utlis/config";

import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";
import { set } from "zod";
const nutriwise = () => {
  const cameraRef = useRef<CameraView | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [permissionMedia, requestPermissionMedia] =
    MediaLibrary.usePermissions();
  const [photo, setPhoto] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk mengirim foto ke API
  // Resize gambar
  const resizeImage = async (uri) => {
    if (typeof uri !== "string") {
      console.error("URI bukan string:", uri);
      return;
    }

    try {
      const result = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      console.log("Hasil resize:", result);
      setPhoto(result); // Simpan hasil resize ke state
      return result.uri;
    } catch (error) {
      console.error("Error during resizing:", error);
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    setLoading(true);
    try {
      // console.log("Uploading photo:", photo.uri);

      const response = await fetch(`${API_URL}/nutriwise`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      const responseText = await response.text();
      console.log("Raw Response:", responseText || "No response body");

      if (!responseText) {
        console.error("Server returned an empty response.");
        return;
      }

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (error) {
        console.error("Failed to parse JSON:", error.message);
        return;
      } finally {
        setLoading(false);
      }

      console.log("Parsed Response:", responseData);

      if (response.ok) {
        console.log("Upload success!");

        const localUri = `${FileSystem.documentDirectory}saved.jpg`;
        await FileSystem.copyAsync({ from: uri, to: localUri });

        console.log("File saved at:", localUri);

        router.push({
          pathname: "/nutriwisePage/result",
          params: { scanData: JSON.stringify(responseData), img: localUri },
        });
      } else {
        console.error("Failed to upload:", responseData);
      }
    } catch (error) {
      console.error("Error uploading:", error.message);
    }
  };

  const handleCamera = async () => {
    if (!photo || !photo.uri) {
      console.log("No photo.");
      return;
    }

    const resizedUri = await resizeImage(photo.uri);
    if (!resizedUri) {
      console.log("Resize gagal.");
      return;
    }

    await uploadImage(resizedUri);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const option = {
        quality: 1,
        base64: true,
        exif: false,
        skipProcessing: false,
      };

      try {
        const takePhoto = await cameraRef.current.takePictureAsync(option);
        setPhoto(takePhoto);
        // console.log(takePhoto?.uri);
      } catch (error) {
        console.error("Failed to take picture", error);
      }
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View className="flex-1">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="justify-center items-center flex-1 align-middle">
        <Text>We need your permission to show the camera</Text>
        <Button
          onPress={() => {
            requestPermission();
            requestPermissionMedia();
          }}
          title="grant permission"
        />
      </View>
    );
  }

  // function toggleCameraFacing() {
  //   setFacing((current) => (current === "back" ? "front" : "back"));
  // }

  function handleRetake() {
    setPhoto(null);
  }

  if (photo)
    return (
      <SafeAreaView className="flex-1 p-6 gap-14">
        {loading && (
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 justify-center items-center z-50">
            <ActivityIndicator size="large" color="#fff" />
            <Text className="mt-4 text-white font-PoppinsSemiBold">
              Menganalisis Foto...
            </Text>
          </View>
        )}
        <StatusBar style="dark" />
        <View className="flex bg-white shadow-lg rounded-md align-middle justify-center items-center p-16 h-[340px]">
          <Image
            className=""
            // source={{ uri: "data:image/jpg;base64," + photo.base64 }}
            // source={require("@/assets/images/placeholder/pineapple.png")}
            source={{ uri: photo.uri }}
            defaultSource={require("@/assets/images/placeholder/pineapple.png")}
            style={{ width: 168, height: 216 }}
          />
        </View>
        <View className="">
          <View>
            <TouchableOpacity
              className="bg-[#F5F5F5] rounded-md p-4 my-4"
              onPress={handleRetake}
            >
              <Text className="text-center font-PoppinsSemiBold text-lg text-gelapDikit">
                Foto Ulang
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              className="bg-gelapDikit rounded-md p-4 my-4"
              onPress={handleCamera}
            >
              <Text className="text-center font-PoppinsSemiBold text-lg text-white">
                Cek Kandungan Makanan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );

  return (
    <View className="flex-1 bg-gelapBanget">
      <CameraView facing="back" ref={cameraRef} style={{ flex: 1 }}>
        <View className="flex-1 justify-center items-center">
          <View className="mt-auto mb-4 px-2 py-1 rounded bg-white border border-gelapDikit">
            <Text className="text-black font-Poppins">
              Keterangan : Foto bukan makanan kemasan
            </Text>
          </View>
        </View>
      </CameraView>
      <View className="py-16 justify-center items-center">
        <TouchableOpacity
          className=" bg-white w-16 h-16 rounded-full"
          onPress={takePicture}
        />
      </View>
    </View>
  );
};

export default nutriwise;
