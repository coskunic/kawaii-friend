export type MoodState = "happy" | "hungry" | "tired" | "bored";

export interface FriendData {
  name: string;
  state: MoodState;
  lastInteraction: number;
  happiness: number;
}

export interface UserData {
  uid: string;
  email: string;
  friend: FriendData;
}
