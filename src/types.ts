export type RoomType = 'kitchen' | 'bedroom' | 'bathroom' | 'livingroom' | 'entrance' | 'balcony' | 'utility' | null;

export interface Tip {
  id: number;
  category: RoomType;
  title: string;
  content: string;
  author: string;
  likes: number;
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  difficulty: '쉬움' | '보통' | '어려움';
}

export interface PostComment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

export interface CommunityPost {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: PostComment[];
}
