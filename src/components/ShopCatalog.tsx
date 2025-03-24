import Link from "next/link";
import Card from "./Card";
import { ShopItem } from "../../interfaces";

export default function ShopCatalog({ shopsJSON }: { shopsJSON: any }) {
    console.log("shopsJSON received in ShopCatalog:", shopsJSON);
    if (!shopsJSON?.data || shopsJSON?.data?.length === 0) {
        return <p className="text-xl text-gray-600">No shops available</p>;
    }

    return (
        <>
            <div className="text-2xl">Select your shop</div>
            <div>Explore {shopsJSON.count ?? shopsJSON.data.length} fabulous shops in our catalog</div>
            
            <div className="flex flex-wrap justify-around p-5">
                {shopsJSON.data.map((shopItem: ShopItem) => (
                    <Link key={shopItem.id} href={`/shop/${shopItem.id}`} className="w-1/5">
                        <Card shopName={shopItem.name} imgSrc={shopItem.imageURL} />
                    </Link>
                ))}
            </div>
        </>
    );
}
