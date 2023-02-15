import Image from "next/image";
import { useRouter } from "next/router";
import { Item } from "../types/types";
import styles from "../styles/Skeleton.module.css";

// import '../styles/'
interface ItemProps {
    item?: Item;
    children?: JSX.Element;
}

export default function ({ item }: ItemProps) {
    // if(!item) return <></>;

    const router = useRouter();

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <ItemDescriptionSkeleton />;
        // return <div>Loading...</div>
    }

    if(!item){
        return <div>No item found</div>
    }
    // Render item
    const { name, price, isActive, image, imageBlur, description } = item;

    return (
        <div className="item-desc-card" style={{ display: "flex", width: "800px", borderRadius: "8px", overflow: "hidden", backgroundColor: "#fff", transition: "all 0.4s" }}>
            <div style={{ width: "300px", height: "300px", position: "relative" }}>
                <Image
                    src={`/img/${image}`}
                    alt={name}
                    fill={true}
                    blurDataURL={`data:image/jpeg;base64,${imageBlur}`}
                    placeholder="blur"
                    loading="lazy"
                />
            </div>
            <div style={{ width: "calc(100% - 300px)", padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                    <h3 style={{ marginTop: 0 }}>{name}</h3>

                    <p>Price: <b>${price}</b></p>
                    <div style={{ display: "flex" }}>
                        <span>Is available</span>
                        <div style={{ display: "flex", alignItems: "center", marginLeft: "6px", marginTop: "1px" }}>
                            <div style={{ width: "10px", height: "10px", borderRadius: "100%", backgroundColor: `${isActive ? "#38c838" : "#d71c1c"}` }}></div>
                        </div>
                    </div>

                    <br />
                    <p><b>Product description</b></p>
                    <p>{description}</p>
                </div>
                <div>
                    <button style={{ fontSize: "16px", borderRadius: "8px", width: "100%", height: "40px", color: "#fff", backgroundColor: "hsl(212, 83%, 45%)", cursor: "pointer", border: "none" }}>BUY</button>
                </div>

            </div>
        </div >
    );
}

export function ItemDescriptionSkeleton() {
    return (
        <div className="item-desc-card" style={{ display: "flex", width: "800px", borderRadius: "8px", overflow: "hidden", backgroundColor: "#fff", transition: "all 0.4s" }}>
            <div className={styles.skeleton} style={{ width: "300px", height: "300px", position: "relative" }}>

            </div>
            <div style={{ width: "calc(100% - 300px)", padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                    <h3 className={styles.skeleton} style={{ marginTop: 0, height: "22px", width: "70%" }}></h3>

                    <p className={styles.skeleton} style={{ height: "18px", width: "50%", marginBottom: "4px" }}></p>
                    <p className={styles.skeleton} style={{ height: "18px", width: "30%" }}></p>

                    {/* <p>Is available {isActive}</p> */}
                    <br />
                    <p className={styles.skeleton} style={{ height: "20px", width: "180px", marginBottom: "4px" }}></p>
                    <p className={styles.skeleton} style={{ height: "18px", width: "100%", marginBottom: "4px" }}></p>
                    <p className={styles.skeleton} style={{ height: "18px", width: "100%", marginBottom: "4px" }}></p>
                    <p className={styles.skeleton} style={{ height: "18px", width: "60%" }}></p>
                </div>
                <div>
                    <button className={styles.skeleton} style={{ fontSize: "16px", borderRadius: "8px", width: "100%", height: "40px", color: "#fff", backgroundColor: "hsl(212, 83%, 45%)", cursor: "pointer", border: "none" }}></button>
                </div>

            </div>
        </div>
    );
}