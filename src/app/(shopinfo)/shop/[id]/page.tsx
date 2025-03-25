import getShop from "@/libs/getMassageShop";
import Link from "next/link";
import WebImage from "@/components/WebImage";

export default async function ShopDetailPage({ params }: { params: { id: string } }) {
    console.log(params.id);
    const shopDetail = await getShop(params.id);

    if (!shopDetail) {
        return <p className="text-center text-lg text-gray-600 mt-10">Shop not found.</p>;
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-black p-6">
            <h1 className="text-3xl font-bold text-white">{shopDetail.data.name || "No Name"}</h1>

            <div className="w-full max-w-3xl mt-6 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative w-full h-64 md:h-80">
                    <WebImage imgSrc={shopDetail.data.imageURL} />
                </div>

                <div className="p-6 text-center">
                    <p className="text-lg text-gray-700">
                        <strong>Address:</strong> {shopDetail.data.address || "N/A"}
                    </p>
                    <p className="text-lg text-gray-700">
                        <strong>Tel:</strong> {shopDetail.data.tel || "N/A"}
                    </p>
                    <p className="text-lg text-gray-700">
                        <strong>Open:</strong> {shopDetail.data.opentime || "N/A"} - {shopDetail.data.closetime || "N/A"}
                    </p>

                    <Link href={`/reservations?id=${params.id}&name=${shopDetail.data.name}`}>
                        <button className="mt-6 px-6 py-3 w-full md:w-auto rounded-lg text-white font-semibold bg-sky-600 hover:bg-sky-700 transition duration-300 shadow-md">
                            Book Reservation
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
