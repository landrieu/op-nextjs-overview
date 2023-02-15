import { fetchItemByName, fetchItems } from "../../services/db";
import ItemLayout from "../../components/layout/ItemLayout";
import { Item } from "../../types/types";
import { formatPath, formatTime, formatTitle } from "../../utils/format";
import ItemDescription from "../../components/ItemDescription";
import Head from "../../components/Head";
import Title from "../../components/Title";
// Static Generation
// SSG

// Page path depends on external data

interface PageProps {
    item: Item;
    createdAt: string;
}

export default function Page({ item, createdAt }: PageProps) {
    const title = formatTitle('TechTalk', item?.name);

    return (
        <>
            <Head title={title} />
            <div>
                <Title
                    text1="SSG"
                    text2={`generated at  ${createdAt}`}
                />
                <ItemLayout>
                    <>
                        {/* <ItemComponent item={item} /> */}

                        <ItemDescription item={item} />
                    </>
                </ItemLayout>
            </div>
        </>
    )
}

// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
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
    return { paths, fallback: false }
}

// This function gets called at build time
export async function getStaticProps({ params }: { params: { [key: string]: string } }) {
    const { id } = params;

    // Fetch data from external API
    const item = await fetchItemByName(id);

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
    }
}