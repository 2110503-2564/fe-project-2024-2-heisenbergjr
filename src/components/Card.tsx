import InteractiveCard from "./InteractiveCard";
import WebImage from "./WebImage";
import { Button } from "@mui/material";

export default function Card({ 
    shopId,
    shopName: shopName, 
    imgSrc, 
    onCompare, 
    onDelete,
    role,
    address, 
    tel, 
    opentime, 
    closetime, 
}: { 
    shopId: string;
    shopName: string; 
    imgSrc: string;
    address: string;
    tel: string;
    opentime: string;
    closetime: string;
    onCompare?: Function; 
    onDelete?: () => void; 
    role: string | undefined;
}) {
    return (
        <InteractiveCard contentName={shopName}>
            <div className="w-full h-[50%] relative object-cover rounded-lg ">
                <WebImage imgSrc={imgSrc} />
            </div>

            <div className="p-4 text-left text-black">
                <h3 className="text-2xl font-bold text-center">{shopName}</h3>
                {
                    role === "admin" && (
                        <p className="text-gray-700 text-md mt-1"><strong>Shop ID:</strong> {shopId}</p>
                    )
                }
                <p className="text-gray-700 text-md mt-1"><strong>Address:</strong> {address}</p>
                <p className="text-gray-700 text-md"><strong>Tel:</strong> {tel}</p>
                <p className="text-gray-700 text-md"><strong>Open:</strong> {opentime} - {closetime}</p>
            </div>

            {role === "admin" && onDelete && (
                <Button 
                    variant="contained" 
                    color="error" 
                    onClick={(e) => {
                        onDelete();
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                    className="mt-auto"
                >
                    Delete
                </Button>
            )}
        </InteractiveCard>
    );
}
