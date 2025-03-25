"use client";
import { useSearchParams } from "next/navigation";
import DateReserve from "@/components/DateReserve";
import { MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ReservationItem } from "../../../interfaces";
import { addBooking, fetchBookings } from "@/redux/features/reservSlice";
import TimeInput from "@/components/TimeInput";
import getMassageShops from "@/libs/getMassageShops";
import getUserProfile from "@/libs/getUserProfile";
import { getSession } from "next-auth/react";

export default function Bookings() {
    const urlParams = useSearchParams();
    const vid = urlParams.get("id");

    const dispatch = useDispatch<AppDispatch>();
    const [userToken, setUserToken] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
    const [shop, setShop] = useState<string>("");
    const [shops, setShops] = useState<any[]>([]);
    const [id,setId] = useState<string>("");
    // Fetch user token and bookings
    useEffect(() => {
        const fetchUserData = async () => {
            const session = await getSession();
            if (session?.user?.token) {
                setUserToken(session.user.token);
                dispatch(fetchBookings(session.user.token)); // Pass token only
            }
        };
        fetchUserData();
    }, [dispatch]); // Fetch only once when the component mounts

    // Fetch available shops from the backend
    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await getMassageShops();
                setShops(response.data);
            } catch (error) {
                console.error("Error fetching shops:", error);
            }
        };
        fetchShops();
    }, []);

    // Function to make a booking
    const makeBooking = () => {
        if (userToken && name && bookingDate && shop&& id) {
            const item: ReservationItem = {
                id: id,
                nameLastname: name,
                shop: shop,
                bookDate: dayjs(bookingDate).format("YYYY/MM/DD"),
            };
            dispatch(addBooking({ item, token: userToken }));
        } else {
            console.error("Missing booking details or user token");
        }
    };

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">Shop Reservation</div>
            <div className="w-fit space-y-2 px-5">
                <div className="text-md text-left text-white-600">Enter Your Name:</div>
                <TextField
                    sx={{ input: { color: "white" }, label: { color: "white" }, "& .MuiInput-underline:before": { borderBottomColor: "cyan" } }}
                    name="Name-Lastname"
                    label="Name-Lastname"
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="text-md text-left text-white-600">Enter Your Selected Shop:</div>
                <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-5 py-5 flex flex-row justify-center">
                    <Select
                        id="venue"
                        sx={{ border: { color: "black" }, minWidth: 200 }}
                        value={shop} // Store only the shop ID in the state
                        onChange={(e) => {
                            const selectedShop = shops.find(shop => shop.id === e.target.value);
                            if (selectedShop) {
                                setShop(shop);
                                setId(selectedShop); 
                            }
                        }}
                    >
                        {shops.map((item) => (
                            <MenuItem key={item.id} value={item.name}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="text-md text-left text-white-600">Time Slot</div>
                <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-5 py-5 flex flex-row justify-center">
                    <TimeInput />
                </div>
                <div className="text-md text-left text-white-600">Booking Date</div>
                <DateReserve onDateChange={(value) => setBookingDate(value)} />
            </div>

            <button
                name="Book Venue"
                className="text-white shadow-white shadow-md px-3 py-2 block rounded-md bg-sky-600 hover:bg-indigo-600"
                onClick={makeBooking}
            >
                Book Venue
            </button>
        </main>
    );
}
