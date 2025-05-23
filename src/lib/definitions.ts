export type User = {
  id: number;
  username: string;
  description: string;
  isFollowed: boolean;
};

export type UserDetails = {
  id: number;
  username: string;
  email: string;
  description: string;
  roles: string[];
};

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

export type CommentWithArticle = {
  id: number;
  content: string;
  username: string;
  createdAt: Date;
  article: SimpleArticle;
};

export type ArticleReport = {
  id: number;
  reason: string;
  isReviewed: boolean;
  createdAt: Date;
  article: SimpleArticle;
};

export type CommentReport = {
  id: number;
  reason: string;
  isReviewed: boolean;
  createdAt: Date;
  comment: CommentWithArticle;
};
