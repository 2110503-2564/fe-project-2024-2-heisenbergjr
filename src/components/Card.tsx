import InteractiveCard from "./InteractiveCard";
import WebImage from "./WebImage";
import { Button } from "@mui/material";

export default function Card({ 
    shopName: venueName, 
    imgSrc, 
    onCompare, 
    onDelete 
}: { 
    shopName: string; 
    imgSrc: string;
    onCompare?: Function; 
    onDelete?: () => void; 
}) {
    return (
        <InteractiveCard contentName={venueName}>
            <div className="w-full h-[50%] relative object-cover rounded-lg">
                <WebImage imgSrc={imgSrc} />
            </div>

            <div className="font-serif text-black p-[10px] font-bold text-lg">
                <p>{venueName}</p>
            </div>

            {onDelete && (
                <Button 
                    variant="contained" 
                    color="error" 
                    onClick={(e) => {
                        onDelete && onDelete()
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
