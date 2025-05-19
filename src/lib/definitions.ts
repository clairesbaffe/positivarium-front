export type SimpleArticle = {
  id: number;
  title: string;
  main_image: string;
  username: string;
  category: {
    id: number;
    name: string;
    generalCategory: string;
  };
  likesCount: number;
};

export type Article = {
  id: number;
  title: string;
  content: string;
  mainImage: string;
  username: string;
  category: {
    id: number;
    name: string;
    generalCategory: string;
  };
  isPublished: boolean;
  publishedAt: Date;
  likesCount: number;
  userLiked: boolean;
};

export type Comment = {
  id: number;
  content: string;
  username: string;
};

export type User = {
  id: number;
  username: string;
}