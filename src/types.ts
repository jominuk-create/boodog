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
