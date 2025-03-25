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

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (userToken) {
            dispatch(fetchBookings(userToken)); // Fetch bookings with the user token
        }
    }, [dispatch, userToken]);

    const makeBooking = () => {
        if (userToken && bookingDate && sid && userId && time) {
            
            console.log(userToken)
            const item: ReservationItem = {
                id: "1111",  // Let MongoDB handle auto-increment ID
                user: userId,
                massageshop: sid,
                reservDate: dayjs(bookingDate).format("YYYY/MM/DD") + " " + time,
            };
            dispatch(addBooking({ item, token: userToken }));
        } else {
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
};

export default BookingsClient;
