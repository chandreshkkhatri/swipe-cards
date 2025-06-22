import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Typography, Spacing, BorderRadius } from "../../theme";

interface CategoryBadgeProps {
  category: string;
  onPress?: () => void;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  onPress,
}) => {
  if (onPress) {
    return (
      <TouchableOpacity style={styles.badge} onPress={onPress}>
        <Text style={styles.text}>{category.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{category.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.xl,
  },
  text: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700" as const,
    color: Colors.text.primary,
    letterSpacing: 0.5,
  },
});
