import { useState, useRef, useCallback } from "react";
import { Alert } from "react-native";
import Swiper from "react-native-deck-swiper";
import { News } from "../commons/types/News";
import i18n from "../services/internationalization/i18n";

interface UseNewsSwiper {
  currentIndex: number;
  isLoading: boolean;
  swiperRef: React.RefObject<Swiper<News>>;
  handleSwiped: (cardIndex: number) => void;
  handleSwipedAll: () => void;
  refreshNews: () => void;
  goToPrevious: () => void;
  goToNext: () => void;
}

export const useNewsSwiper = (newsData: News[]): UseNewsSwiper => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const swiperRef = useRef<Swiper<News>>(null);

  const handleSwiped = useCallback((cardIndex: number) => {
    console.log(`Swiped card at index: ${cardIndex}`);
    setCurrentIndex(cardIndex + 1);
  }, []);

  const handleSwipedAll = useCallback(() => {
    console.log("All cards swiped");
    Alert.alert(
      i18n.t("noMoreNews"),
      "Would you like to refresh for more stories?",
      [
        { text: "Later", style: "cancel" },
        { text: "Refresh", onPress: refreshNews },
      ]
    );
  }, []);

  const refreshNews = useCallback(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCurrentIndex(0);
      setIsLoading(false);
      // In a real app, you would fetch new news here
    }, 1500);
  }, []);

  const goToPrevious = useCallback(() => {
    if (swiperRef.current && currentIndex > 0) {
      swiperRef.current.swipeBack();
    }
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    if (swiperRef.current && currentIndex < newsData.length - 1) {
      swiperRef.current.swipeTop();
    }
  }, [currentIndex, newsData.length]);

  return {
    currentIndex,
    isLoading,
    swiperRef,
    handleSwiped,
    handleSwipedAll,
    refreshNews,
    goToPrevious,
    goToNext,
  };
};
