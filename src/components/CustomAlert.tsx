import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export const CustomAlert = ({
  visible,
  title,
  message,
  onClose,
}: CustomAlertProps) => (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <View className="flex-1 justify-center items-center bg-black/40 px-10">
      <View className="bg-white w-full rounded-[40px] p-8 items-center shadow-xl border-4 border-pink-100">
        <Text className="text-2xl font-bold text-gray-800 mb-2">{title}</Text>
        <Text className="text-lg text-gray-600 text-center mb-6">
          {message}
        </Text>
        <TouchableOpacity
          onPress={onClose}
          className="bg-pink-400 px-10 py-3 rounded-full"
        >
          <Text className="text-white font-bold text-lg">Tamam ✨</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
