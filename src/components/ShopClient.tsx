"use client";
import { useEffect, useState } from "react";
import addShop from "@/libs/createMassageShop";
import ShopCatalog from "@/components/ShopCatalog";
import { TextField, Button } from "@mui/material";
import getUserProfile from "@/libs/getUserProfile";
import { fetchBookings } from "@/redux/features/reservSlice";
import { getSession } from "next-auth/react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

interface Profile {
    data?: { role?: string };
}

interface Shop {
    name: string;
    address: string;
    tel: string;
    image: string;
    opentime: string;
    closetime: string;
}

interface ShopClientProps {
    profile: Profile | null;
    shops: Shop[];
}

export default function ShopClient({ profile, shops }: ShopClientProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [showForm, setShowForm] = useState(false);
    const [shopList, setShopList] = useState<Shop[]>([]);
    const [shopData, setShopData] = useState({
        name: "",
        address: "",
        tel: "",
        image: null as File | null, 
        opentime: "",
        closetime: "",
    });

    const [userToken, setUserToken] = useState<string>("");

    useEffect(() => {
        const fetchUserData = async () => {
            const session = await getSession();
            if (session?.user?.token) {
                const userProfile = await getUserProfile(session.user.token);
                setUserToken(session.user.token);
                dispatch(fetchBookings(userProfile));
            }
        };
        fetchUserData();
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShopData({ ...shopData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setShopData({ ...shopData, image: file });
        }
    };

    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch("http://localhost:5000/api/v1/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Image upload failed");

            const data = await response.json();
            return data.imageURL;
        } catch (error) {
            console.error("Error uploading image:", error);
            return "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!shopData.image) {
            console.error("No image selected.");
            return;
        }

        const imageURL = await handleImageUpload(shopData.image);

        if (!imageURL) {
            console.error("Failed to upload image.");
            return;
        }

        const newShop = {
            ...shopData,
            image: imageURL,
        };

        try {
            const data = await addShop(newShop, userToken);

            if (data.success) {
                setShopList((prevShops) => {
                    console.log("Previous Shops:", prevShops); // Debugging
                    return [...prevShops, data.data]; // Ensure data is correct
                });

                setShopData({
                    name: "",
                    address: "",
                    tel: "",
                    image: null,
                    opentime: "",
                    closetime: "",
                });
                setShowForm(false);
            } else {
                console.error("Failed to add shop:", data.message);
            }
        } catch (error) {
            console.error("Error adding shop:", error);
        }
    };

    return (
        <main className="text-center p-5">
            <ShopCatalog shopsJSON={{ data: shopList, count: shopList.length }} />

            {profile?.data?.role === "admin" && (
                <div className="mt-5">
                    <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? "Cancel" : "Add Shop"}
                    </Button>

                    {showForm && (
                        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
                            <TextField label="Name" name="name" fullWidth required onChange={handleChange} sx={{ backgroundColor: "white" }} />
                            <TextField label="Address" name="address" fullWidth required onChange={handleChange} sx={{ backgroundColor: "white" }} />
                            <TextField label="Telephone" name="tel" fullWidth required onChange={handleChange} sx={{ backgroundColor: "white" }} />
                            
                            <input id="imageInput" type="file" accept="image/*" required onChange={handleFileChange} className="bg-white p-2 rounded-md border border-gray-300" />
                            
                            <TextField label="Open Time" name="opentime" type="time" fullWidth required onChange={handleChange} sx={{ backgroundColor: "white" }} />
                            <TextField label="Close Time" name="closetime" type="time" fullWidth required onChange={handleChange} sx={{ backgroundColor: "white" }} />
                            
                            <Button type="submit" variant="contained" color="success">Add</Button>
                        </form>
                    )}
                </div>
            )}
        </main>
    );
}
