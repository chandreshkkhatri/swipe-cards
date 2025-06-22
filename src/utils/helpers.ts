import { News } from "../commons/types/News";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
};

export const formatDateSimple = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + "...";
};

export const generateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(" ").length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export const getImageSource = (imageUrl?: string): { uri: string } => ({
  uri:
    imageUrl ||
    "https://via.placeholder.com/400x200/007AFF/FFFFFF?text=News+Image",
});

export const validateNewsItem = (news: Partial<News>): boolean => {
  return !!(
    news.id &&
    news.title &&
    news.description &&
    news.author &&
    news.date
  );
};

export const shareNews = async (news: News): Promise<void> => {
  try {
    // This would implement actual sharing functionality
    console.log("Sharing news:", news.title);
    // In a real app, you'd use react-native-share or Expo sharing
  } catch (error) {
    console.error("Error sharing news:", error);
  }
};

export const bookmarkNews = (newsId: number): void => {
  // This would implement bookmark functionality
  console.log("Bookmarking news:", newsId);
  // In a real app, you'd save to local storage or backend
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const isValidUrl = (url?: string): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
