import Link from "next/link";
import Card from "./Card";
import { ShopItem } from "../../interfaces";

export default function ShopCatalog({ 
    shopsJSON, 
    onDelete, 
    role 
}: { 
    shopsJSON: any; 
    onDelete: (shopId: string) => void; 
    role: string | undefined;
}) {
    console.log("shopsJSON received in ShopCatalog:", shopsJSON);

    if (!shopsJSON?.data || shopsJSON?.data?.length === 0) {
        return <p className="text-xl text-gray-600 text-center mt-5">No shops available</p>;
    }

    return (
        <div className="text-center p-6">
            <h2 className="text-4xl font-bold mb-2">Select Your Shop</h2>
            <p className="text-gray-200 mb-6">
                Explore <strong>{shopsJSON.count ?? shopsJSON.data.length}</strong> fabulous shops in our catalog
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {shopsJSON.data.map((shopItem: ShopItem) => (
                    <Link key={shopItem.id} href={`/shop/${shopItem.id}`} className="block">
                        <Card 
                            shopName={shopItem.name} 
                            imgSrc={shopItem.imageURL} 
                            address={shopItem.address}
                            tel={shopItem.tel}
                            opentime={shopItem.opentime}
                            closetime={shopItem.closetime}
                            onDelete={() => onDelete(shopItem.id)}
                            role={role}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
