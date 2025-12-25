import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  Bell,
  User,
  LogOut,
  Save,
  Utensils,
  Gamepad2,
  Moon,
} from "lucide-react-native";

export default function SettingsScreen() {
  const [friendName, setFriendName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [notifHungry, setNotifHungry] = useState(true);
  const [notifPlay, setNotifPlay] = useState(false);
  const [notifSleep, setNotifSleep] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
          if (userDoc.exists()) {
            setFriendName(userDoc.data().friendName || "Arkadaşım");
          }
        } catch (error) {
          console.log("Hata:", error);
        }
      }
      setFetching(false);
    };
    fetchUserData();
  }, []);

  const handleUpdateName = async () => {
    if (!friendName.trim()) {
      Alert.alert("Hata", "Lütfen bir isim girin.");
      return;
    }
    setLoading(true);
    try {
      if (auth.currentUser) {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          friendName: friendName,
        });
        Alert.alert("Başarılı ✨", "İsim güncellendi!");
      }
    } catch (error) {
      Alert.alert("Hata", "İsim kaydedilemedi.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    Alert.alert("Çıkış yap", "Oturumu kapatmak istediğine emin misin?", [
      { text: "Vazgeç", style: "cancel" },
      { text: "Evet", onPress: () => auth.signOut() },
    ]);
  };

  if (fetching) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#f472b6" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        className="px-6"
      >
        <Text className="text-3xl font-bold text-gray-800 mb-8 mt-10 text-center">
          Ayarlar
        </Text>

        <View className="bg-gray-50 p-6 rounded-[40px] mb-6 border border-gray-100 shadow-sm">
          <View className="flex-row items-center mb-4">
            <User color="#f472b6" size={24} />
            <Text className="ml-3 text-lg font-bold text-gray-700">
              İsim Değiştir
            </Text>
          </View>
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 bg-white border border-gray-200 p-4 rounded-2xl mr-2 text-gray-800"
              value={friendName}
              onChangeText={setFriendName}
            />
            <TouchableOpacity
              onPress={handleUpdateName}
              disabled={loading}
              className="bg-pink-400 p-4 rounded-2xl active:bg-pink-500"
            >
              <Save color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-gray-50 p-6 rounded-[40px] mb-6 border border-gray-100 shadow-sm">
          <View className="flex-row items-center mb-6">
            <Bell color="#f472b6" size={24} />
            <Text className="ml-3 text-lg font-bold text-gray-700">
              Bildirim Ayarları
            </Text>
          </View>

          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center">
              <Utensils color="#666" size={20} />
              <Text className="ml-3 text-gray-600">
                {friendName} acıkınca uyar
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#dee2e6", true: "#fbcfe8" }}
              thumbColor={notifHungry ? "#f472b6" : "#f4f3f4"}
              onValueChange={setNotifHungry}
              value={notifHungry}
            />
          </View>

          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center">
              <Gamepad2 color="#666" size={20} />
              <Text className="ml-3 text-gray-600">Oyun isteyince uyar</Text>
            </View>
            <Switch
              trackColor={{ false: "#dee2e6", true: "#fbcfe8" }}
              thumbColor={notifPlay ? "#f472b6" : "#f4f3f4"}
              onValueChange={setNotifPlay}
              value={notifPlay}
            />
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Moon color="#666" size={20} />
              <Text className="ml-3 text-gray-600">Uykusu gelince uyar</Text>
            </View>
            <Switch
              trackColor={{ false: "#dee2e6", true: "#fbcfe8" }}
              thumbColor={notifSleep ? "#f472b6" : "#f4f3f4"}
              onValueChange={setNotifSleep}
              value={notifSleep}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-50 p-6 rounded-[40px] border border-red-100 flex-row items-center justify-center"
        >
          <LogOut color="#ef4444" size={24} />
          <Text className="ml-3 text-lg font-bold text-red-500">Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
