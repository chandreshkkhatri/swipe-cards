export interface News {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
  content: string;
  url: string;
  category?: string;
  readTime?: number;
  isBookmarked?: boolean;
}

export interface NewsCardProps {
  card: News;
}

export interface SwipeDirection {
  LEFT: 'left';
  RIGHT: 'right';
  UP: 'up';
  DOWN: 'down';
}
