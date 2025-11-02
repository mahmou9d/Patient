import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { refreshAccessToken } from "../User/createUserSlice"; // ✅ نفس طريقة جلب التوكين

// =====================
// 1️⃣ Types
// =====================
export interface AppointmentResponse {
    appointment_id: number;
    doctor: string;
    expected_date: string;
    message: string;
    patient: string;
    status: string;
    user_id: number;
}

interface CreateAppointmentParams {
    doctor_id: string;
    expected_appointment_date: string;
    reason_for_appointment: string;
    additional_notes?: string;
    appointment_id?:string;
    confirmed_appointment_datetime?:string
    id?:string
}

interface AppointmentState {
    appointments: CreateAppointmentParams[];
    loading: boolean;
    error: string | null;
    success: boolean;
}

// =====================
// 2️⃣ Initial State
// =====================
const initialState: AppointmentState = {
    appointments: [],
    loading: false,
    error: null,
    success: false,
};

// =====================
// 3️⃣ Async Thunk
// =====================
export const createAppointment = createAsyncThunk<
    CreateAppointmentParams, // ✅ return type
    CreateAppointmentParams, // ✅ argument type
    { rejectValue: string }
>(
    "appointments/create",
    async (appointment, { rejectWithValue, getState, dispatch }) => {
        try {
            // 🔑 Get current token from Redux or localStorage
            const state: any = getState();
            let token =
                state?.createUser?.access ||
                state?.registerPatient?.access ||
                localStorage.getItem("access");

            if (!token) throw new Error("No access token found");

            // console.log("🔑 Current access token:", token);

            // 🟢 Try POST request
            let response = await fetch(
                "https://fo2sh.pythonanywhere.com/api/appointment/book/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(appointment),
                }
            );

            // 🟡 If token expired, refresh it
            if (response.status === 401) {
                console.warn("⚠️ Access token expired, trying refresh...");
                const newTokenAction = await dispatch(refreshAccessToken());

                if (refreshAccessToken.rejected.match(newTokenAction)) {
                    throw new Error("Failed to refresh token");
                }

                const newToken = newTokenAction.payload;
                token = newToken;
                localStorage.setItem("access", newToken);

                // 🔁 Retry request with new token
                response = await fetch(
                    "https://fo2sh.pythonanywhere.com/api/appointment/book/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(appointment),
                    }
                );
            }

            // 🔴 Handle backend error
            if (!response.ok) {
                const errorData = await response.json();
                console.error("❌ API Error:", errorData);
                return rejectWithValue(
                    errorData.message || "Failed to create appointment"
                );
            }

            const data = await response.json();
            // console.log("✅ Appointment created:", data);
            return data;
        } catch (error: any) {
            console.error("❌ Network or Token Error:", error);
            return rejectWithValue(error.message || "Failed to create appointment");
        }
    }
);

// =====================
// 4️⃣ Slice
// =====================
const appointmentSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        resetAppointmentState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(
                createAppointment.fulfilled,
                (state, action: PayloadAction<CreateAppointmentParams>) => {
                    state.loading = false;
                    state.appointments.push(action.payload);
                    state.success = true;
                }
            )
            .addCase(createAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    },
});

export const { resetAppointmentState } = appointmentSlice.actions;
export default appointmentSlice.reducer;
