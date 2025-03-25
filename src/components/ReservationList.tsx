"use client";
import { useEffect, useState } from "react";
import { fetchBookings, removeBooking } from "@/redux/features/reservSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getSession } from "next-auth/react";
import { ReservationItem } from "../../interfaces";

export default function BookingList() {
    const dispatch = useDispatch<AppDispatch>();
    const { bookItems, status, error } = useAppSelector((state) => state.book); // Corrected Redux state selector
    const [userToken, setUserToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const session = await getSession();
            if (session?.user?.token) {
                setUserToken(session.user.token);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (userToken) {
            dispatch(fetchBookings(userToken));
        }
    }, [userToken, dispatch]);

    const handleDelete = async (id: string) => {
        if (!userToken) {
            console.error("No user token found. Cannot delete booking.");
            return;
        }

        try {
            await dispatch(removeBooking({ id, token: userToken })).unwrap();
            console.log("Booking deleted successfully.");
        } catch (err) {
            console.error("Error deleting booking:", err);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-3xl font-bold text-center mb-5">Your Bookings</h2>

            {status === "loading" && <p className="text-center text-gray-500">Loading bookings...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {bookItems.length > 0 ? (
                bookItems.map((bookingItem: ReservationItem) => (
                    <div
                        className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 text-black shadow-md"
                        key={bookingItem.id}
                    >
                        <div className="text-lg font-semibold">{bookingItem.user}</div>
                        <div className="text-lg">{bookingItem.massageshop}</div>
                        <div className="text-lg">{bookingItem.reservDate}</div>
                        <button
                            className="text-white shadow-md px-3 py-2 block rounded-md bg-red-600 hover:bg-red-700 mt-2"
                            onClick={() => handleDelete(bookingItem.id)}
                        >
                            Delete Booking
                        </button>
                    </div>
                ))
            ) : (
                <div className="text-center text-2xl text-gray-500 mt-10 font-bold">
                    No Shop Reservations
                </div>
            )}
        </div>
    );
}
