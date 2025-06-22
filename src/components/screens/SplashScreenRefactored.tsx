import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, StatusBar } from "react-native";
import { Colors, Typography, Spacing } from "../../theme";
import { ANIMATION } from "../../constants";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: ANIMATION.FADE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: ANIMATION.SCALE_DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    };

    startAnimation();

    const timer = setTimeout(() => {
      onFinish();
    }, ANIMATION.SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.background}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.emoji}>📰</Text>
          <Text style={styles.title}>Swipe Cards</Text>
          <Text style={styles.subtitle}>Stay informed, stay connected</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  content: {
    alignItems: "center",
  },
  emoji: {
    fontSize: 80,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Spacing.xl,
    fontWeight: "800" as const,
    color: Colors.white,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    fontWeight: "500" as const,
  },
});

export default SplashScreen;
