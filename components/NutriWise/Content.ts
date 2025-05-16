// export interface mainInterface {
//   title: string;
//   value: number | null;
//   precentage: number;
// }
// export interface Nutrition {
//   title: string;
//   value?: number;
//   precentage: number;
//   details?: mainInterface[];
// }

// export const nutrition: Nutrition[] = [
//   {
//     title: "Total Fat",
//     value: 0.12,
//     precentage: 0,
//   },
//   {
//     title: "Total Carbohydrate",
//     value: 12.63,
//     precentage: 5,
//   },
//   {
//     title: "Protein",
//     value: 0.54,
//     precentage: 0,
//   },
//   {
//     title: "Vitamin",
//     precentage: 45,
//     details: [
//       {
//         title: "Vitamin A",
//         value: 0,
//         precentage: 0,
//       },
//       {
//         title: "Calcium",
//         value: 0,
//         precentage: 0,
//       },
//       {
//         title: "Iron",
//         value: 0,
//         precentage: 0,
//       },
//       {
//         title: "Pottasium",
//         value: 0,
//         precentage: 0,
//       },
//     ],
//   },
// ];

// content.ts

export interface mainInterface {
  title: string;
  value: number | null;
  precentage: number;
}

export interface Nutrition {
  title: string;
  value?: number;
  precentage: number;
  details?: mainInterface[];
}

// Variabel untuk menyimpan data dari backend (akan diisi di ResultPage.tsx)
export let nutrition: Nutrition[] = [];

// Fungsi untuk memperbarui data `nutrition`
export const setNutritionData = (newData: Nutrition[]) => {
  nutrition = newData;
};
