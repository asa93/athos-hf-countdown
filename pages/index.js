import Head from "next/head";
import styles from "../styles/Home.module.css";

import { useEffect, useState } from "react";
import Countdown from "react-countdown";

const target_block = 5075000;

export default function Home() {
  const [current_block, setCurrentBlock] = useState(0);

  const fetchCurrentBlock = () => {
    fetch("https://indexer.q.org/blocks?sort=-block&page%5Blimit%5D=1")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data[0].id);
        setCurrentBlock(
          parseInt(res.data[0].id) ? parseInt(res.data[0].id) : 0
        );
      });
  };

  useEffect(() => {
    fetchCurrentBlock();
  }, []);

  console.log("current_block", current_block);
  return (
    <div className={styles.container}>
      <Head>
        <title>Q.org</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Athos Hardfork <a href="https://q.org/">Countdown</a>
        </h1>

        <h1>
          <Countdown
            date={Date.now() + (target_block - current_block) * 5 * 1000}
          />
        </h1>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
