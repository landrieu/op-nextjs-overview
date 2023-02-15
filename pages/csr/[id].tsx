
import ItemLayout from "../../components/layout/ItemLayout";
import { Item } from "../../types/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ItemDescription, { ItemDescriptionSkeleton } from "../../components/ItemDescription";
import Head from "../../components/Head";
import { formatTime, formatTitle } from "../../utils/format";
import Title from "../../components/Title";
// Client Side Rendering
// CSR

export default function ClientItem() {
    const [isLoading, setIsLoading] = useState(false);
    const [item, setItem] = useState<Item | null>(null);
    const [dateTime, setDateTime] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const title = formatTitle('TechTalk', item?.name);

    useEffect(() => {
        const itemId = router.query.id ?? null;
        if (typeof itemId === 'string') {
            fetchItem(itemId);
        }

        setDateTime(new Date());
    }, [router]);

    async function fetchItem(itemId: string) {
        setIsLoading(true);

        try {
            const item = await (await fetch(`/api/items/${itemId}`)).json();

            if (item) setItem(item)
            else setError('Could not fetch the item requested');

        } catch (error) {
            console.log(error);
            setError('Could not fetch the item requested');
        } finally {
            await new Promise(r => setTimeout(() => r(true), 1000));
            setIsLoading(false);
        }
    }

    return (
        <>
            <Head title={title} />
            <div>
                <Title
                    text1="CSR"
                    text2={`generated at ${dateTime ? formatTime(dateTime) : ''}`}
                />
                <ItemLayout>
                    <>
                        {error ? <h4>No item: {error}</h4> : (isLoading ? <ItemDescriptionSkeleton /> : (item ? <ItemDescription item={item} /> : <></>))}
                        {/* <ItemDescriptionSkeleton /> */}
                    </>
                </ItemLayout>
            </div>
        </>
    );


    // return (
    //     <div>
    //         <h3 style={{ textAlign: "center" }}>CSR page generated at {dateTime}</h3>
    //         <ItemLayout>
    //             {(isLoading || !item) ? <ItemSkeleton /> : <ItemComponent item={item} />}
    //         </ItemLayout>
    //     </div>
    // )
}