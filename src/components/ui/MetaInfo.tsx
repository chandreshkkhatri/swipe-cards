import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Typography, Spacing } from "../../theme";

interface MetaInfoProps {
  author: string;
  date: string;
  readTime?: number;
}

export const MetaInfo: React.FC<MetaInfoProps> = ({
  author,
  date,
  readTime,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.author}>Author: {author}</Text>
      <Text style={styles.date}>{date}</Text>
      {readTime && <Text style={styles.readTime}>{readTime} min read</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  author: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    fontWeight: "600" as const,
  },
  date: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  readTime: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: "500" as const,
  },
});
