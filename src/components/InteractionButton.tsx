import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface Props {
  onPress: () => void;
  icon: React.ReactNode;
  label: string;
  bgColor: string;
  borderColor: string;
}

export const InteractionButton = ({
  onPress,
  icon,
  label,
  bgColor,
  borderColor,
}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    className={`w-[28%] aspect-square ${bgColor} rounded-[30px] items-center justify-center border ${borderColor} shadow-sm`}
  >
    {icon}
    <Text className="mt-2 font-bold text-gray-700 text-xs">{label}</Text>
  </TouchableOpacity>
);
