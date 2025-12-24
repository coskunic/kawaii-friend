import { initializeApp } from "firebase/app";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { initializeAuth, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0T4pf2tPv0VL8ppQ7_nFUMz40KBaEozE",
  authDomain: "kawaii-friend-7278d.firebaseapp.com",
  projectId: "kawaii-friend-7278d",
  storageBucket: "kawaii-friend-7278d.firebasestorage.app",
  messagingSenderId: "1097241062772",
  appId: "1:1097241062772:web:2b1d596f7f7ed7dea61021",
  measurementId: "G-F3YZMV6TT5",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
