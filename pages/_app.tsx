import { AppProps, NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

// Can send web metrics to a server for reporting and monitoring
export function reportWebVitals(metric: NextWebVitalsMetric) {
    console.log(metric);
}

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {

    return (
        <>
            <Head>
                <link rel="icon" href="/img/favicon.ico" />
                <link rel="shortcut icon" href="/img/favicon.ico" />
            </Head>

            <Component {...pageProps} />
        </>
    );
}