import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert("Giriş Hatası", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-kawaii-pink justify-center px-6">
      <View className="bg-white p-6 rounded-3xl shadow-sm">
        <Text className="text-3xl font-bold text-center text-kawaii-text mb-2">
          Hoşgeldin! 🐣
        </Text>
        <Text className="text-gray-400 text-center mb-8">
          Arkadaşın seni bekliyor
        </Text>

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
          className="w-full bg-kawaii-blue p-4 rounded-xl items-center mb-4 active:opacity-80"
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-bold text-lg">Giriş Yap</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-500">Hesabın yok mu? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-kawaii-blue font-bold">Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
