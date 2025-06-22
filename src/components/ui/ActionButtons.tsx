import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors, Typography, Spacing, BorderRadius } from "../../theme";

interface ActionButtonsProps {
  onReadMore: () => void;
  onBookmark: () => void;
  onShare: () => void;
  isBookmarked?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onReadMore,
  onBookmark,
  onShare,
  isBookmarked = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.primaryButton} onPress={onReadMore}>
        <Text style={styles.primaryButtonText}>📖 Read more</Text>
      </TouchableOpacity>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton} onPress={onBookmark}>
          <Text style={styles.quickActionText}>
            {isBookmarked ? "❤️" : "🤍"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton} onPress={onShare}>
          <Text style={styles.quickActionText}>📤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    flex: 1,
    marginRight: Spacing.md,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: "600" as const,
    textAlign: "center",
  },
  quickActions: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  quickActionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.gray[50],
    justifyContent: "center",
    alignItems: "center",
  },
  quickActionText: {
    fontSize: 20,
  },
});
