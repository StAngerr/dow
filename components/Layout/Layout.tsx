import {Header} from "../Header/Header";
import {useAtom} from "jotai";
import {darkMode} from "../../atoms/config.atom";

// @ts-ignore
export const Layout = (props) => {

    return <div className={'flex flex-col h-full'}>
        <Header />
        <div className={'flex-grow px-2 dark:bg-blue-700'}>
            {props.children}
        </div>
        <footer className={'w-full h-10 px-8 py-1 border-t'}>
            <p className={'text-gray-400'}>ua 2023</p>
        </footer>
    </div>
}
