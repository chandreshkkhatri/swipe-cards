import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
// Temporarily commented out while fixing the import issue
// import { LinearGradient } from "expo-linear-gradient";
import { NewsCardProps } from "../../commons/types/News";
import i18n from "../../services/internationalization/i18n";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const NewsCard: React.FC<NewsCardProps> = ({ card }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: card.image || "https://via.placeholder.com/400x200",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />

          {/* Category Badge */}
          {card.category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {card.category.toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{card.title}</Text>

          {/* Meta Info */}
          <View style={styles.metaContainer}>
            <Text style={styles.author}>
              {i18n.t("author")}: {card.author}
            </Text>
            <Text style={styles.date}>{formatDate(card.date)}</Text>
            {card.readTime && (
              <Text style={styles.readTime}>
                {i18n.t("readTime", { minutes: card.readTime })}
              </Text>
            )}
          </View>

          <Text style={styles.description}>{card.description}</Text>
          <Text style={styles.contentText}>{card.content}</Text>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📖 {i18n.t("readMore")}</Text>
          </TouchableOpacity>

          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionText}>
                {card.isBookmarked ? "❤️" : "🤍"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionText}>📤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Swipe Indicator */}
        <View style={styles.swipeIndicator}>
          <Text style={styles.swipeText}>{i18n.t("swipeUp")}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    overflow: "hidden",
  },
  imageContainer: {
    height: screenHeight * 0.35,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  categoryBadge: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#333",
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1a1a1a",
    lineHeight: 32,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
    gap: 8,
  },
  author: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  readTime: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
    marginBottom: 16,
    fontWeight: "500",
  },
  contentText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
    marginBottom: 20,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  actionButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 1,
    marginRight: 12,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  quickActions: {
    flexDirection: "row",
    gap: 8,
  },
  quickActionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
  },
  quickActionText: {
    fontSize: 20,
  },
  swipeIndicator: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  swipeText: {
    fontSize: 12,
    color: "#999",
    opacity: 0.7,
  },
});

export default NewsCard;
