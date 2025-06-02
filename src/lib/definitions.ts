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
  category: Category;
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

export type PublisherRequest = {
  id: number;
  motivation: string;
  status: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "CANCELLED";
  username: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Mood = {
  id: number;
  name: string;
  type:
    | "Joie"
    | "Tristesse"
    | "Colère"
    | "Peur"
    | "Surprise"
    | "Dégoût"
    | "Confiance"
    | "Anticipation";
};

export type Category = {
  id: number;
  name: string;
  generalCategory:
    | "Actualités générales"
    | "Médias & Culture"
    | "Sport"
    | "Technologies & Sciences"
    | "Divertissement & Lifestyle";
};

export type JournalEntry = {
  id: number;
  description: string;
  moods: Mood[];
  categories: Category[];
  createdAt: Date;
};

export type GlobalPreference = {
  id: number;
  mood: Mood;
  categories: Category[];
};
