import { Button } from "../common/Button/Button";
import Link from "next/link";
import { useCallback, useState } from "react";

export const Header = () => {
  const [isDarkMode, setIsDarkMod] = useState(false);
  const toggleMode = useCallback(() => {
    setIsDarkMod(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  }, [isDarkMode]);

  return (
    <header className={"shadow-md"}>
      <nav
        className={
          "py-2 flex w-full justify-between px-8 bg-gray-50 dark:bg-violet-600"
        }
      >
        {/* Logo */}
        <div className={"w-32 h-12 overflow-hidden"}>
          {/*<img className={'w-full h-full'} src="https://png.pngtree.com/png-vector/20220804/ourmid/pngtree-ukraine-flag-transparent-watercolor-painted-brush-png-image_6099056.png" alt="logo"/>*/}
          <img
            className={"w-full h-full cursor-pointer"}
            src="https://w7.pngwing.com/pngs/693/943/png-transparent-pixelize-high-rise-buildings-building-city-building-building-condominium-skyscraper-thumbnail.png"
            alt="logo"
          />
        </div>
        {/*Navigation*/}
        <ul className={"flex flex-grow justify-center items-center"}>
          <li
            className={
              "mr-8 transition cursor-pointer text-blue-500 hover:text-blue-300 dark:text-white"
            }
          >
            <Link href={"/archive/today"}>Archive</Link>
          </li>
          <li
            className={
              "mr-8 transition cursor-pointer text-blue-500 hover:text-blue-300 dark:text-white"
            }
          >
            <Link href={"/about"}>About</Link>
          </li>
        </ul>
        <label className={"flex items-center justify-center flex-col"}>
          <span className={"text-xs text-gray-500 dark:text-white mr-3"}>
            Night Mode
          </span>
          <input checked={isDarkMode} onChange={toggleMode} type={"checkbox"} />
        </label>
        {/*Auth*/}
        <div className={"flex items-center justify-between"}>
          <Button>Login</Button>
          <Button type={"primary"}>Signup</Button>
        </div>
      </nav>
    </header>
  );
};
