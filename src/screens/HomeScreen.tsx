import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { Heart, Utensils, Gamepad2, Moon } from "lucide-react-native";

const MOODS = {
  happy: {
    image: require("../../assets/images/cat_happy.png"),
    text: "Çok Mutlu ✨",
    color: "bg-green-100",
  },
  hungry: {
    image: require("../../assets/images/cat_hungry.png"),
    text: "Acıktı 🍎",
    color: "bg-orange-100",
  },
  tired: {
    image: require("../../assets/images/cat_tired.png"),
    text: "Uykusu Var 😴",
    color: "bg-purple-100",
  },
  bored: {
    image: require("../../assets/images/cat_bored.png"),
    text: "Sıkıldı 🎮",
    color: "bg-blue-100",
  },
};

export default function HomeScreen() {
  const [friendData, setFriendData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const catBounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(catBounce, {
          toValue: -10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(catBounce, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const user = auth.currentUser;
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) setFriendData(docSnap.data());
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const showAlert = (title: string, message: string) => {
    setModalContent({ title, message });
    setModalVisible(true);
  };

  const handleInteraction = async (action: "feed" | "play" | "rest") => {
    if (!auth.currentUser) return;
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    let updates = {};
    const currentHappiness = friendData?.happiness ?? 0;
    const currentState = friendData?.friendState || "happy";

    switch (action) {
      case "feed":
        if (currentState === "happy") {
          updates = {
            happiness: Math.max(currentHappiness - 10, 0),
            lastInteraction: Date.now(),
          };
          showAlert("Doydum Ben! 🤢", "Zorla yedirme, mutsuz oldum!");
        } else {
          const nextState = Math.random() > 0.7 ? "bored" : "happy";
          updates = {
            friendState: nextState,
            happiness: Math.min(currentHappiness + 20, 100),
            lastInteraction: Date.now(),
          };
          showAlert(
            "Yum yum! 🍎",
            nextState === "bored" ? "Doydum ama canım sıkılıyor!" : "Harikaydı!"
          );
        }
        break;
      case "play":
        if (currentState === "tired" || currentState === "hungry") {
          updates = {
            happiness: Math.max(currentHappiness - 20, 0),
            lastInteraction: Date.now(),
          };
          showAlert("Halsizim... 😢", "Bu halde oyun oynatman beni çok üzdü.");
        } else {
          const nextState = Math.random() > 0.5 ? "hungry" : "tired";
          updates = {
            friendState: nextState,
            happiness: Math.min(currentHappiness + 25, 100),
            lastInteraction: Date.now(),
          };
          showAlert(
            "Yaşasın! 🎮",
            nextState === "hungry"
              ? "Çok eğlendim ama acıktım!"
              : "Yoruldum ama değdi!"
          );
        }
        break;
      case "rest":
        if (currentState === "tired") {
          const nextState = Math.random() > 0.5 ? "hungry" : "bored";
          updates = {
            friendState: nextState,
            happiness: Math.min(currentHappiness + 15, 100),
            lastInteraction: Date.now(),
          };
          showAlert(
            "Günaydın! ☀️",
            nextState === "bored"
              ? "Uykumu aldım, haydi oynayalım!"
              : "Uyandım ama karnım zil çalıyor!"
          );
        } else {
          updates = {
            happiness: Math.max(currentHappiness - 10, 0),
            lastInteraction: Date.now(),
          };
          showAlert(
            "Uykum Yok! 😠",
            "Boş yere uyutmaya çalıştığın için mutsuz oldum."
          );
        }
        break;
    }
    try {
      await updateDoc(userDocRef, updates);
    } catch (e) {
      showAlert("Hata", "Kayıt yapılamadı.");
    }
  };

  if (loading) return null;
  const currentMood =
    MOODS[friendData?.friendState as keyof typeof MOODS] || MOODS.happy;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <View className="flex-1 px-8 relative">
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View className="flex-1 justify-center items-center bg-black/40 px-10">
            <View className="bg-white w-full rounded-[40px] p-8 items-center shadow-xl border-4 border-pink-100">
              <Text className="text-2xl font-bold text-gray-800 mb-2">
                {modalContent.title}
              </Text>
              <Text className="text-lg text-gray-600 text-center mb-6">
                {modalContent.message}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-pink-400 px-10 py-3 rounded-full"
              >
                <Text className="text-white font-bold text-lg">Tamam ✨</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View className="mt-10 items-center">
          <Text className="text-4xl font-bold text-gray-800">
            {friendData?.friendName || "Arkadaşım"}
          </Text>
          <View className={`px-6 py-2 rounded-full mt-3 ${currentMood.color}`}>
            <Text className="font-bold text-gray-700 text-lg">
              {currentMood.text}
            </Text>
          </View>
        </View>

        <View className="absolute top-0 left-0 right-0 bottom-24 items-center justify-center z-[-1]">
          <Animated.Image
            source={currentMood.image}
            style={{ transform: [{ translateY: catBounce }] }}
            className="w-80 h-80"
            resizeMode="contain"
          />
          <View className="flex-row items-center justify-center w-full -mt-6 px-10">
            <Heart fill="#FFD1DC" stroke="#FFD1DC" size={32} />
            <View className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden mx-4">
              <View
                className="h-full bg-pink-400"
                style={{ width: `${friendData?.happiness ?? 0}%` }}
              />
            </View>
            <Text className="font-bold text-gray-700 text-xl w-14 text-right">
              {friendData?.happiness ?? 0}%
            </Text>
          </View>
        </View>

        <View className="absolute bottom-4 left-8 right-8 items-center">
          <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Onunla İlgilen ✨
          </Text>
          <View className="flex-row justify-between w-full">
            <TouchableOpacity
              onPress={() => handleInteraction("feed")}
              className="w-[28%] aspect-square bg-orange-50 rounded-[30px] items-center justify-center border border-orange-100 shadow-sm"
            >
              <Utensils color="#FB923C" size={32} />
              <Text className="mt-2 font-bold text-gray-700 text-xs">
                Besle
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleInteraction("play")}
              className="w-[28%] aspect-square bg-blue-50 rounded-[30px] items-center justify-center border border-blue-100 shadow-sm"
            >
              <Gamepad2 color="#60A5FA" size={32} />
              <Text className="mt-2 font-bold text-gray-700 text-xs">Oyna</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleInteraction("rest")}
              className="w-[28%] aspect-square bg-purple-50 rounded-[30px] items-center justify-center border border-purple-100 shadow-sm"
            >
              <Moon color="#C084FC" size={32} />
              <Text className="mt-2 font-bold text-gray-700 text-xs">Uyut</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
