import { Button } from "../common/Button/Button";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { DarkModeToggle } from "../common/DarkModeToggle/DarkModeToggle";

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-4 py-2 bg-primary text-white">
      <div>
        <img src="/logo.svg" alt="Logo" className="h-8" />
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <Link href={"/archive/2024-01-11"}>
              <span className="hover:underline">Archive</span>
            </Link>
          </li>
          <li>
            <Link href={"/about"}>
              <span className="hover:underline"></span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={"flex"}>
        <DarkModeToggle />
        <Button color="secondary" className="mr-2">
          Login
        </Button>
        <Button color="primary">Logout</Button>
      </div>
    </header>
  );
};
