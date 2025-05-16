import { Link, router } from "expo-router";
import {
  Animated,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { slides } from "@/components/Onboard/slides";
import React, { useRef, useState } from "react";
import OnboardingItems from "@/components/Onboard/Items";
import { LinearGradient } from "expo-linear-gradient";

import Paginator from "@/components/Onboard/Paginator";
import NextButton from "@/components/Onboard/NextButton";

const WelcomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      const index = viewableItems[0].index;
      if (index !== null) {
        setCurrentIndex(index);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
    }
  );

  const handleSkipPress = () => {
    slidesRef.current?.scrollToEnd();
  };

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log("Daftar awokawok");
      router.push("/(auth)/login");
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <LinearGradient
        colors={["#00B4D8", "#03045E"]}
        start={{ x: 0, y: 0 }} // Titik awal (kiri atas)
        end={{ x: 1, y: 1 }} // Titik akhir (kanan bawah)// Warna gradien
        className="flex flex-col justify-between h-screen py-28"
      >
        <FlatList
          className="flex gap-2 "
          data={slides}
          renderItem={({ item }) => <OnboardingItems item={item} />}
          horizontal
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          //   scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          showsHorizontalScrollIndicator={false}
        />
        <Paginator data={slides} scrollX={scrollX} />
        {currentIndex < 2 && (
          <View className="flex-row w-full flex justify-between items-center px-6">
            <TouchableOpacity onPress={handleSkipPress}>
              <Text className="color-white text-base font-Poppins">Lewati</Text>
            </TouchableOpacity>
            <NextButton
              scrollTo={scrollTo}
              percentage={(currentIndex + 1) * (100 / slides.length)}
            />
          </View>
        )}
        {currentIndex === 2 && (
          <TouchableOpacity
            onPress={handleSkipPress}
            className="flex-row w-full flex justify-between items-center px-6"
          >
            <Text className="color-white text-base"></Text>
            <NextButton
              scrollTo={scrollTo}
              percentage={(currentIndex + 1) * (100 / slides.length)}
            />
          </TouchableOpacity>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default WelcomePage;
