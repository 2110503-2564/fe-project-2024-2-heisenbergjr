"use client";
import { useEffect, useState } from "react";
import { fetchBookings, removeBooking } from "@/redux/features/reservSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import getUserProfile from "@/libs/getUserProfile";
import { getSession } from "next-auth/react";
import { ReservationItem } from "../../interfaces";

export default function BookingList() {
    const dispatch = useDispatch<AppDispatch>();
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
    const [userToken, setUserToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const session = await getSession();
            if (session?.user?.token) {
                setUserToken(session.user.token); // Store only the token
                dispatch(fetchBookings(session.user.token));  // Fetch bookings using token
            }
        };

        fetchUserData();
    }, [dispatch]); // Don't depend on userToken; let it fetch once

    const handleDelete = (id: string) => {
        if (userToken) {
            dispatch(removeBooking({ id, token: userToken })); // Pass correct arguments
        } else {
            console.error("No user token found. Cannot delete booking.");
        }
    };

    return (
        <>
            {bookItems.length > 0 ? (
                bookItems.map((bookingItem: ReservationItem) => (
                    <div
                        className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 text-black"
                        key={bookingItem.id} // Use id as key
                    >
                        <div className="text-xl">{bookingItem.user}</div>
                        <div className="text-xl">{bookingItem.massageshop}</div>
                        <div className="text-xl">{bookingItem.reservDate}</div>
                        <button
                            name="Book Venue"
                            className="text-white shadow-white shadow-md px-3 py-2 block rounded-md bg-sky-600 hover:bg-indigo-600"
                            onClick={() => handleDelete(bookingItem.id)}
                        >
                            Delete Booking
                        </button>
                    </div>
                ))
            ) : (
                <div className="text-center text-lg text-gray-500">No Shop Booking</div>
            )}
        </>
    );
}
