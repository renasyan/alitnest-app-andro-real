import { View, Text, Pressable, Image, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { questionList } from "@/components/Survey/questionList";
import { handleSubmitSurvey } from "@/utlis/api";
import { getData } from "@/utlis/storage";
import SurveyQuestion from "@/components/surveyQuestion";
import { LinearGradient } from "expo-linear-gradient";

const Survey = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const [surveyData, setSurveyData] = useState({
    name: "",
    goal: "",
    birthDate: "",
    activityLevel: "",
    height: "",
    currentWeight: "",
    gender: "",
    targetWeight: "",
    weightGoalSpeed: "",
  });

  const currentPage = questionList[currentQuestionIndex];

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getData("user");
      if (storedUser) {
        setUser(storedUser);
        setSurveyData((prev) => ({
          ...prev,
          name: storedUser.name || "",
        }));
      }
    };
    loadUser();
  }, []);

  const handleNext = () => {
    setAnswers({});
    if (currentQuestionIndex == 4) {
      const speed = parseFloat(surveyData.weightGoalSpeed);

      if (isNaN(speed) || speed < 0.1 || speed > 0.5) {
        Alert.alert(
          "Input tidak valid",
          "Masukkan angka antara 0.1 - 0.5 untuk kecepatan target berat badan"
        );
        return;
      }
    }
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      console.log("Survey data:", surveyData);
      handleSubmitSurvey(surveyData); // Submit data di akhir
    }
  };

  const handleBack = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleAnswerChange = (tag: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [tag]: value }));
  };

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <LinearGradient
        colors={["#03045E", "#00B4D8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex flex-col h-screen p-7 align-center justify-center"
      >
        <View className="items-center">
          <Image
            source={currentPage.image}
            className="w-72 h-72"
            resizeMode="contain"
          />
        </View>

        {currentPage.tittle ? (
          <Text className="font-PoppinsBold text-3xl text-white text-center mt-2">
            {currentPage.tittle}
          </Text>
        ) : null}

        <SurveyQuestion
          questions={currentPage.question}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          surveyData={surveyData}
          setSurveyData={setSurveyData}
        />

        <View className="flex-row justify-between mt-6">
          {/* {currentQuestionIndex > 0 && (
            <Pressable
              onPress={handleBack}
              className="px-4 bg-gray-300 rounded flex-1 mr-2"
            >
              <Text>Kembali</Text>
            </Pressable>
          )} */}

          <Pressable
            onPress={handleNext}
            className="bg-gelapBanget rounded-lg p-3 mt-16 flex-1"
          >
            <Text className="text-white font-PoppinsMedium text-center text-base">
              {currentPage.buttonText || "Selanjutnya"}
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default Survey;
