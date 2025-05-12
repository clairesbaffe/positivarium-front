export type Article = {
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