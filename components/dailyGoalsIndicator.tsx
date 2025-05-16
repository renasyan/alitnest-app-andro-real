import CirclePrecentage from "@/components/CirclePrecentage";
import { View } from "./Themed";

const DailyGoalsIndicator = ({ data }) => {
  console.log("Rendering with data:", data);
  const totals = data?.totals;

  return (
    <View
      className="bg-white p-3 rounded-2xl py-6 gap-6"
      style={{ backgroundColor: "#CAF0F8" }}
    >
      <View
        className="w-full bg-terangBanget"
        style={{ backgroundColor: "#CAF0F8" }}
      >
        <CirclePrecentage
          fontsize={24}
          title="Daily Goals"
          percentage={70}
          width={144}
          strokeColor="#E40B0F"
          strokeWidth={15}
          unit="Calories"
          goal={1872}
          count={totals?.calories}
        />
      </View>

      <View
        className="w-full flex-row justify-between items-center bg-terangBanget"
        style={{ backgroundColor: "#CAF0F8" }}
      >
        <CirclePrecentage
          fontsize={12}
          title="Protein"
          percentage={70}
          width={94}
          strokeColor="#1FCBE1"
          strokeWidth={10}
          unit="Gram"
          goal={170}
          count={totals?.protein}
        />
        <CirclePrecentage
          fontsize={12}
          title="Fat"
          percentage={70}
          width={94}
          strokeColor="#E4940B"
          strokeWidth={10}
          unit="Gram"
          goal={270}
          count={totals?.fat}
        />
        <CirclePrecentage
          fontsize={12}
          title="Carbs"
          percentage={70}
          width={94}
          strokeColor="#E4650B"
          strokeWidth={10}
          unit="Gram"
          goal={134}
          count={totals?.carbs}
        />
      </View>
    </View>
  );
};

export default DailyGoalsIndicator;
