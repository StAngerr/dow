import { Article } from "../../types";
import { ArticlesList } from "./ArticlesList";
import { DayImage } from "./DayImage/DayImage";

interface Props {
  articles: Article[];
}

export const SingleDayPage = ({ articles }: Props) => {
  return (
    <div className={"flex flex-wrap h-5/6"}>
      <DayImage />
      <ArticlesList articles={articles} />
    </div>
  );
};
