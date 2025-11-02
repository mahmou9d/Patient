import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { refreshAccessToken } from "../User/createUserSlice";
// import { refreshAccessToken } from "./createUserSlice";


interface Doctor {
    id: number;
    first_name: string;
    last_name: string;
    specialty: string;
    img_url: string;
}

interface GetUserState {
    Doctors: Doctor[];
    loading: boolean;
    error: string | null;
}


const initialState: GetUserState = {
    Doctors: [],
    loading: false,
    error: null,
};

export const getdoctors = createAsyncThunk(
    "users/getdoctors",
    async (_, { rejectWithValue, getState, dispatch }) => {
        try {
            const state: any = getState();
            let token =
                state?.createUser?.access ||
                state?.registerPatient?.access || localStorage.getItem("access");
            // console.log(token, "tyjty")
            if (!token) throw new Error("No access token found");


            // console.log(token, "🔑 current access token");

            let response = await fetch(`https://fo2sh.pythonanywhere.com/api/doctors/all/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                console.warn("⚠️ Access token expired, trying refresh...");

                const newTokenAction = await dispatch(refreshAccessToken());

                if (refreshAccessToken.rejected.match(newTokenAction)) {
                    throw new Error("Failed to refresh token");
                }

                const newToken = newTokenAction.payload;
                token = newToken;
                // console.log(newTokenAction, "tooooooooooooooooo")
                response = await fetch(`https://fo2sh.pythonanywhere.com/api/doctors/all/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch user");
            }

            const data = await response.json();
            // console.log("✅ doctors data:", data);
            return data;

        } catch (error: any) {
            console.error("❌ Error getting user details:", error);
            return rejectWithValue(error.message || "Failed to get user");
        }
    }
);

const getdoctorsSlice = createSlice({
    name: "getdoctors",
    initialState,
    reducers: {
        // resetGetUserState: (state) => {
        //     state.user_id = "";
        //     state.loading = false;
        //     state.error = null;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getdoctors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getdoctors.fulfilled, (state, action) => {
                state.loading = false;
                state.Doctors = action.payload.doctors;
            })
            .addCase(getdoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// export const { resetGetUserState } = getUserSlice.actions;
export default getdoctorsSlice.reducer;
