import React from "react";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <div id={"modal-container"}></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
