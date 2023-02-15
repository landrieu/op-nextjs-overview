import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { Item } from '../types/types';
import { formatPath } from '../utils/format';
import useSWR from 'swr'

function fetcher(url: string) {
    return fetch(url)
        .then((res) => res.json())

}

export default function Home() {

    const { data: availableItems, error, isLoading } = useSWR<Item[]>('/api/items', fetcher)

    if (error) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>

    // useEffect(() => {
    //     fetchItems().then(items => setAvailableItems(items));
    // }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>TechTalk - NextJs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h3>SSG: Static site generation</h3>

                        <ul>
                            {(availableItems ?? []).map((item, index) => {
                                return (
                                    <li key={`item-${index}`}>
                                        <a href={`ssg/items/${formatPath(item.name)}`}>{item.name}</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className={styles.card}>
                        <h3>SSR</h3>
                        <p>Server-side rendering</p>

                        <p>Items</p>
                        <ul>
                            {(availableItems ?? []).map((item, index) => {
                                return (
                                    <li key={`ssr-item-${index}`}>
                                        <a href={`ssr/items/${item.id}`}>{item.name}</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div
                        className={styles.card}
                    >
                        <h3>CSR</h3>
                        <p>Client-side render</p>
                    </div>

                    <div className={styles.card}>
                        <h3>ISR</h3>
                        <p>Incremental static rendering</p>

                        <ul>
                            {(availableItems ?? []).map((item, index) => {
                                return (
                                    <li key={`isr-item-${index}`}>
                                        <a href={`isr/items/${formatPath(item.name)}`}>{item.name}</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </main>

            <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
    )
}