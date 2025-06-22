import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { HomeScreen, SplashScreen, ErrorBoundary } from "./src/components";

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
