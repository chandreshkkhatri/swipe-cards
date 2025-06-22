import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./src/components/screens/HomeScreen";
import SplashScreen from "./src/components/screens/SplashScreen";
import ErrorBoundary from "./src/components/commons/ErrorBoundary";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <ErrorBoundary>
      <StatusBar style="auto" />
      <HomeScreen />
    </ErrorBoundary>
  );
}
