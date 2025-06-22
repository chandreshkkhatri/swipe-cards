import { Dimensions } from "react-native";

// Screen dimensions
export const SCREEN_DIMENSIONS = Dimensions.get("window");

// Layout constants
export const LAYOUT = {
  CARD_MARGIN: 20,
  CARD_VERTICAL_MARGIN: 10,
  HEADER_HEIGHT: 60,
  NAVIGATION_HEIGHT: 80,
  BORDER_RADIUS: {
    SMALL: 8,
    MEDIUM: 12,
    LARGE: 20,
    ROUND: 25,
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
  },
} as const;

// Animation constants
export const ANIMATION = {
  SPLASH_DURATION: 2500,
  FADE_DURATION: 1000,
  SCALE_DURATION: 1000,
  DEBOUNCE_DELAY: 300,
} as const;

// Swiper configuration
export const SWIPER_CONFIG = {
  STACK_SIZE: 3,
  STACK_SEPARATION: 15,
  VERTICAL_SWIPE: true,
  HORIZONTAL_SWIPE: false,
  SHOW_SECOND_CARD: true,
  SWIPE_BACK_CARD: true,
  ANIMATE_CARD_OPACITY: true,
  ANIMATE_OVERLAY_LABELS_OPACITY: true,
} as const;

// Image placeholders
export const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/400x200/007AFF/FFFFFF?text=News+Image";

// API endpoints (for future use)
export const API_ENDPOINTS = {
  NEWS_FEED: "/api/news",
  BOOKMARK: "/api/bookmark",
  SHARE: "/api/share",
} as const;
