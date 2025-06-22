import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import Swiper from "react-native-deck-swiper";

import i18n from "../../services/internationalization/i18n";
import NewsCard from "../commons/NewsCard";
import { News } from "../../commons/types/News";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Mock news data with realistic content
const mockNewsData: News[] = [
  {
    id: 1,
    title: "Breaking: AI Revolution Transforms Mobile Development",
    description:
      "Artificial Intelligence is reshaping how we build mobile applications, with new tools making development faster and more accessible than ever before.",
    content:
      "The mobile development landscape is experiencing a seismic shift as artificial intelligence tools become increasingly sophisticated. Developers are now able to generate code, design interfaces, and optimize performance using AI-powered assistants. This transformation is not just about productivity; it's about democratizing app development and making it accessible to a broader range of creators. Major tech companies are investing billions in AI infrastructure, signaling a future where human creativity and machine intelligence work in perfect harmony to build the next generation of mobile applications.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop",
    date: "2024-06-22",
    author: "Sarah Johnson",
    url: "https://example.com/ai-mobile-dev",
    category: "Technology",
    readTime: 5,
    isBookmarked: false,
  },
  {
    id: 2,
    title: "Climate Change: Scientists Discover New Solution",
    description:
      "Researchers have developed a groundbreaking technology that could significantly reduce carbon emissions from industrial processes.",
    content:
      "A team of international researchers has unveiled a revolutionary carbon capture technology that operates at room temperature with remarkable efficiency. This breakthrough could transform heavy industries like cement and steel production, which are traditionally major contributors to global carbon emissions. The technology uses a novel catalyst system that can be integrated into existing industrial infrastructure without requiring complete overhauls. Early trials show a 90% reduction in emissions, with the captured carbon being converted into useful materials for construction and manufacturing.",
    image:
      "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=200&fit=crop",
    date: "2024-06-21",
    author: "Dr. Michael Chen",
    url: "https://example.com/climate-solution",
    category: "Environment",
    readTime: 7,
    isBookmarked: true,
  },
  {
    id: 3,
    title: "Space Exploration: Mars Colony Plans Unveiled",
    description:
      "Space agencies reveal ambitious plans for establishing the first permanent human settlement on Mars within the next two decades.",
    content:
      "The Mars colonization project represents humanity's greatest adventure yet. With advances in propulsion technology, life support systems, and sustainable agriculture in hostile environments, the dream of a self-sustaining Mars colony is becoming reality. The project involves multiple space agencies and private companies working together to develop the necessary infrastructure. Key challenges include radiation protection, food production, and psychological health of colonists during the long journey and extended isolation. The first crewed mission is scheduled for 2035, with a permanent base following by 2045.",
    image:
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400&h=200&fit=crop",
    date: "2024-06-20",
    author: "Commander Lisa Rodriguez",
    url: "https://example.com/mars-colony",
    category: "Space",
    readTime: 8,
    isBookmarked: false,
  },
  {
    id: 4,
    title: "Healthcare Revolution: Personalized Medicine Goes Mainstream",
    description:
      "Advanced genetic testing and AI analysis are making personalized medical treatments accessible to everyone.",
    content:
      "The era of one-size-fits-all medicine is ending as personalized treatments become the new standard of care. By analyzing individual genetic profiles, lifestyle factors, and environmental influences, doctors can now prescribe treatments tailored specifically to each patient's unique biology. This approach has shown remarkable success in cancer treatment, with personalized therapies achieving cure rates up to 85% higher than traditional methods. The technology is also being applied to mental health, cardiovascular disease, and rare genetic disorders, offering hope to millions of patients worldwide.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    date: "2024-06-19",
    author: "Dr. Priya Patel",
    url: "https://example.com/personalized-medicine",
    category: "Healthcare",
    readTime: 6,
    isBookmarked: true,
  },
  {
    id: 5,
    title: "Economic Shift: Renewable Energy Becomes Cheapest Power Source",
    description:
      "Solar and wind energy costs have dropped below fossil fuels globally, triggering a massive economic transformation.",
    content:
      "The global energy landscape has reached a historic tipping point. Renewable energy sources are now the cheapest form of power generation in over 140 countries, fundamentally altering economic calculations for governments and businesses worldwide. This shift is driving unprecedented investment in clean energy infrastructure, creating millions of jobs while reducing energy costs for consumers. Major corporations are accelerating their transition to renewable energy, not just for environmental reasons, but because it makes financial sense. The transformation is expected to save the global economy trillions of dollars over the next decade while significantly reducing carbon emissions.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=200&fit=crop",
    date: "2024-06-18",
    author: "Robert Thompson",
    url: "https://example.com/renewable-energy-economy",
    category: "Economics",
    readTime: 4,
    isBookmarked: false,
  },
];

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const swiperRef = useRef<Swiper<News>>(null);

  const handleSwiped = (cardIndex: number) => {
    console.log(`Swiped card at index: ${cardIndex}`);
    setCurrentIndex(cardIndex + 1);
  };

  const handleSwipedAll = () => {
    console.log("All cards swiped");
    Alert.alert(
      i18n.t("noMoreNews"),
      "Would you like to refresh for more stories?",
      [
        { text: "Later", style: "cancel" },
        { text: "Refresh", onPress: () => refreshNews() },
      ]
    );
  };

  const refreshNews = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCurrentIndex(0);
      setIsLoading(false);
      // In a real app, you would fetch new news here
    }, 1500);
  };

  const goToPrevious = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeBack();
    }
  };

  const goToNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeTop();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{i18n.t("loading")}</Text>
      </View>
    );
  }

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
          verticalSwipe={true}
          horizontalSwipe={false}
          backgroundColor="transparent"
          cards={mockNewsData}
          renderCard={(card) => <NewsCard card={card} />}
          showSecondCard={true}
          swipeBackCard={true}
          stackSize={3}
          stackSeparation={15}
          onSwiped={handleSwiped}
          onSwipedAll={handleSwipedAll}
          cardVerticalMargin={0}
          cardHorizontalMargin={0}
          animateCardOpacity={true}
          animateOverlayLabelsOpacity={true}
          overlayLabels={{
            top: {
              title: "NEXT",
              style: {
                label: {
                  backgroundColor: "#4CAF50",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  borderRadius: 10,
                  padding: 10,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                },
              },
            },
            bottom: {
              title: "PREVIOUS",
              style: {
                label: {
                  backgroundColor: "#FF9800",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  borderRadius: 10,
                  padding: 10,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                },
              },
            },
          }}
        />
      </View>

      {/* Navigation Controls */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, styles.prevButton]}
          onPress={goToPrevious}
          disabled={currentIndex === 0}
        >
          <Text style={styles.navButtonText}>⬇️ Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.refreshButton} onPress={refreshNews}>
          <Text style={styles.refreshButtonText}>🔄</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={goToNext}
          disabled={currentIndex >= mockNewsData.length - 1}
        >
          <Text style={styles.navButtonText}>⬆️ Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
    fontWeight: "500",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1a1a1a",
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsIcon: {
    fontSize: 20,
  },
  counterContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  counterText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  swiperContainer: {
    flex: 1,
    paddingBottom: 80,
  },
  navigationContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  prevButton: {
    opacity: 0.8,
  },
  nextButton: {
    opacity: 0.8,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  refreshButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  refreshButtonText: {
    fontSize: 24,
  },
});
