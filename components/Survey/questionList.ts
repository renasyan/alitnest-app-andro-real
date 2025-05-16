import { tags } from "react-native-svg/lib/typescript/xmlTags";

export interface Question {
  id: string;
  tittle: string;
  image: number;
  question: Question[];
  buttonText: string;
  add?: string;
}

export const questionList = [
  {
    id: "1",
    tittle: "Halo",
    image: require("../../assets/images/survey/survey-01.png"),
    question: [
      {
        id: "Q1",
        question: "Yuk kita lihat kebutuhan kamu apa aja",
        type: "notaquestion",
      },
    ],
    buttonText: "Mulai",
  },
  {
    id: "2",
    tittle: "",
    image: require("../../assets/images/survey/survey-02.png"),
    question: [
      {
        id: "Q1",
        tag: "goal",
        question:
          "Karena Anda sudah berkunjung, kami yakin Anda ingin menjadi lebih bugar. Apa tujuan Anda?",
        option: [
          "Menurunkan berat badan",
          "Menaikkan berat badan",
          "Menjaga berat badan",
        ],
        type: "radio",
      },
    ],
    buttonText: "Selanjutnya",
  },
  {
    id: "3",
    tittle: "Ceritakan Tentang Diri Anda Kepada Kami",
    image: require("../../assets/images/survey/survey-03.png"),
    question: [
      {
        id: "Q1",
        tag: "birthDate",
        question: "Kapan Tanggal Lahir Anda?",
        type: "datepicker",
      },
      {
        id: "Q2",
        tag: "activityLevel",
        question: "Seberapa aktif aktivitas anda?",
        option: [
          "Sedentary (sedikit atau tidak berolahraga sama sekali)",
          "Aktif ringan (olahraga ringan 1-3 hari/minggu)",
          "Aktif sedang (olahraga sedang 3-5 hari/minggu)",
          "Sangat aktif (olahraga berat 6-7 hari/minggu)",
          "Ekstra aktif (olahraga sangat berat 2x/hari)",
        ],
        type: "radio",
      },
    ],
    buttonText: "Selanjutnya",
  },
  {
    id: "4",
    tittle: "Ceritakan Tentang Diri Anda Kepada Kami",
    image: require("../../assets/images/survey/survey-03.png"),
    question: [
      {
        id: "Q1",
        tag: "height",
        question: "Berapa Tinggi Badan Anda?",
        type: "num",
        add: "Cm",
      },
      {
        id: "Q2",
        tag: "currentWeight",
        question: "Berapa Berat Badan Anda saat ini?",
        type: "num",
        add: "Kg",
      },
      {
        id: "Q3",
        tag: "gender",
        question: "Apa jenis kelamin anda?",
        option: ["Perempuan", "Laki-laki"],
        type: "radio",
      },
    ],

    buttonText: "Selanjutnya",
  },
  {
    id: "5",
    tittle: "Ayo Kita Masuk Ke Target Tujuannya!",
    image: require("../../assets/images/survey/survey-04.png"),
    question: [
      {
        id: "Q1",
        tag: "targetWeight",
        question: "Berapa Target Berat Badan Anda ?",
        type: "num",
        add: "Kg",
      },
      {
        id: "Q2",
        tag: "weightGoalSpeed",
        question: "Seberapa cepat Anda ingin mencapai tujuan Anda?",
        type: "num",
        add: "Kg/Minggu",
      },
    ],
    buttonText: "Selanjutnya",
  },
  {
    id: "6",
    tittle: "Anda Sudah Siap Memulai Perjalanan dengan Alitnest?",
    image: require("../../assets/images/survey/survey-05.png"),
    question: [
      {
        id: "Q1",
        question: "",
        type: "notaquestion",
      },
    ],
    buttonText: "Ayo Mulai!",
  },
];
