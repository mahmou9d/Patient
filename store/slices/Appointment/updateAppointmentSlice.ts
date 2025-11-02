import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { refreshAccessToken } from "../User/createUserSlice";

// export interface DoctorInfo {
//     id: number;
//     first_name: string;
//     last_name: string;
//     img_url: string;
// }

// export interface getAppointmentResponse {
//     id?: number; // لو السيرفر بيرجع ID
//     confirmed_appointment_datetime: string | null;
//     doctor: DoctorInfo;
//     expected_appointment_date: string;
//     reason: string;
// }

interface AppointmentState {
    appointments: string;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: AppointmentState = {
    appointments: "",
    loading: false,
    error: null,
    success: false,
};

export const updateAppointment = createAsyncThunk<
    string,
    { id: string; time: string },
    { rejectValue: string }
>(
    "appointments/update",
    async ({id,time}, { rejectWithValue, getState, dispatch }) => {
        try {
            const state: any = getState();
            let token =
                state?.createUser?.access ||
                state?.registerPatient?.access ||
                localStorage.getItem("access");

            if (!token) throw new Error("No access token found");

            // console.log("🔑 Current access token:", token);

            let response = await fetch(
                `https://fo2sh.pythonanywhere.com/api/appointment/schedule/${id!}/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }, body: JSON.stringify({ confirmed_date: time }),
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
                    `https://fo2sh.pythonanywhere.com/api/appointment/schedule/${id!}/`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }, body: JSON.stringify({ confirmed_date: time }),
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
            console.log("✅ Appointments fetched:", data);
            return data;
        } catch (error: any) {
            console.error("❌ Network or Token Error:", error);
            return rejectWithValue(error.message || "Failed to fetch appointments");
        }
    }
);

const updateAppointmentSlice = createSlice({
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
            .addCase(updateAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(
                updateAppointment.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.appointments = action.payload;
                    state.success = true;
                }
            )
            .addCase(updateAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    },
});

export const { resetAppointmentsState } = updateAppointmentSlice.actions;
export default updateAppointmentSlice.reducer;

// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { databases } from "@/lib/appwrite";
// import { DATABASE_ID, APPOINTMENT_COLLECTION_ID } from "@/lib/config";
// import { revalidatePath } from "next/cache";
// import { parseStringify } from "@/lib/utils";
// import { Appointment } from "@/types/appwrite.types";



// interface UpdateAppointmentState {
//     updatedAppointment: Appointment | null;
//     loading: boolean;
//     error: string | null;
//     success: boolean;
// }

// const initialState: UpdateAppointmentState = {
//     updatedAppointment: null,
//     loading: false,
//     error: null,
//     success: false,
// };



// export const updateAppointment = createAsyncThunk(
//     "appointments/update",
//     async (params: UpdateAppointmentParams, { rejectWithValue }) => {
//         try {
//             const { appointmentId, appointment } = params;

//             const updatedAppointment = await databases.updateDocument(
//                 DATABASE_ID!,
//                 APPOINTMENT_COLLECTION_ID!,
//                 appointmentId,
//                 appointment
//             );

//             if (!updatedAppointment) throw new Error("Failed to update appointment");


//             revalidatePath("/admin");

//             return parseStringify(updatedAppointment);
//         } catch (error: any) {
//             console.error("Error updating appointment:", error);
//             return rejectWithValue(error.message || "Failed to update appointment");
//         }
//     }
// );


// const updateAppointmentSlice = createSlice({
//     name: "updateAppointment",
//     initialState,
//     reducers: {
//         resetUpdateState: (state) => {
//             state.loading = false;
//             state.error = null;
//             state.success = false;
//             state.updatedAppointment = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(updateAppointment.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//                 state.success = false;
//             })
//             .addCase(
//                 updateAppointment.fulfilled,
//                 (state, action: PayloadAction<Appointment>) => {
//                     state.loading = false;
//                     state.success = true;
//                     state.updatedAppointment = action.payload;
//                 }
//             )
//             .addCase(updateAppointment.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 state.success = false;
//             });
//     },
// });

// export const { resetUpdateState } = updateAppointmentSlice.actions;
// export default updateAppointmentSlice.reducer;
