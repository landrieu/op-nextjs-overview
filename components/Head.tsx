import Head from 'next/head';

interface Props {
    title: string;
}

export default function (props: Props) {

    const { title } = props;

    return (
        <Head>
            <title>{title}</title>
        </Head>
    )
}