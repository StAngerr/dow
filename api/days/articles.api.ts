import { articlesByDate } from "./articles.urls";

export const getArticlesByDate = (date: string) => {
  return fetch(articlesByDate.replace(":date", date)).then((resp) =>
    resp.json()
  );
};
