import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";



interface RegisterPatientState {
    user_id: string | null;
    access: string;
    refresh: string;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: RegisterPatientState = {
    user_id: "",
    access: "",
    refresh: "",
    loading: false,
    error: null,
    success: false,
};

export const registerPatient = createAsyncThunk(
    "patients/registerPatient",
    async (params: RegisterUser, { rejectWithValue }) => {
        console.log(params)
        try {
            const response = await fetch(
                "https://fo2sh.pythonanywhere.com/api/auth/register/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(params),
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                // console.log("❌ Server Error:", errorData);
                return rejectWithValue(
                    errorData.message || "Failed to register patient"
                );
            }

            const data = await response.json();
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            // console.log("✅ Patient registered successfully:", data);

            return data;
        } catch (error: any) {
            console.error("Error while registering patient:", error);
            return rejectWithValue(error.message || "Network error");
            
        }
    }
);


// 🧠 Slice
const registerPatientSlice = createSlice({
    name: "registerPatient",
    initialState,
    reducers: {
        resetRegisterPatientState: (state) => {
            state.user_id = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerPatient.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerPatient.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.user_id = action.payload.id;
                state.access = action.payload.access;
                state.refresh = action.payload.refresh;
            })
            .addCase(registerPatient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    },
});

export const { resetRegisterPatientState } = registerPatientSlice.actions;
export default registerPatientSlice.reducer;
