"use client";
import { useEffect, useState } from "react";
import addShop from "@/libs/createMassageShop";
import ShopCatalog from "@/components/ShopCatalog";
import { TextField, Button } from "@mui/material";
import getUserProfile from "@/libs/getUserProfile";
import getMassageShops from "@/libs/getMassageShops"; 
import { fetchBookings } from "@/redux/features/reservSlice";
import { getSession } from "next-auth/react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import deleteMassageShop from "@/libs/deleteMassageShop";
import updateShop from "@/libs/updateMassageShop";

interface Profile {
    data?: { role?: string };
}

interface Shop {
    id: string;
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
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm,setShowUpdateForm] = useState(false);
    const [shopList, setShopList] = useState<Shop[]>([]);
    const [shopData, setShopData] = useState({
        id:"",
        name: "" ,
        address: "" ,
        tel: "" ,
        image: null as File | null, 
        opentime: "" ,
        closetime: "" ,
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

        const fetchData = async () => {
            try {
                const fetchedShops = await getMassageShops();
                console.log("Fetched Shops:", fetchedShops); 
                
                if (fetchedShops?.data) {
                    setShopList(fetchedShops.data);
                }
            } catch (error) {
                console.error("Error fetching shops:", error);
            }
        };
    
        fetchData();
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
                    console.log("Previous Shops:", prevShops); 
                    return [...prevShops, data.data];
                });

                setShopData({
                    id:"",
                    name: "",
                    address: "",
                    tel: "",
                    image: null,
                    opentime: "",
                    closetime: "",
                });
                setShowAddForm(false);
            } else {
                console.error("Failed to add shop:", data.message);
            }
        } catch (error) {
            console.error("Error adding shop:", error);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedFields: Partial<Shop> = {};

        if (shopData.name) updatedFields.name = shopData.name;
        if (shopData.address) updatedFields.address = shopData.address;
        if (shopData.tel) updatedFields.tel = shopData.tel;
        if (shopData.opentime) updatedFields.opentime = shopData.opentime;
        if (shopData.closetime) updatedFields.closetime = shopData.closetime;

        if (shopData.image) {
            const imageURL = await handleImageUpload(shopData.image);
            if (!imageURL) {
                console.error("Failed to upload image.");
                return;
            }
            updatedFields.image = imageURL;
        }
        try {
            const data = await updateShop(shopData.id, userToken,shopData);

            if (data.success) {
                setShopList((prevShops) =>
                    prevShops.map((shop) =>
                        shop.id === shopData.id ? data.data : shop
                    )
                );
                setShopData({
                    id:"",
                    name: "",
                    address: "",
                    tel: "",
                    image: null,
                    opentime: "",
                    closetime: "",
                });
                setShowUpdateForm(false);
            } else {
                console.error("Failed to update shop:", data.message);
            }
        } catch (error) {
            console.error("Error updating shop:", error);
        }
    };
    const handleDelete = async (shopId: string) => {
        try {
            await deleteMassageShop(shopId, userToken);
            setShopList(prevShops => prevShops.filter(shop => shop.id !== shopId));
        } catch (error) {
            console.error("Error deleting shop:", error);
        }
    };

    return (
        <main className="text-center p-5">
            <ShopCatalog shopsJSON={{ data: shopList, count: shopList.length}}  onDelete={handleDelete} role={profile?.data?.role} />

            {profile?.data?.role === "admin" && (
                <div className="mt-5 mx-auto space-x-10">
                    <Button variant="contained" color="primary" onClick={() =>{setShowAddForm(!showAddForm);setShowUpdateForm(false);}}>
                        {showAddForm ? "Cancel" : "Add Shop"}
                    </Button>
                    <Button variant="contained" color="primary" onClick={() =>{setShowUpdateForm(!showUpdateForm);setShowAddForm(false);} }>
                        {showUpdateForm ? "Cancel" : "Update Shop"}
                    </Button>
                    {showAddForm && (
                        <form onSubmit={handleSubmit} className="mt-4 space-y-2 px-20">
                            <TextField label="Name" name="name" fullWidth required onChange={handleChange} sx={{ backgroundColor: "black", border: "1px solid #87CEEB", "& .MuiInputBase-input": { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }} />

                            <TextField label="Address" name="address" fullWidth required onChange={handleChange} sx={{ backgroundColor: "black", border: "1px solid #87CEEB", "& .MuiInputBase-input": { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }} />

                            <TextField label="Telephone" name="tel" fullWidth required onChange={handleChange} sx={{ backgroundColor: "black", border: "1px solid #87CEEB", "& .MuiInputBase-input": { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }} />

                            <TextField label="Open Time" name="opentime" type="time" fullWidth required onChange={handleChange} sx={{ backgroundColor: "black", border: "1px solid #87CEEB", "& .MuiInputBase-input": { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }} />

                            <TextField label="Close Time" name="closetime" type="time" fullWidth required onChange={handleChange} sx={{ backgroundColor: "black", border: "1px solid #87CEEB", "& .MuiInputBase-input": { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }} />
                            <div className="relative">
                                <input 
                                    id="imageInput" 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                    className="hidden" 
                                />
                                <label 
                                    htmlFor="imageInput" 
                                    className="bg-black text-white border border-gray-300 p-2 rounded-md cursor-pointer hover:bg-gray-800"
                                >
                                    Choose File
                                </label>
                            </div>
                            <br></br>
                            <Button type="submit" variant="contained" color="success">Add</Button>
                        </form>
                    )}
                    
                    {showUpdateForm && (
                        <form onSubmit={handleUpdate} className="mt-4 space-y-2">
                            <TextField label="Shop ID" name="id" fullWidth required onChange={handleChange} sx={{ backgroundColor: "black", border: "1px solid #87CEEB", "& .MuiInputBase-input": { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }} />
                            <TextField label="Name" name="name" fullWidth required onChange={handleChange} sx={{ backgroundColor: "black", border: "1px solid #87CEEB", "& .MuiInputBase-input": { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }} />

                            <TextField label="Address" name="address" fullWidth required onChange={handleChange} sx={{ backgroundColor: "black", border: "1px solid #87CEEB", "& .MuiInputBase-input": { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }} />

                            <TextField label="Telephone" name="tel" fullWidth required onChange={handleChange} sx={{ backgroundColor: "black", border: "1px solid #87CEEB", "& .MuiInputBase-input": { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }} />

                            <TextField label="Open Time" name="opentime" type="time" fullWidth required onChange={handleChange} sx={{ backgroundColor: "black", border: "1px solid #87CEEB", "& .MuiInputBase-input": { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }} />

                            <TextField label="Close Time" name="closetime" type="time" fullWidth required onChange={handleChange} sx={{ backgroundColor: "black", border: "1px solid #87CEEB", "& .MuiInputBase-input": { color: "white" }, "& .MuiInputLabel-root": { color: "white" } }} />
                            <div className="relative">
                                <input 
                                    id="imageInput" 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                    className="hidden" 
                                />
                                <label 
                                    htmlFor="imageInput" 
                                    className="bg-black text-white border border-gray-300 p-2 rounded-md cursor-pointer hover:bg-gray-800"
                                >
                                    Choose File
                                </label>
                            </div>
                            <br></br>
                            <Button type="submit" variant="contained" color="success">Update</Button>
                        </form>
                    )}
                </div>
            )}
        </main>
    );
}
