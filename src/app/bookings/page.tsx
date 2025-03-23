"use client"
import { useSearchParams } from "next/navigation";
import DateReserve from "@/components/DateReserve";
import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "../../../interfaces";
import { addBooking } from "@/redux/features/bookSlice";
import React from "react";
import TimeInput from "@/components/TimeInput";

export default function Bookings() {

    const urlParams = useSearchParams()
    const vid = urlParams.get('id')

    const dispatch = useDispatch<AppDispatch>()

    const makeBooking = () => {
        if(name && bookingDate && tel && venue) {
            const item:BookingItem = {
                nameLastname: name,
                tel: tel,
                venue: venue,
                bookDate: dayjs(bookingDate).format("YYYY/MM/DD"),
            }
            dispatch(addBooking(item))
        }
    }

    const [name, setName] = useState<string>("");
    const [bookingDate, setBookingDate] = useState<Dayjs | null>(null)
    const [tel, setTel] = useState<string>("");
    const [venue, setVenue] = useState<string>("");
    const [time,setTime] = useState<string>("");

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">

            <div className="text-xl font-medium">
                Venue Booking
            </div>
            <div className="w-fit space-y-2 px-5">

                <div className="text-md text-left text-white-600">Enter Your Name:</div>
                <TextField sx={{ input: { color: 'white' }, label:{color:'white'}, "& .MuiInput-underline:before": {borderBottomColor: "cyan"}}} name="Name-Lastname" label="Name-Lastname" variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)} />
            
                <div className="text-md text-left text-white-600">Enter Your Contact Number:</div>
                <TextField sx={{ input: { color: 'white' }, label:{color:'white'}, "& .MuiInput-underline:before": {borderBottomColor: "cyan"}}} name="Contact-Number" label="Contact-Number" variant="standard" 
                value={tel}
                onChange={(e) => setTel(e.target.value)}/>
                
                <div className="text-md text-left text-white-600">Enter Your Selected Venue:</div>
                <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-5 py-5 flex flex-row justify-center">
                    <Select id="venue" sx={{border:{color:'black'}, minWidth:200}}
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}>
                        <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                        <MenuItem value="Spark">Spark Space</MenuItem>
                        <MenuItem value="GrandTable">The Grand Table</MenuItem>
                    </Select>
                </div>
                <div className="text-md text-left text-white-600">Time Slot</div>
                <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-5 py-5 flex flex-row justify-center"><TimeInput/></div>
                
                <div className="text-md text-left text-white-600">Venue Date</div>
                <DateReserve onDateChange={(value) => setBookingDate(value)} />
                
            </div>

            <button name="Book Venue" className="text-white shadow-white shadow-md px-3 py-2 block rounded-md bg-sky-600 hover:bg-indigo-600" onClick={makeBooking}>Book Venue</button>
            
        </main>
    );
}