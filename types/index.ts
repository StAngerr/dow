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
  level: 4;
  source: string;
  time: string;
  title: string;
  url: string;
  tags: Tag[];
}

export type ArticleDTO = Omit<Article, "tags"> & { tags: string[] };
