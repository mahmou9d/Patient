import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { refreshAccessToken } from "../User/createUserSlice";

export interface DoctorInfo {
    id: number;
    first_name: string;
    last_name: string;
    img_url: string;
}

export interface Appointment {
    id: number;
    confirmed_appointment_datetime: string | null;
    expected_appointment_date: string;
    reason: string;
    status?: string;
    doctor: DoctorInfo;
}
cancelled_appointments_count
:
0
pending_appointments_count
:
11
total
:
11
interface RecentAppointmentsData {
    total: number;
    // scheduledCount: number;
    pending_appointments_count: number;
    cancelled_appointments_count: number;
    // documents: Appointment[];
}

interface RecentAppointmentsState {
    data: RecentAppointmentsData | null;
    loading: boolean;
    error: string | null;
}

const initialState: RecentAppointmentsState = {
    data: null,
    loading: false,
    error: null,
};

export const getRecentAppointmentList = createAsyncThunk<
    RecentAppointmentsData,
    void,
    { rejectValue: string }
>(
    "appointments/getRecent",
    async (_, { rejectWithValue, getState, dispatch }) => {
        try {
            const state: any = getState();
            let token =
                state?.createUser?.access ||
                state?.registerPatient?.access ||
                localStorage.getItem("access");

            if (!token) throw new Error("No access token found");

            // console.log("🔑 Current access token:", token);

            let response = await fetch(
                `https://fo2sh.pythonanywhere.com/api/appointment/stat/`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 401) {
                console.warn("⚠️ Token expired, refreshing...");
                const refreshResult = await dispatch(refreshAccessToken());

                if (refreshAccessToken.rejected.match(refreshResult)) {
                    throw new Error("Failed to refresh token");
                }

                const newToken = refreshResult.payload as string;
                localStorage.setItem("access", newToken);
                token = newToken;

                response = await fetch(
                    `https://fo2sh.pythonanywhere.com/api/appointment/stat/`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            if (!response.ok) {
                const errorData = await response.json();
                console.error("❌ API Error:", errorData);
                return rejectWithValue(errorData.message || "Failed to fetch appointments");
            }

            const data = await response.json();
            // console.log(data, "data")
            // console.log("✅ Appointments fetched:", result);
            return data;
        } catch (error: any) {
            console.error("❌ Network or Token Error:", error);
            return rejectWithValue(error.message || "Failed to fetch appointments");
        }
    }
);

const recentAppointmentsSlice = createSlice({
    name: "recentAppointments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRecentAppointmentList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getRecentAppointmentList.fulfilled,
                (state, action: PayloadAction<RecentAppointmentsData>) => {
                    state.loading = false;
                    state.data = action.payload;
                }
            )
            .addCase(getRecentAppointmentList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default recentAppointmentsSlice.reducer;
