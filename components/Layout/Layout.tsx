import { Header } from "../Header/Header";

// @ts-ignore
export const Layout = (props) => {
  return (
    <div className={"flex flex-col h-screen bg-gray-100"}>
      <Header />
      <div className={"flex-1 px-2 dark:bg-blue-700 overflow-y-auto"}>
        {props.children}
      </div>
      <footer className={"w-full bg-white h-10 px-8 py-1 border-t"}>
        <p className={"text-gray-400"}>ua 2023</p>
      </footer>
    </div>
  );
};
