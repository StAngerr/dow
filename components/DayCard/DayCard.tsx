import { SearchPanel } from "../SearchPanel/SearchPanel";

interface Props {
  currentDate: Date;
}
export const DayCard = ({ currentDate }: Props) => {
  return (
    <div className={"flex flex-wrap"}>
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
      <div className={"ml-24 w-3/5"}>
        <ul>
          <li>Lorem ipsum dolor.</li>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero,
            quibusdam!
          </li>
          <li>Lorem ipsum dolor sit amet, consectetur adipisicing.</li>
          <li>Lorem ipsum dolor.</li>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
        </ul>
      </div>
    </div>
  );
};
