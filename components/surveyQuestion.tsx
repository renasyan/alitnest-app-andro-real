import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import { set } from "zod";

type QuestionType = {
  id: string;
  question: string;
  type: string;
  tag?: string;
  option?: string[];
  add?: string;
};

interface Props {
  questions: QuestionType[];
  selectedOption: number | null;
  setSelectedOption: (index: number | null) => void;
  surveyData: any;
  setSurveyData: (data: any) => void;
}

const SurveyQuestion = ({
  questions,
  selectedOption,
  setSelectedOption,
  surveyData,
  setSurveyData,
}: Props) => {
  const handleChange = (tag: string, value: string) => {
    setSurveyData((prev) => ({ ...prev, [tag]: value }));
  };

  const [open, setOpen] = useState(false);

  const [birth, setBirth] = useState("");

  const toggleDatePicker = () => {
    setOpen(!open);
    console.log("clicked");
  };

  return (
    <View className="space-y-4 mt-4">
      {questions.map((q, index) => {
        switch (q.type) {
          case "notaquestion":
            return (
              <Text
                key={q.id}
                className="font-PoppinsExtraBold text-sm text-center text-white my-4"
              >
                {q.question}
              </Text>
            );

          case "radio":
            return (
              <View key={q.id}>
                <Text className="font-PoppinsExtraBold text-sm text-center text-white my-4">
                  {q.question}
                </Text>
                {q.option?.map((opt, optIdx) => (
                  <Pressable
                    key={optIdx}
                    onPress={() => {
                      setSelectedOption(optIdx);
                      if (q.tag) handleChange(q.tag, opt);
                    }}
                    className={`p-3 border rounded mb-2 ${
                      selectedOption === optIdx
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300"
                    }`}
                  >
                    <Text
                      style={{ color: "white" }}
                      className="text-white font-PoppinsMedium text-sm"
                    >
                      {opt}
                    </Text>
                  </Pressable>
                ))}
              </View>
            );

          case "num":
            return (
              <View key={q.id}>
                <Text className="font-PoppinsExtraBold text-sm text-center text-white my-4">
                  {q.question}
                </Text>
                <TextInput
                  keyboardType="numeric"
                  style={{ color: "white" }}
                  onChangeText={(text) => q.tag && handleChange(q.tag, text)}
                  className="border border-gray-300 rounded px-3 py-2"
                  placeholder={q.add || ""}
                />
              </View>
            );

          case "datepicker":
            return (
              //   <View key={q.id}>
              //     <Text className="mb-1 font-medium">{q.question}</Text>
              //     <DateTimePicker
              //       value={
              //         surveyData[q.tag || "birthDate"]
              //           ? new Date(surveyData[q.tag])
              //           : new Date()
              //       }
              //       mode="date"
              //       display="default"
              //       onChange={(event, selectedDate) => {
              //         if (selectedDate && q.tag) {
              //           handleChange(q.tag, selectedDate.toISOString());
              //         }
              //       }}
              //     />
              //   </View>
              <View key={q.id} className="justify-center items-center">
                <Text className="font-PoppinsExtraBold text-sm text-center text-white my-4">
                  {q.question}
                </Text>
                {open && (
                  <DateTimePicker
                    value={
                      surveyData[q.tag || "birthDate"]
                        ? new Date(surveyData[q.tag])
                        : new Date()
                    }
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      if (selectedDate && q.tag) {
                        [
                          handleChange(
                            q.tag,
                            selectedDate.toISOString().split("T")[0]
                          ),
                          setBirth(selectedDate.toISOString().split("T")[0]),
                        ];
                      }
                    }}
                  />
                )}
                <Pressable onPress={toggleDatePicker}>
                  <Text className="font-PoppinsMedium text-base text-white">
                    <Feather name="calendar" size={24} color="white" />{" "}
                    {birth ? birth : "dd/mm/yyyy"}
                  </Text>
                </Pressable>
              </View>
            );

          default:
            return null;
        }
      })}
    </View>
  );
};

export default SurveyQuestion;
