import React, { useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { NewsCardProps } from "../../commons/types/News";
import { CategoryBadge } from "../ui/CategoryBadge";
import { MetaInfo } from "../ui/MetaInfo";
import { ActionButtons } from "../ui/ActionButtons";
import {
  formatDateSimple,
  getImageSource,
  shareNews,
  bookmarkNews,
} from "../../utils/helpers";
import {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
} from "../../theme";
import { LAYOUT } from "../../constants";
import i18n from "../../services/internationalization/i18n";

const NewsCard: React.FC<NewsCardProps> = ({ card }) => {
  const handleReadMore = useCallback(() => {
    console.log("Read more:", card.title);
    // Navigate to full article or open in browser
  }, [card.title]);

  const handleBookmark = useCallback(() => {
    bookmarkNews(card.id);
  }, [card.id]);

  const handleShare = useCallback(() => {
    shareNews(card);
  }, [card]);

  const handleCategoryPress = useCallback(() => {
    console.log("Category pressed:", card.category);
    // Filter by category
  }, [card.category]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image
            source={getImageSource(card.image)}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />

          {/* Category Badge */}
          {card.category && (
            <View style={styles.categoryBadgeContainer}>
              <CategoryBadge
                category={card.category}
                onPress={handleCategoryPress}
              />
            </View>
          )}
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{card.title}</Text>

          {/* Meta Info */}
          <MetaInfo
            author={card.author}
            date={formatDateSimple(card.date)}
            readTime={card.readTime}
          />

          <Text style={styles.description}>{card.description}</Text>
          <Text style={styles.contentText}>{card.content}</Text>
        </ScrollView>

        {/* Action Buttons */}
        <ActionButtons
          onReadMore={handleReadMore}
          onBookmark={handleBookmark}
          onShare={handleShare}
          isBookmarked={card.isBookmarked}
        />

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
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius["2xl"],
    marginHorizontal: LAYOUT.CARD_MARGIN,
    marginVertical: LAYOUT.CARD_VERTICAL_MARGIN,
    ...Shadows.lg,
    overflow: "hidden",
  },
  imageContainer: {
    height: "35%",
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
  categoryBadgeContainer: {
    position: "absolute",
    top: Spacing.lg,
    right: Spacing.lg,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: "800" as const,
    color: Colors.text.primary,
    lineHeight: Typography.lineHeight.tight * Typography.fontSize["2xl"],
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.base,
    marginBottom: Spacing.md,
    fontWeight: "500" as const,
  },
  contentText: {
    fontSize: Typography.fontSize.sm + 1,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.relaxed * (Typography.fontSize.sm + 1),
    marginBottom: Spacing.lg,
  },
  swipeIndicator: {
    position: "absolute",
    bottom: Spacing.sm,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  swipeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.disabled,
    opacity: 0.7,
  },
});

export default NewsCard;
