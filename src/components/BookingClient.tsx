"use client";
import { useSearchParams } from "next/navigation";
import DateReserve from "@/components/DateReserve";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ReservationItem } from "../../interfaces";
import { addBooking, fetchBookings } from "@/redux/features/reservSlice";
import TimeInput from "@/components/TimeInput";

interface BookingsClientProps {
  userToken: string | undefined;
  userId: string;
}

const BookingsClient: React.FC<BookingsClientProps> = ({ userToken, userId }) => {
    const urlParams = useSearchParams();
    const sid = urlParams.get("id");
    const [time, setTime] = useState("10:00");
    const [bookingDate, setBookingDate] = useState<dayjs.Dayjs | null>(null);
    const [notification, setNotification] = useState<string | null>(null); // State for notification

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (userToken) {
            dispatch(fetchBookings({ token : userToken, filter : " "})); // Fetch bookings with the user token
        }
    }, [dispatch, userToken]);

    const makeBooking = () => {
        if (userToken && bookingDate && sid && userId && time) {
            const item: ReservationItem = {
                id: "1111",  // Let MongoDB handle auto-increment ID
                user: userId,
                massageshop: sid,
                reservDate: dayjs(bookingDate).format("YYYY-MM-DD") + "T" + time+":00.000Z",
            };
            dispatch(addBooking({ item, token: userToken }));

            // Show success notification
            setNotification("Successfully made reservation");

            // Hide notification after 3 seconds
            setTimeout(() => {
                setNotification(null);
            }, 3000); 

            // Reset fields
            setTime("00:00");
            setBookingDate(null);
        } else {
            console.error("Missing booking details or user token");
        }
    };

    const handleTimeChange = (newTime: string) => {
        setTime(newTime); 
    };

    return (
        <main className="w-full flex flex-col items-center justify-center bg-gray-50 py-10 space-y-6 rounded-lg">
            <div className="text-3xl font-bold text-gray-800">Shop Reservation</div>
            
            <div className="w-full max-w-md space-y-4 bg-black shadow-lg rounded-lg p-6">
                <div className="text-lg text-left text-white">Time Slot</div>
                <div className="bg-gray-100 rounded-lg p-4">
                    <TimeInput value={time} onChange={handleTimeChange} />
                </div>

                <div className="text-lg text-left text-white">Booking Date</div>
                <div className="bg-gray-100 rounded-lg p-4">
                    <DateReserve onDateChange={(value) => setBookingDate(value)} />
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
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-md shadow-xl opacity-90 transition-opacity duration-500">
                    {notification}
                </div>
            )}
        </main>
    );
};

export default BookingsClient;