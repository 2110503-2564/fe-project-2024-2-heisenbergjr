"use client";
import { useState } from "react";
import addShop from "@/libs/createMassageShop";
import ShopCatalog from "@/components/ShopCatalog";
import { LinearProgress, TextField, Button } from "@mui/material";

interface Profile {
    data?: {
        role?: string;
    };
}

interface Shop {
    name: string;
    address: string;
    tel: string;
    imageURL: string;
    opentime: string;
    closetime: string;
}

interface ShopClientProps {
    profile: Profile | null
    shops: Shop[];
}

export default function ShopClient({ profile , shops } : ShopClientProps) {
    const [showForm, setShowForm] = useState(false);
    const [shopData, setShopData] = useState({
        name: "",
        address: "",
        tel: "",
        imageURL: "",
        opentime: "",
        closetime: ""
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setShopData({ ...shopData, [e.target.name]: e.target.value });
    };

    const formatTime = (time: string) => {
        return `${time}:00`;
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        console.log("Submitting Shop")
        e.preventDefault();
        try {
            const formattedShopData = {
                ...shopData,
                opentime: formatTime(shopData.opentime),
                closetime: formatTime(shopData.closetime),
            };

            console.log("Sending Data:", formattedShopData); 
            const response = await addShop(formattedShopData);
            
            console.log("Response:", response);
            setShowForm(false);
        } catch (error) {
            console.error("Error adding shop:", error);
        }
    };

    return (
        <main className="text-center p-5">
            <ShopCatalog shopsJSON={shops} />

            {profile?.data?.role === "admin" && ( 
                <div className="mt-5">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "Cancel" : "Add Shop"}
                    </Button>

                    {showForm && (
                        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
                            <TextField 
                                label="Name" 
                                name="name" 
                                fullWidth 
                                required 
                                onChange={handleChange} 
                                sx={{ backgroundColor: "white" }} 
                            />
                            <TextField 
                                label="Address" 
                                name="address" 
                                fullWidth 
                                required 
                                onChange={handleChange} 
                                sx={{ backgroundColor: "white" }} 
                            />
                            <TextField 
                                label="Telephone" 
                                name="tel" 
                                fullWidth 
                                required 
                                onChange={handleChange} 
                                sx={{ backgroundColor: "white" }} 
                            />
                            <TextField 
                                label="Image URL" 
                                name="imageURL" 
                                fullWidth 
                                required 
                                onChange={handleChange} 
                                sx={{ backgroundColor: "white" }} 
                            />
                            <TextField 
                                label="Open Time" 
                                name="opentime" 
                                type="time" 
                                fullWidth 
                                required 
                                onChange={handleChange} 
                                sx={{ backgroundColor: "white" }} 
                            />
                            <TextField 
                                label="Close Time" 
                                name="closetime" 
                                type="time" 
                                fullWidth 
                                required 
                                onChange={handleChange} 
                                sx={{ backgroundColor: "white" }} 
                            />
                            <Button type="submit" variant="contained" color="success">
                                Add
                            </Button>
                        </form>
                    )}
                </div>
            )}
        </main>
    );
}
