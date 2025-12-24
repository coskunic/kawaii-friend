# kawaii-friend

A charming virtual companion simulator built with React Native (Expo), TypeScript, NativeWind, and Firebase. Features real-time state management, authentication, and push notifications.

# 🌸 Kawaii Friend Simulator

> A virtual companion application where you create, care for, and interact with your digital friend. Built with **Expo** and **Firebase**.

![Expo](https://img.shields.io/badge/Expo-Go-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📱 Project Overview

This project is a mobile application assignment designed to demonstrate state management, authentication, and cloud integration in a real-world scenario. Users can sign up, create a unique digital friend, and manage their friend's state (Hungry, Tired, Happy, Bored) through interactive actions.

### 🎯 Key Features

- **Authentication:** Secure Email/Password login using Firebase Auth.
- **Real-time Database:** Friend status and history saved instantly to Firestore.
- **Interactive States:** Actions like "Feed", "Play", and "Rest" directly impact the character's mood.
- **Push Notifications:** Local notifications via Expo Notifications (e.g., "Your friend misses you!").
- **Modern UI:** Styled with **NativeWind** (Tailwind CSS) for a pastel, kawaii aesthetic.
- **Navigation:** Smooth transitions using Bottom Tab Navigation.

---

## 📸 Screenshots

_(Add your screenshots here later)_

|                      Home Screen                       |                           Interaction                           |                            Settings                            |
| :----------------------------------------------------: | :-------------------------------------------------------------: | :------------------------------------------------------------: |
| ![Home](https://via.placeholder.com/200x400?text=Home) | ![Interaction](https://via.placeholder.com/200x400?text=Action) | ![Settings](https://via.placeholder.com/200x400?text=Settings) |

---

## 🛠️ Tech Stack

- **Core:** React Native (Expo Managed Workflow)
- **Language:** TypeScript
- **Styling:** NativeWind (Tailwind CSS)
- **Backend:** Firebase (Authentication & Firestore)
- **Navigation:** Expo Router / React Navigation
- **Notifications:** Expo Notifications

---

## 🚀 Installation & Setup

Follow these steps to run the project locally:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/YOUR_USERNAME/kawaii-friend.git](https://github.com/YOUR_USERNAME/kawaii-friend.git)
    cd kawaii-friend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Firebase Configuration:**

    - Create a project at [Firebase Console](https://console.firebase.google.com/).
    - Enable **Authentication** (Email/Password).
    - Create a **Firestore Database**.
    - Copy your web configuration keys into `src/config/firebase.ts`.

4.  **Run the app:**

    ```bash
    npx expo start -c
    ```

5.  **Scan the QR Code:**
    - Use the **Expo Go** app on your Android/iOS device or run on an emulator.

---

## 📂 Project Structure

kawaii-friend/ ├── src/ │ ├── config/ # Firebase configuration │ ├── components/ # Reusable UI components │ ├── navigation/ # Tab and Stack navigators │ ├── screens/ # Application screens (Home, Auth, Settings) │ └── types/ # TypeScript interfaces ├── App.tsx # Entry point ├── tailwind.config.js └── babel.config.js

## 📝 License

This project is for educational purposes.
