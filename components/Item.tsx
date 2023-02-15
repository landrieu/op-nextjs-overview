import Image from "next/image";
import { useRouter } from "next/router";
import { Item } from "../types/types";
import styles from "../styles/Skeleton.module.css";

// import '../styles/'
interface ItemProps {
    item: Item;
    children?: JSX.Element;
}

export default function ({ item, children }: ItemProps) {
    // if(!item) return <></>;

    const router = useRouter();

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    // Render item
    const { name, price, image, imageBlur } = item;

    return (
        <div className="item-card" style={{ width: "360px", borderRadius: "8px", overflow: "hidden", backgroundColor: "#fff", transition: "all 0.4s" }}>
            <div style={{ width: "360px", height: "300px", position: "relative" }}>
                <Image
                    src={`/img/${image}`}
                    style={{ objectFit: 'contain' }}
                    alt={name}
                    fill={true}
                    blurDataURL={`data:image/jpeg;base64,${imageBlur}`}
                    placeholder="blur"
                    loading="lazy"

                />
            </div>
            <div style={{ padding: "16px" }}>
                <h3 style={{ marginTop: 0 }}>{name}</h3>

                <p>Price <b>{price.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })}</b></p>
                {/* <p>Is available {isActive}</p> */}

                {children}

            </div>
        </div>
    );
}

export function ItemSkeleton() {
    return (
        <div className="item-card" style={{ width: "300px", borderRadius: "8px", overflow: "hidden", backgroundColor: "#fff", transition: "all 0.4s" }}>
            <div className={styles.skeleton} style={{ width: "300px", height: "300px", position: "relative", backgroundColor: 'green' }}>

            </div>
            <div style={{ padding: "16px" }}>
                <div className={styles.skeleton} style={{ marginBottom: "18px", width: "140px", height: "22px", backgroundColor: "green" }}></div>

                <div className={styles.skeleton} style={{ marginBottom: "4px", width: "60px", height: "18px", backgroundColor: "green" }}></div>
                {/* <div className={styles.skeleton} style={{ width: "90px", height: "18px", backgroundColor: "green" }}></div> */}
            </div>
        </div>
    );
}