import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { refreshAccessToken } from "../User/createUserSlice";
import { Appointment } from "@/types/appwrite.types";

// export interface DoctorInfo {
//     id: number;
//     first_name: string;
//     last_name: string;
//     img_url: string;
// }

// export interface getAppointmentResponse {
//     id?: number;
//     confirmed_appointment_datetime: string | null;
//     doctor: DoctorInfo;
//     expected_appointment_date: string ;
//     reason: string;
//     // patient?:patient;
// }

interface AppointmentState {
    appointments: Appointment[];
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: AppointmentState = {
    appointments: [],
    loading: false,
    error: null,
    success: false,
};

export const getAllAppointment = createAsyncThunk<
    Appointment[],
    void,
    { rejectValue: string }
>(
    "appointments/getAllAppointment",
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
                `https://fo2sh.pythonanywhere.com/api/appointment/all/`,
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
                // console.log("🔑 Current access token:", token);

                response = await fetch(
                    `https://fo2sh.pythonanywhere.com/api/appointment/all/`,
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
                return rejectWithValue(
                    errorData.message || "Failed to fetch appointments"
                );
            }

            const data = await response.json();
            // console.log("✅ Appointments fetched:", data);
            return data?.appointments;
        } catch (error: any) {
            console.error("❌ Network or Token Error:", error);
            return rejectWithValue(error.message || "Failed to fetch appointments");
        }
    }
);

const getAppointmentSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        resetAppointmentsState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(
                getAllAppointment.fulfilled,
                (state, action: PayloadAction<Appointment[]>) => {
                    state.loading = false;
                    state.appointments = action.payload;
                    state.success = true;
                }
            )
            .addCase(getAllAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    },
});

export const { resetAppointmentsState } = getAppointmentSlice.actions;
export default getAppointmentSlice.reducer;
