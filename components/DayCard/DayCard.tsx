import { SearchPanel } from "../SearchPanel/SearchPanel";
import { Article } from "../../types";

interface Props {
  articles: Article[];
}
export const DayCard = ({ articles }: Props) => {
  return (
    <div className={"flex flex-wrap h-5/6"}>
      <div className={"flex flex-col w-2/5"}>
        {/*<img className={'w-80 '} src="https://media.defense.gov/2022/Apr/29/2002987382/1280/1280/0/220429-O-D0439-002C.JPG" alt=""/>*/}
        <img
          className={"w-80 "}
          src="https://i.pinimg.com/originals/a7/d7/db/a7d7db37b3425f1ffe92ffdaa856db1d.jpg"
          alt=""
        />
        <p className={"w-80 text-xs"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          architecto aspernatur blanditiis consequatur distinctio doloremque
          doloribus dolorum earum est fugit laborum maiores mollitia natus
          quaerat quas quia quis reiciendis repellendus repudiandae rerum saepe,
          suscipit vel.
        </p>
      </div>
      <div className={"h-full overflow-y-auto w-3/5"}>
        <ul className={"max-h-full overflow-y-auto"}>
          {articles.map((item: Article) => (
            <li
              className={"text-gray-500 border-l-2 mb-3 pl-2"}
              key={item.time}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
