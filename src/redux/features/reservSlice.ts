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
    async ({ token, filter }: { token: string; filter: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservations?filter=${filter}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch bookings");
            }

            const data = await response.json();
            return data.data; // Return only the array of reservations
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


// **Add a new booking (POST request)**
export const addBooking = createAsyncThunk(
    "book/addBooking",
    async ({ item, token }: { item: ReservationItem; token: string }, { rejectWithValue }) => {
        console.log(item.user.id +"\n"+item.massageshop._id+"\n"+item.reservDate )
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/massageShops/${item.massageshop}/reservation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    user: item.user.id, 
                    massageshop: item.massageshop._id, 
                    reservDate: item.reservDate 
                })
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservations/${id}`, {
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

// **Update a booking (PUT request)**
export const updateBooking = createAsyncThunk(
    "book/updateBooking",
    async ({id, item, token }: { id:string;item: ReservationItem; token: string }, { rejectWithValue }) => {
        console.log(id + "\n" + item.user.id + " \n" + item.massageshop._id)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservations/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: id,
                    user: item.user.id, 
                    massageshop: item.massageshop._id, 
                    reservDate: item.reservDate 
                })
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
                state.bookItems = Array.isArray(action.payload) ? action.payload : [];
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
                state.bookItems = [...state.bookItems, action.payload];
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
            })
            .addCase(updateBooking.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateBooking.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.bookItems = state.bookItems.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(updateBooking.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    }
});

export default bookSlice.reducer;
