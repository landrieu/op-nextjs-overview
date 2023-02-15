import { Item } from "../../types/types"
import { IncomingMessage } from "http";
import Head from "../../components/Head";
import { NextApiResponse } from "next";
import { fetchItemByName } from "../../services/db";
import ItemLayout from "../../components/layout/ItemLayout";
import ItemDescription, { ItemDescriptionSkeleton } from "../../components/ItemDescription";
import { formatTime, formatTitle } from "../../utils/format";
import Title from "../../components/Title";


// Server-side Rendering
// SSR

interface PageProps {
    item: Item | null;
    createdAt: string;
}

export default function Page({ item, createdAt }: PageProps) {
    const title = formatTitle('TechTalk', item?.name);
    return (
        <>
            <Head title={title} />
            <div>
                <Title
                    text1="SSR"
                    text2={`generated at  ${createdAt}`}
                />
                <ItemLayout>
                    {item ? <ItemDescription item={item} /> : <ItemDescriptionSkeleton />}
                </ItemLayout>
            </div>
        </>
    )
}

interface ServerSideProps {
    req: IncomingMessage;
    res: NextApiResponse;
    query: { [key: string]: string };
}

// This gets called on every request
export async function getServerSideProps({ res, query }: ServerSideProps): Promise<{ props: PageProps }> {
    const { id } = query;

    // Fetch data from external API
    const item = await fetchItemByName(id);

    if (!item) {
        res.writeHead(302, { Location: `/not-found` });
        res.end();
        return { props: { item: null, createdAt: '' } }
    }

    // Pass data to the page via props
    return { props: { item, createdAt: formatTime(new Date()) } }
}