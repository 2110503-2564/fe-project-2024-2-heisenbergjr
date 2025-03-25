"use client";
import { useEffect, useState } from "react";
import { fetchBookings, removeBooking, updateBooking } from "@/redux/features/reservSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getSession } from "next-auth/react";
import { ReservationItem } from "../../interfaces";
import dayjs from "dayjs";

export default function BookingList() {
    const dispatch = useDispatch<AppDispatch>();
    const { bookItems, status } = useAppSelector((state) => state.bookSlice);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [updatedData, setUpdatedData] = useState<{ reservDate: string; reservTime: string }>({ reservDate: "", reservTime: "" });
    const [msgId,setMsgId] = useState<string>("");
    const [uid,setUid] = useState<string>("");
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
            dispatch(fetchBookings({ token: userToken, filter }));
        }
    }, [userToken, filter, dispatch]);

    const handleDelete = async (id: string) => {
        if (!userToken) return;
        try {
            await dispatch(removeBooking({ id, token: userToken })).unwrap();
            dispatch(fetchBookings({ token: userToken, filter }));
        } catch (err) {
            console.error("Error deleting booking:", err);
        }
    };

    const handleUpdate = async (id: string) => {
        console.log(id)
        if (!userToken || !updatedData.reservDate || !updatedData.reservTime) return;
        try { 
            console.log(id)
            const item: ReservationItem = {
                            id: id, 
                            user: uid,
                            massageshop: msgId,
                            reservDate: dayjs(updatedData.reservDate).format("YYYY-MM-DD") + "T" + updatedData.reservTime+":00.000Z",
                        };
            await dispatch(updateBooking({ id, item, token: userToken }));
            setEditingId(null);
            dispatch(fetchBookings({ token: userToken, filter }));
        } catch (err) {
            console.error("Error updating booking:", err);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-3xl font-bold text-center mb-5">Your Reservations</h2>

            {bookItems.length > 0 ? (
                bookItems.map((bookingItem: ReservationItem) => (
                    <div key={bookingItem.id} className="bg-slate-200 rounded px-5 py-2 my-2 text-black shadow-md">
                        <div className="text-lg font-semibold">
                            <strong>Customer:</strong> {bookingItem.user?.name || "Unknown User"}
                        </div>
                        <div className="text-lg">
                            <strong>Reservation Date:</strong> {updatedData.reservDate}
                        </div>
                        <div className="text-lg">
                            <strong>Reservation Time:</strong> {updatedData.reservTime}
                        </div>

                        {editingId === bookingItem._id ? (
                            <div className="mt-2">
                                <input
                                    type="date"
                                    value={updatedData.reservDate}
                                    onChange={(e) => setUpdatedData({ ...updatedData, reservDate: e.target.value })}
                                    className="px-2 py-1 border rounded"
                                />
                                <input
                                    type="time"
                                    value={updatedData.reservTime}
                                    onChange={(e) => setUpdatedData({ ...updatedData, reservTime: e.target.value })}
                                    className="px-2 py-1 border rounded ml-2"
                                />
                                <button
                                    className="ml-2 px-3 py-1 bg-green-600 text-white rounded"
                                    onClick={() => {handleUpdate(bookingItem._id); console.log(bookingItem._id)}}
                                >
                                    Save
                                </button>
                                <button
                                    className="ml-2 px-3 py-1 bg-gray-500 text-white rounded"
                                    onClick={() => setEditingId(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                className="text-white px-3 py-2 block rounded-md bg-green-600 hover:bg-green-700 mt-2"
                                onClick={() => {
                                    setEditingId(bookingItem._id);
                                    setMsgId(bookingItem.massageshop?.id);
                                    setUid(bookingItem.user?.id);
                                    setUpdatedData({ reservDate: "", reservTime:"" });
                                }}
                            >
                                Update Booking
                            </button>
                        )}

                        <button
                            className="text-white px-3 py-2 block rounded-md bg-red-600 hover:bg-red-700 mt-2"
                            onClick={() => handleDelete(bookingItem._id)}
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