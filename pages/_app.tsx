import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout/Layout";
import React, { useEffect } from "react";
import Socket from "../socket";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Socket.init();
  }, []);

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
