import getShop from "@/libs/getMassageShop";
import Link from "next/link";
import WebImage from "@/components/WebImage";

export default async function ShopDetailPage({ params }: { params: { id: string } }) {
    console.log(params.id)
    const shopDetail = await getShop(params.id);

    if (!shopDetail) {
        return <p className="text-center text-lg text-gray-600">Shop not found.</p>;
    }

    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{shopDetail.data.name || "No Name"}</h1>
            <div className="w-[50%] h-[50%] absolute object-cover rounded-lg">
                        <WebImage imgSrc={shopDetail.data.imageURL} />
            </div>
            <div className="flex flex-col md:flex-row my-5 items-center justify-end">

                <div className="text-md mx-5 text-right">
                    
                    <p className="text-md mx-5"><strong>Address:</strong> {shopDetail.data.address || "N/A"}</p>
                    <p className="text-md mx-5"><strong>Tel:</strong> {shopDetail.data.tel || "N/A"}</p>
                    <p className="text-md mx-5"><strong>Open:</strong> {shopDetail.data.opentime || "N/A"} - {shopDetail.data.closetime || "N/A"}</p>
    
                    <Link href={`/reservations?id=${params.id}&name=${shopDetail.data.name}`}>
                        <button className="mt-4 text-white shadow-md px-4 py-2 rounded-md bg-sky-600 hover:bg-indigo-600">
                            Book Reservation
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
    
}
