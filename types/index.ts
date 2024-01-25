import { Tag } from "./tags";

export interface CurrentDate {
  date: Date;
  dateStr: string;
}

export interface QueryObj {
  date: string;
}

export interface Article {
  date: string;
  fullDate: string;
  id: string;
  level: number;
  source: string;
  time: string;
  title: string;
  visible: boolean;
  url: string;
  tags: Tag[];
}

export type ArticleDTO = Omit<Article, "tags"> & { tags: Tag[] };
