// import useSWR, { SWRResponse } from 'swr'
import { Item } from '../types/types';
import ItemComponent from '../components/Item';
import { GetServerSideProps } from 'next';
import { fetchItems } from '../services/db';
import styles from '../styles/Common.module.css';
import { formatPath } from '../utils/format';
import Head from '../components/Head';

interface ServerData {
    items: Item[];
    createdAt: string;
}

export default function Profile({ items }: ServerData) {

    return (
        <>
        <Head title='TechTalk'/>
            <div style={{ padding: "20px 0" }}>
                <h1 style={{ textAlign: "center" }}>Available items in the store</h1>

                <div style={{ display: "flex", justifyContent: "space-evenly", margin: "30px auto", width: "80%" }}>

                    {items.map(item => {
                        const itemNamePath = formatPath(item.name);
                        return (
                            <ItemComponent
                                key={item.id}
                                item={item}
                            >
                                <div>
                                    <div style={{ width: "100%", height: "1px", backgroundColor: "#c0c0c0", margin: "20px auto" }}></div>
                                    <div style={{ width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                                        <a href={`ssg/${itemNamePath}`}><div className={styles.cardSelect}>SSG</div></a>
                                        <a href={`ssr/${itemNamePath}`}><div className={styles.cardSelect}>SSR</div></a>
                                        <a href={`isr/${itemNamePath}`}><div className={styles.cardSelect}>ISR</div></a>
                                        <a href={`csr/${itemNamePath}`}><div className={styles.cardSelect}>CSR</div></a>
                                    </div>
                                </div>
                            </ItemComponent>
                        );
                    })}
                </div>
            </div>
        </>
    )
}


export const getServerSideProps: GetServerSideProps<ServerData> = async () => {
    // Fetch data from external API
    const items = await fetchItems();

    // Pass data to the page via props
    return { props: { items, createdAt: new Date().toUTCString() } }
}