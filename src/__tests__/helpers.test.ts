import { News } from "../commons/types/News";
import {
  formatDate,
  formatDateSimple,
  truncateText,
  generateReadTime,
  validateNewsItem,
  isValidUrl,
} from "../utils/helpers";

describe("Helper Functions", () => {
  const mockNews: News = {
    id: 1,
    title: "Test News Title",
    description: "Test description for news article",
    content:
      "This is a test content for the news article that should be long enough to test read time calculation.",
    image: "https://example.com/image.jpg",
    date: "2024-06-22",
    author: "Test Author",
    url: "https://example.com/article",
    category: "Technology",
    readTime: 5,
    isBookmarked: false,
  };

  describe("formatDate", () => {
    it("should format date correctly for recent dates", () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const result = formatDate(yesterday.toISOString());
      expect(result).toBe("Yesterday");
    });

    it("should format date correctly for dates within a week", () => {
      const today = new Date();
      const threeDaysAgo = new Date(today);
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const result = formatDate(threeDaysAgo.toISOString());
      expect(result).toBe("3 days ago");
    });
  });

  describe("formatDateSimple", () => {
    it("should format date in simple format", () => {
      const result = formatDateSimple("2024-06-22");
      expect(result).toMatch(/Jun \d{1,2}, 2024/);
    });
  });

  describe("truncateText", () => {
    it("should truncate text when longer than maxLength", () => {
      const longText = "This is a very long text that should be truncated";
      const result = truncateText(longText, 20);
      expect(result).toBe("This is a very long...");
    });

    it("should not truncate text when shorter than maxLength", () => {
      const shortText = "Short text";
      const result = truncateText(shortText, 20);
      expect(result).toBe("Short text");
    });
  });

  describe("generateReadTime", () => {
    it("should calculate read time correctly", () => {
      const content = "word ".repeat(200); // 200 words
      const result = generateReadTime(content);
      expect(result).toBe(1); // 200 words / 200 WPM = 1 minute
    });
  });

  describe("validateNewsItem", () => {
    it("should validate complete news item", () => {
      const result = validateNewsItem(mockNews);
      expect(result).toBe(true);
    });

    it("should invalidate incomplete news item", () => {
      const incompleteNews = {
        id: 1,
        title: "Test Title",
        // missing other required fields
      };
      const result = validateNewsItem(incompleteNews);
      expect(result).toBe(false);
    });
  });

  describe("isValidUrl", () => {
    it("should validate correct URLs", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("http://example.com")).toBe(true);
    });

    it("should invalidate incorrect URLs", () => {
      expect(isValidUrl("not-a-url")).toBe(false);
      expect(isValidUrl("")).toBe(false);
      expect(isValidUrl(undefined)).toBe(false);
    });
  });
});
