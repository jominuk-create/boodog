export type RoomType = 'kitchen' | 'bedroom' | 'bathroom' | 'livingroom' | 'entrance' | 'balcony' | 'utility' | null;

export interface Tip {
  id: number;
  category: RoomType;
  title: string;
  content: string;
  details?: string;
  steps?: string[];
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  difficulty: '쉬움' | '보통' | '어려움';
}

export interface PostComment {
  id: string;
  author: string;
  content: string;
  createdAt: any; // Firestore timestamp
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: any; // Firestore timestamp
  likes: number;
  commentCount: number;
}
