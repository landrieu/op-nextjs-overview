import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="op-metadata" content="TechTalk" />

                {/* <head>
                    <title>Home - onepoint</title>
                    <meta name="description" content="We are transformation architects beyond the obvious." />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Home" />
                    <meta property="og:description" content="We are the transformation architects beyond the obvious." />
                    <meta property="og:url" content="https://www.groupeonepoint.com/en-au/" />
                    <meta property="og:site_name" content="onepoint" />
                    <meta property="og:image" content="https://www.groupeonepoint.com/wp-content/uploads/2021/02/default-og-img.jpg" />
                </head> */}

            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}