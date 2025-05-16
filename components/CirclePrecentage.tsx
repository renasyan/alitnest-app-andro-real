import { Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";

export type Props = {
  fontsize: number;
  title: String;
  percentage: number;
  width: number;
  strokeWidth: number;
  strokeColor: string;
  goal: number;
  count: number;
  unit: String;
};

const circlePrecentage: React.FC<Props> = ({
  fontsize = 12,
  title = "Lorem Ipsum",
  percentage,
  width = 144,
  strokeColor = "#1FCBE1",
  strokeWidth = 15,
  unit = "Calories",
  goal,
  count,
}) => {
  width = width + 15;
  const radius = width / 2 - 15;
  const circumference = 2 * Math.PI * radius;
  percentage = (count / goal) * 100;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  return (
    <View className="">
      <View className="items-center">
        <Text style={{ fontSize: fontsize }} className="font-PoppinsBold">
          {title}
        </Text>
        <View style={{ position: "relative", width, height: width }}>
          <Svg height={width} width={width}>
            <Circle
              stroke="#03045E"
              cx={width / 2}
              cy={width / 2}
              r={radius}
              strokeWidth={strokeWidth}
              fill="#ffff"
            />
            <Circle
              stroke={strokeColor}
              cx={width / 2}
              cy={width / 2}
              r={radius}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform={`rotate(-90 ${width / 2} ${width / 2})`}
            />
          </Svg>
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text className="font-PoppinsBold text-base">{count}</Text>
            <Text className="font-Poppins text-xs">{unit}</Text>
          </View>
        </View>
        {/* <Text className="font-Poppins text-xs">
          Target : {goal} {unit}
        </Text> */}
      </View>
    </View>
  );
};

export default circlePrecentage;
