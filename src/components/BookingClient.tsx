"use client";
import { useSearchParams } from "next/navigation";
import DateReserve from "@/components/DateReserve";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking, fetchBookings } from "@/redux/features/reservSlice";
import TimeInput from "@/components/TimeInput";
import { ReservationItem } from "../../interfaces";

interface BookingsClientProps {
  userToken: string | undefined;
  userId: string;
}

const BookingsClient: React.FC<BookingsClientProps> = ({ userToken, userId }) => {
    const urlParams = useSearchParams();
    const sid = urlParams.get("id");
    const [time, setTime] = useState("10:00");
    const [bookingDate, setBookingDate] = useState<dayjs.Dayjs | null>(null);
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (userToken) {
            dispatch(fetchBookings({ token: userToken, filter: " " }));
        }
    }, [dispatch, userToken]);

    const makeBooking = async () => {
        if (!userToken || !bookingDate || !sid || !userId || !time) {
            showNotification("Missing booking details or user token", "error");
            return;
        }

        try {
            const item: ReservationItem = {
                id: "1111",
                user: { id: userId, name: "", email: "" },
                massageshop: {
                    _id: sid,
                    name: "",
                    address: "",
                    tel: "",
                    opentime: "",
                    closetime: "",
                },
                reservDate: dayjs(bookingDate).format("YYYY-MM-DD") + "T" + time + ":00.000Z",
                _id: ""
            };

            await dispatch(addBooking({ item, token: userToken })).unwrap();
            showNotification("Successfully made reservation", "success");

            setTime("00:00");
        } catch (error) {
            console.error("Booking error:", error);
            showNotification("Failed to make a reservation", "error");
        }
    };

    const showNotification = (message: string, type: "success" | "error") => {
        setNotification({ message, type });

        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    return (
        <main className="w-full flex flex-col items-center justify-center bg-gray-50 py-10 space-y-6 rounded-lg">
            <div className="text-3xl font-bold text-gray-800">Shop Reservation</div>

            <div className="w-full max-w-md space-y-4 bg-black shadow-lg rounded-lg p-6">
                <div className="text-lg text-left text-white">Time Slot</div>
                <div className="bg-gray-100 rounded-lg p-4 ">
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)} 
                        className="px-2 py-1 border rounded w-full"
                    />
                </div>

                <div className="text-lg text-left text-white">Booking Date</div>
                <div className="bg-black text-white rounded-lg p-4">
                    <DateReserve onDateChange={setBookingDate} />
                </div>

                <button
                    name="Book Venue"
                    className="w-full py-3 rounded-md bg-sky-600 text-white font-semibold shadow-md hover:bg-sky-700 transition-colors"
                    onClick={makeBooking}
                >
                    Book Venue
                </button>
            </div>

            {notification && (
                <div
                    className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md shadow-xl opacity-90 transition-opacity duration-500 ${
                        notification.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                    }`}
                >
                    {notification.message}
                </div>
            )}
        </main>
    );
};

export default BookingsClient;
