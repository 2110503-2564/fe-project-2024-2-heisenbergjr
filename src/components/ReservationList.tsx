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
    const { bookItems, status, error } = useAppSelector((state) => state.bookSlice);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>(""); // Store selected filter
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
        if (!userToken) {
            console.error("No user token found. Cannot delete booking.");
            return;
        }

        try {
            await dispatch(removeBooking({ id, token: userToken })).unwrap();
            console.log("Booking deleted successfully.");

            // Refetch the bookings after successful deletion
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
                user: { id: uid, name: "", email: "" },
                massageshop: {
                    _id: msgId,
                    name: "",
                    address: "",
                    tel: "",
                    opentime: "",
                    closetime: "",
                },
                reservDate: dayjs(updatedData.reservDate).format("YYYY-MM-DD") + "T" + updatedData.reservTime + ":00.000Z",
                _id: ""
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

            <div className="flex justify-center gap-4 mb-5 text-black">
                <button 
                    className={`px-4 py-2 rounded-md ${filter === "" ? "bg-blue-600" : "bg-gray-200"}`} 
                    onClick={() => setFilter("")}
                >
                    All
                </button>
                <button 
                    className={`px-4 py-2 rounded-md ${filter === "today" ? "bg-blue-600" : "bg-gray-200"}`} 
                    onClick={() => setFilter("today")}
                >
                    Today
                </button>
                <button 
                    className={`px-4 py-2 rounded-md ${filter === "upcoming" ? "bg-blue-600" : "bg-gray-200"}`} 
                    onClick={() => setFilter("upcoming")}
                >
                    Upcoming
                </button>
            </div>

            {status === "loading" && <p className="text-center text-gray-500">Loading reservations...</p>}

            {bookItems.length > 0 ? (
                bookItems.map((bookingItem: ReservationItem) => (
                    <div
                        className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 text-black shadow-md"
                        key={bookingItem.id}
                    >
                        {bookingItem.user?.name ? (
                            <div className="text-lg font-semibold">
                                <strong>Customer:</strong> {bookingItem.user.name} ({bookingItem.user.email})
                            </div>
                        ) : (
                            <div className="text-lg font-semibold text-black-500">
                                <strong>Customer:</strong> Unknown User
                            </div>
                        )}

                        {bookingItem.massageshop?.name ? (
                            <div className="text-lg font-semibold">
                                <strong>Massage Shop:</strong> {bookingItem.massageshop.name}
                            </div>
                        ) : (
                            <div className="text-lg font-semibold text-red-500">
                                <strong>Massage Shop:</strong> Unknown Shop
                            </div>
                        )}

                        {bookingItem.massageshop?.address && (
                            <div className="text-lg font-semibold">
                                <strong>Address:</strong> {bookingItem.massageshop.address}
                            </div>
                        )}

                        {bookingItem.massageshop?.tel && (
                            <div className="text-lg font-semibold">
                                <strong>Phone:</strong> {bookingItem.massageshop.tel}
                            </div>
                        )}

                        {bookingItem.massageshop?.opentime && bookingItem.massageshop?.closetime && (
                            <div className="text-lg font-semibold">
                                <strong>Opening Hours:</strong> {bookingItem.massageshop.opentime} - {bookingItem.massageshop.closetime}
                            </div>
                        )}

                        <div className="text-lg">
                            <strong>Reservation Date:</strong> {bookingItem.reservDate ? bookingItem.reservDate.split("T")[0] : ""}
                        </div>
                        <div className="text-lg">
                            <strong>Reservation Time:</strong> {bookingItem.reservDate ? bookingItem.reservDate.split("T")[1].split(".")[0]: ""}
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
                                    onClick={() => {
                                        handleUpdate(bookingItem._id);
                                    }}
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
                                    setMsgId(bookingItem.massageshop?._id);
                                    setUid(bookingItem.user?.id);
                                    setUpdatedData({ reservDate: "", reservTime:"" });
                                }}
                            >
                                Update Booking
                            </button>
                        )}


                        <button
                            className="text-white shadow-md px-3 py-2 block rounded-md bg-red-600 hover:bg-red-700 mt-2"
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