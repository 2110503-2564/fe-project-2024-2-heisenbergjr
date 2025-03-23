'use client'
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem, Menu } from "@mui/material"
import { Dayjs } from "dayjs";

interface DateReserveProps {
    onDateChange: (value: Dayjs | null) => void; // Ensure it allows null
}

export default function DateReserve({ onDateChange }: DateReserveProps) {

    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);

    return (
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2
        w-fit px-10 py-5 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white"
                value={reserveDate}
                onChange={(value) => {
                    setReserveDate(value);
                    onDateChange(value) 
                  }}></DatePicker>
            </LocalizationProvider>
        </div>
    );
}