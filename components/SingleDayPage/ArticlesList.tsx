import { Article } from "../../types";
interface Props {
  articles: Article[];
}

export const ArticlesList = ({ articles }: Props) => {
  return (
    <div className={"h-full overflow-y-auto w-3/5 pl-5"}>
      <ul className={"max-h-full overflow-y-auto"}>
        {articles.map((item: Article) => (
          <li className={"text-gray-500 border-l-2 mb-3 pl-2"} key={item.time}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
