import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [friendName, setFriendName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleRegister = async () => {
    if (email === "" || password === "" || friendName === "") {
      Alert.alert(
        "Eksik Bilgi",
        "Lütfen tüm alanları doldurun. Arkadaşına isim vermeyi unutma!"
      );
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email,
        friendName: friendName,
        friendState: "happy",
        happiness: 100,
        lastInteraction: Date.now(),
      });
    } catch (error: any) {
      Alert.alert("Kayıt Hatası", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-kawaii-yellow justify-center px-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="bg-white p-6 rounded-3xl shadow-sm">
          <Text className="text-3xl font-bold text-center text-kawaii-text mb-2">
            Yeni Arkadaş! 🌱
          </Text>
          <Text className="text-gray-400 text-center mb-8">
            Sanal arkadaşını oluşturmaya başla
          </Text>

          <TextInput
            className="w-full bg-gray-50 p-4 rounded-xl mb-4 border border-gray-100 text-gray-700"
            placeholder="Arkadaşının Adı (Örn: Mochi)"
            value={friendName}
            onChangeText={setFriendName}
          />

          <TextInput
            className="w-full bg-gray-50 p-4 rounded-xl mb-4 border border-gray-100 text-gray-700"
            placeholder="E-posta Adresi"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            className="w-full bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100 text-gray-700"
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            className="w-full bg-kawaii-pink p-4 rounded-xl items-center mb-4 active:opacity-80"
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-lg">
                Oluştur ve Başla
              </Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-500">Zaten hesabın var mı? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-kawaii-pink font-bold">Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
