import { MealFromAPI } from "./api";

export interface FormattedMeal {
  id: string;
  name: string;
  calories: string;
  protein: string;
  image: string;
  time: string;
  mealType: string;
}

export interface GroupedMeal {
  title: string;
  data: FormattedMeal[];
}

function classifyMealType(time: string): string {
  const [hourStr] = time.split(":");
  const hour = parseInt(hourStr, 10);
  if (hour < 11) return "Pagi";
  if (hour < 16) return "Siang";
  return "Sore";
}

export function groupMeals(meals: MealFromAPI[]): GroupedMeal[] {
  const formatted = meals.map((meal, index) => ({
    id: `${index + 1}`,
    name: meal.name,
    calories: `${meal.calories} Kalori`,
    protein: `${meal.protein} gr Protein`,
    image:
      "https://th.bing.com/th/id/OIP.AWtd2HsOtHY62iYZZH1TdgHaE8?rs=1&pid=ImgDetMain",
    time: meal.time,
    mealType:
      meal.mealType !== "unspecified"
        ? meal.mealType
        : classifyMealType(meal.time),
  }));

  const grouped: GroupedMeal[] = [];

  formatted.forEach((meal) => {
    const existing = grouped.find((g) => g.title === meal.mealType);
    if (existing) {
      existing.data.push(meal);
    } else {
      grouped.push({ title: meal.mealType, data: [meal] });
    }
  });

  return grouped;
}
