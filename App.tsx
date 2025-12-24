import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-kawaii-pink">
      <Text className="text-red-500 font-bold text-2xl">
        Kawaii Friend Başlıyor! 🐣
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
