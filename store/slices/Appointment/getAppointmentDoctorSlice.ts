import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { refreshAccessToken } from "../User/createUserSlice";

export interface DoctorInfo {
    id: number;
    first_name: string;
    last_name: string;
    img_url: string;
}

export interface getAppointmentResponse {
    info: {
        id?: number; // لو السيرفر بيرجع ID
        confirmed_appointment_datetime: string | null;
        doctor: DoctorInfo;
        expected_appointment_date: string;
        reason: string;
    }

}

interface AppointmentState {
    appointments: getAppointmentResponse | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: AppointmentState = {
    appointments: null,
    loading: false,
    error: null,
    success: false,
};

export const getAppointmentDoctor = createAsyncThunk<
    getAppointmentResponse,
    string | undefined,
    { rejectValue: string }
>(
    "appointments/getAppointmentDoctor",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const state: any = getState();
            let token =
                state?.createUser?.access ||
                state?.registerPatient?.access ||
                localStorage.getItem("access");

            if (!token) throw new Error("No access token found");

            // console.log("🔑 Current access token:", token);

            let response = await fetch(
                `https://fo2sh.pythonanywhere.com/api/appointment/info/${id!}`,
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
                    `https://fo2sh.pythonanywhere.com/api/appointment/info/${id!}`,
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
            return data;
        } catch (error: any) {
            console.error("❌ Network or Token Error:", error);
            return rejectWithValue(error.message || "Failed to fetch appointments");
        }
    }
);

const getAppointmentDoctorSlice = createSlice({
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
            .addCase(getAppointmentDoctor.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(
                getAppointmentDoctor.fulfilled,
                (state, action: PayloadAction<getAppointmentResponse>) => {
                    state.loading = false;
                    state.appointments = action.payload;
                    state.success = true;
                }
            )
            .addCase(getAppointmentDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    },
});

export const { resetAppointmentsState } = getAppointmentDoctorSlice.actions;
export default getAppointmentDoctorSlice.reducer;
