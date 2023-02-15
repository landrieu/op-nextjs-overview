
import { fetchItemByName, fetchItems } from "../../services/db";
import ItemLayout from "../../components/layout/ItemLayout";
import { Item } from "../../types/types";
import { formatPath, formatTime, formatTitle } from "../../utils/format";
import ItemDescription from "../../components/ItemDescription";
import Head from "../../components/Head";
import Title from "../../components/Title";

// Incremental Static Rendering
// ISR
// Page path depends on external data

interface PageProps {
    item?: Item;
    createdAt: string;
}

export default function Page(props: PageProps) {
    const { item, createdAt } = props;
    const title = formatTitle('TechTalk', item?.name);

    return (
        <>
            <Head title={title} />
            <div>
                <Title
                    text1="ISR"
                    text2={`generated at  ${createdAt}`}
                />
                <ItemLayout>
                    <ItemDescription item={item} />
                </ItemLayout>
            </div>
        </>
    )
}

// This function gets called at build time
export async function getStaticPaths() {
    console.log('Running ISR item getStaticPaths...');

    // Call an external API endpoint to get the items we want render at the build time
    const items = await fetchItems();

    // Get the paths we want to pre-render based on posts
    const paths = items.map((item) => ({
        params: { id: formatPath(item.name) },
    }))

    /**
     * paths = [{params: {id: 'ball'}}, {params: {id: 'shoe'}}, ...] 
     *  ==>  [url]/ssg/items/[id]
     */

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: true }
}

// This function gets called at build time
// If fallback true or blocking, called if page has not been generated yet
// If 


export async function getStaticProps({ params }: { params: { [key: string]: string } }) {
    console.log('Running ISR item getStaticProps...');

    // Fetch data from external API
    const item = await fetchItemByName(params.id ?? '');

    if (!item) {
        return {
            redirect: {
                destination: `/not-found`,
            },
        }
    }

    // Pass data to the page via props
    return {
        props: { item, createdAt: formatTime(new Date()) },
        // Without revalidate SSG, 
        // With revalidate ISR

        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 60 // In seconds
        // notFound: !item,
    }
}