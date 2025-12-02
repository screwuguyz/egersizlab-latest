export interface Course {
  id: number;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  duration: string;
  students: number;
}

export interface Category {
  id: number;
  title: string;
  icon: React.ReactNode;
  color: string;
}

export interface Stat {
  id: number;
  value: string;
  label: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}