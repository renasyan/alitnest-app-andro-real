import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Redirect, Slot } from "expo-router";

export default function AuthLayout() {
  const { user } = useContext(AuthContext);
  if (user) return <Redirect href="/(tabs)" />;
  return <Slot />;
}
