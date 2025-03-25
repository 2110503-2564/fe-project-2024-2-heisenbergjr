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
import { getSession } from "next-auth/react";

export default function Bookings() {
    const urlParams = useSearchParams();
    const sid = urlParams.get("id");
    const [time, setTime] = useState("10:00");

    const dispatch = useDispatch<AppDispatch>();
    const [userToken, setUserToken] = useState<string | null>(null);
    const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
    const [shop, setShop] = useState<string>("");
    const [uid,setUid] = useState<string>("");
    // Fetch user token and bookings
    useEffect(() => {
        const fetchUserData = async () => {
            const session = await getSession();
            if (session?.user?.token) {
                setUserToken(session.user.token);
                setUid(session.user._id);
                dispatch(fetchBookings(session.user.token));
            }
        };
        fetchUserData();
    }, [dispatch]); 

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await getMassageShops();
                setShop(response.data);
            } catch (error) {
                console.error("Error fetching shops:", error);
            }
        };
        fetchShops();
    }, []);

    const makeBooking = () => {
        if (userToken && bookingDate && sid && uid && time) {
            const item: ReservationItem = {
                id: "1111",
                user: uid,
                massageshop: sid,
                reservDate: dayjs(bookingDate).format("YYYY/MM/DD") + " " + time,
            };
            dispatch(addBooking({ item, token: userToken }));
        } else {
            console.log(uid)
            console.error("Missing booking details or user token");
        }
    };

    const handleTimeChange = (newTime: string) => {
        setTime(newTime); // Update state when time changes
      };

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">Shop Reservation</div>
            <div className="w-fit space-y-2 px-5">

                <div className="text-md text-left text-white-600">Time Slot</div>
                <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-5 py-5 flex flex-row justify-center">
                    <TimeInput value={time} onChange={handleTimeChange} />
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