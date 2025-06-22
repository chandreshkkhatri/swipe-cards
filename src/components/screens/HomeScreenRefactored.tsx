import React from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { News } from "../../commons/types/News";
import { useNewsSwiper } from "../../hooks/useNewsSwiper";
import { mockNewsData } from "../../data/mockNews";
import NewsCard from "../commons/NewsCard";
import {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
} from "../../theme";
import { SWIPER_CONFIG, LAYOUT } from "../../constants";
import i18n from "../../services/internationalization/i18n";

const HomeScreen: React.FC = () => {
  const {
    currentIndex,
    isLoading,
    swiperRef,
    handleSwiped,
    handleSwipedAll,
    refreshNews,
    goToPrevious,
    goToNext,
  } = useNewsSwiper(mockNewsData);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{i18n.t("loading")}</Text>
      </View>
    );
  }

  const overlayLabels = {
    top: {
      title: "NEXT",
      style: {
        label: {
          backgroundColor: Colors.success,
          color: Colors.white,
          fontSize: Typography.fontSize.base,
          fontWeight: "bold" as const,
          borderRadius: BorderRadius.md,
          padding: Spacing.md,
        },
        wrapper: {
          flexDirection: "column" as const,
          alignItems: "center" as const,
          justifyContent: "center" as const,
        },
      },
    },
    bottom: {
      title: "PREVIOUS",
      style: {
        label: {
          backgroundColor: Colors.warning,
          color: Colors.white,
          fontSize: Typography.fontSize.base,
          fontWeight: "bold" as const,
          borderRadius: BorderRadius.md,
          padding: Spacing.md,
        },
        wrapper: {
          flexDirection: "column" as const,
          alignItems: "center" as const,
          justifyContent: "center" as const,
        },
      },
    },
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{i18n.t("welcome")}</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* News Counter */}
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          {currentIndex + 1} / {mockNewsData.length}
        </Text>
      </View>

      {/* Swiper */}
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          verticalSwipe={SWIPER_CONFIG.VERTICAL_SWIPE}
          horizontalSwipe={SWIPER_CONFIG.HORIZONTAL_SWIPE}
          backgroundColor="transparent"
          cards={mockNewsData}
          renderCard={(card: News) => <NewsCard card={card} />}
          showSecondCard={SWIPER_CONFIG.SHOW_SECOND_CARD}
          swipeBackCard={SWIPER_CONFIG.SWIPE_BACK_CARD}
          stackSize={SWIPER_CONFIG.STACK_SIZE}
          stackSeparation={SWIPER_CONFIG.STACK_SEPARATION}
          onSwiped={handleSwiped}
          onSwipedAll={handleSwipedAll}
          cardVerticalMargin={0}
          cardHorizontalMargin={0}
          animateCardOpacity={SWIPER_CONFIG.ANIMATE_CARD_OPACITY}
          animateOverlayLabelsOpacity={
            SWIPER_CONFIG.ANIMATE_OVERLAY_LABELS_OPACITY
          }
          overlayLabels={overlayLabels}
        />
      </View>

      {/* Navigation Controls */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentIndex === 0 && styles.navButtonDisabled,
          ]}
          onPress={goToPrevious}
          disabled={currentIndex === 0}
        >
          <Text
            style={[
              styles.navButtonText,
              currentIndex === 0 && styles.navButtonTextDisabled,
            ]}
          >
            ⬇️ Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.refreshButton} onPress={refreshNews}>
          <Text style={styles.refreshButtonText}>🔄</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            currentIndex >= mockNewsData.length - 1 && styles.navButtonDisabled,
          ]}
          onPress={goToNext}
          disabled={currentIndex >= mockNewsData.length - 1}
        >
          <Text
            style={[
              styles.navButtonText,
              currentIndex >= mockNewsData.length - 1 &&
                styles.navButtonTextDisabled,
            ]}
          >
            ⬆️ Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  loadingText: {
    fontSize: Typography.fontSize.lg,
    color: Colors.text.secondary,
    fontWeight: "500" as const,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingTop: LAYOUT.HEADER_HEIGHT,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.surface,
    ...Shadows.sm,
  },
  headerTitle: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: "800" as const,
    color: Colors.text.primary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray[50],
    justifyContent: "center",
    alignItems: "center",
  },
  settingsIcon: {
    fontSize: 20,
  },
  counterContainer: {
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  counterText: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    fontWeight: "600" as const,
  },
  swiperContainer: {
    flex: 1,
    paddingBottom: LAYOUT.NAVIGATION_HEIGHT,
  },
  navigationContainer: {
    position: "absolute",
    bottom: Spacing.xl,
    left: Spacing.lg,
    right: Spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    ...Shadows.sm,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "600" as const,
    color: Colors.text.primary,
  },
  navButtonTextDisabled: {
    color: Colors.text.disabled,
  },
  refreshButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.md,
  },
  refreshButtonText: {
    fontSize: 24,
  },
});

export default HomeScreen;
