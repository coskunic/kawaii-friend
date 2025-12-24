import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Home, Settings } from "lucide-react-native";

const Tab = createBottomTabNavigator();

const PlaceholderScreen = ({ name }: { name: string }) => (
  <View className="flex-1 justify-center items-center bg-kawaii-pink">
    <Text className="text-xl font-bold text-kawaii-text">{name}</Text>
  </View>
);

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FDFD96",
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#FFD1DC",
        tabBarInactiveTintColor: "#B39EB5",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen || (() => <PlaceholderScreen name="Home" />)}
        options={{
          tabBarLabel: "Arkadaşım",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={
          SettingsScreen || (() => <PlaceholderScreen name="Ayarlar" />)
        }
        options={{
          tabBarLabel: "Ayarlar",
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
