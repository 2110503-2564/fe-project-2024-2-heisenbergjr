"use client";
import { useEffect, useState } from "react";
import { fetchBookings, removeBooking } from "@/redux/features/bookSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import getUserProfile from "@/libs/getUserProfile";
import { getSession } from "next-auth/react";
import { BookingItem } from "../../interfaces";

export default function BookingList() {
    const dispatch = useDispatch<AppDispatch>();
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
    const [userToken, setUserToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const session = await getSession();  
            if (session?.user?.token) {
                const userProfile = await getUserProfile(session.user.token);
                setUserToken(userProfile);
                dispatch(fetchBookings(userProfile));  
            }
        };

        fetchUserData();
    }, [dispatch]);

    return (
        <>
            {bookItems.length > 0 ? (
                bookItems.map((bookingItem: BookingItem) => (
                    <div
                        className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 text-black"
                        key={`${bookingItem.nameLastname}-${bookingItem.tel}-${bookingItem.bookDate}`}
                    >
                        <div className="text-xl">{bookingItem.nameLastname}</div>
                        <div className="text-xl">{bookingItem.tel}</div>
                        <div className="text-xl">{bookingItem.venue}</div>
                        <div className="text-xl">{bookingItem.bookDate}</div>
                        <button
                            name="Book Venue"
                            className="text-white shadow-white shadow-md px-3 py-2 block rounded-md bg-sky-600 hover:bg-indigo-600"
                            onClick={() => dispatch(removeBooking(bookingItem))}
                        >
                            Delete Booking
                        </button>
                    </div>
                ))
            ) : (
                <div className="text-center text-lg text-gray-500">No Venue Booking</div>
            )}
        </>
    );
}
