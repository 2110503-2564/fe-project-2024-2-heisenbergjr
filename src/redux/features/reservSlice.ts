import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem } from "../../../interfaces";

// Define state type
type BookState = {
    bookItems: ReservationItem[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};

// Initial state
const initialState: BookState = { 
    bookItems: [], 
    status: "idle", 
    error: null 
};

// Async thunk to fetch reservations based on user token
export const fetchBookings = createAsyncThunk(
    "book/fetchBookings",
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/reservations`, {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch bookings");
            }

            return await response.json();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<ReservationItem>) => {
            const existingIndex = state.bookItems.findIndex(
                (obj) => obj.venue === action.payload.venue && obj.bookDate === action.payload.bookDate
            );

            if (existingIndex !== -1) {
                state.bookItems[existingIndex] = action.payload;
            } else {
                state.bookItems.push(action.payload);
            }
        },
        removeBooking: (state, action: PayloadAction<ReservationItem>) => {
            state.bookItems = state.bookItems.filter(obj =>
                !(
                    obj.nameLastname === action.payload.nameLastname &&
                    obj.tel === action.payload.tel &&
                    obj.venue === action.payload.venue
                )
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.bookItems = action.payload;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    }
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
