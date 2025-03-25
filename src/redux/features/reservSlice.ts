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

// **Fetch reservations from backend**
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

// **Add a new booking (POST request)**
export const addBooking = createAsyncThunk(
    "book/addBooking",
    async ({ item, token }: { item: ReservationItem; token: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/reservations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                throw new Error("Failed to add booking");
            }

            return await response.json();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// **Remove a booking (DELETE request)**
export const removeBooking = createAsyncThunk(
    "book/removeBooking",
    async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/reservations/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete booking");
            }

            return id; // Return the ID of the deleted booking (backend uses _id)
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {},
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
            })
            .addCase(addBooking.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addBooking.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.bookItems.push(action.payload);
            })
            .addCase(addBooking.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(removeBooking.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeBooking.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.bookItems = state.bookItems.filter((item) => item.id !== action.payload);
            })
            .addCase(removeBooking.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    }
});

export default bookSlice.reducer;
