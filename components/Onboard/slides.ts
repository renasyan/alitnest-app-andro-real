export interface Slide {
  id: string;
  title: string;
  highlight?: string;
  highlightIndexStart: number;
  highlightIndexEnd: number;
  description: string;
  image: number;
}

export const slides: Slide[] = [
  {
    id: "1",
    title: "Awali Dengan Langkah Kecil Untuk Perubahan Besar",
    highlight: "Besar",
    highlightIndexStart: 6,
    highlightIndexEnd: 6,
    description: "Awali hidup sehat anda dengan langkah kecil bersama kami.",
    image: require("../../assets/images/onboarding/onboarding-1.png"),
  },
  {
    id: "2",
    title: "Atur Jadwal Latihan Anda",
    highlight: "Jadwal Latihan",
    highlightIndexStart: 1,
    highlightIndexEnd: 2,
    description:
      "Nikmati kemudahan latihan rumahan dengan fitur jadwal latihan yang akan membantu anda.",
    image: require("../../assets/images/onboarding/onboarding-2.png"),
  },
  {
    id: "3",
    title: "Kenali Asupan Nutrisi Yang Anda Konsumsi",
    highlight: "Asupan Nutrisi",
    highlightIndexStart: 1,
    highlightIndexEnd: 2,
    description:
      "Dengan fitur Nutriwise, anda bisa mengetahui kandungan nutrisi dari makanan/minuman yang anda konsumsi",
    image: require("../../assets/images/onboarding/onboarding-3.png"),
  },
];
