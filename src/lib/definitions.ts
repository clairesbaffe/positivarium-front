export type SimpleArticle = {
  id: number;
  title: string;
  description: string;
  mainImage: string;
  username: string;
  category: {
    id: number;
    name: string;
    generalCategory: string;
  };
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  likesCount: number;
};

export type Article = {
  id: number;
  title: string;
  description: string;
  content: string;
  mainImage: string;
  username: string;
  category: {
    id: number;
    name: string;
    generalCategory: string;
  };
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  likesCount: number;
  userLiked: boolean;
};

export type Comment = {
  id: number;
  content: string;
  username: string;
  createdAt: Date;
};

export type User = {
  id: number;
  username: string;
  description: string;
};
