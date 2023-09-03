import { articlesByDate, articlesById } from "./articles.urls";
import { Article, ArticleDTO } from "../../types";

export const getArticlesByDate = (date: string) => {
  return fetch(articlesByDate.replace(":date", date)).then((resp) =>
    resp.json()
  );
};

export const updateArticle = (article: ArticleDTO) => {
  return fetch(articlesById.replace(":id", article.id), {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });
};
