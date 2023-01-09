import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="chainIDE planet template" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="container">
          <div className="sky">
            <div className="text">#CODEVEMBER</div>
            <div className="stars"></div>
            <div className="stars1"></div>
            <div className="stars2"></div>
            <div className="shooting-stars"></div>
          </div>
        </div>
        {/* <div
          className="stars js-plaxify"
          data-xrange="60"
          data-yrange="60"
        ></div>
        <div className="moon js-plaxify" data-xrange="20" data-yrange="20">
          <div className="crater1"></div>
          <div className="crater2"></div>
          <div className="crater3"></div>
        </div> */}
      </main>
    </>
  );
}
