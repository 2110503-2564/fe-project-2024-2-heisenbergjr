import Link from "next/link";
import Card from "./Card";
import { ShopItem, ShopJson } from "../../interfaces";
import { ReactNode } from "react";

interface ShopCatalogProps {
    count: ReactNode;
    data: any;
    shopsJSON: ShopJson | null;
}

export default function ShopCatalog({ shopsJSON }: { shopsJSON: any}) {

    if (!shopsJSON || shopsJSON.data.length === 0) {
        return <p className="text-xl text-gray-600">No shops available</p>;
    }

    return (
        <>
            <div className="text-2xl">Select your shop</div>
            <div>Explore {shopsJSON.count} fabulous shops in our catalog</div>
            <div 
                style={{
                    margin: "20px",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignContent: "space-around",
                    justifyContent: "space-around",
                }}
            >
                {shopsJSON.data.map((shopItem: ShopItem) => (
                    <Link key={shopItem.id} href={`/shop/${shopItem.id}`} className="w-1/5">
                        <Card shopName={shopItem.name} imgSrc={shopItem.picture} />
                    </Link>
                ))}
            </div>
        </>
    );
}
