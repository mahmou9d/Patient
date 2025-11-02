import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { refreshAccessToken } from "./createUserSlice";




interface GetUserState {
    user_id: string;
    loading: boolean;
    error: string | null;
}

const initialState: GetUserState = {
    user_id: "",
    loading: false,
    error: null,
};

export const getUser = createAsyncThunk(
    "users/getUser",
    async (_, { rejectWithValue, getState, dispatch }) => {
        try {
            const state: any = getState();
            // let token = state.createUser.access;
            let token =
                state?.createUser?.access ||
                state?.registerPatient?.access || localStorage.getItem("access")
            // console.log(token, "🔑 current access token");

            let response = await fetch(`https://fo2sh.pythonanywhere.com/api/user/info/`, {
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

                response = await fetch(`https://fo2sh.pythonanywhere.com/api/user/info/`, {
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
            // console.log("✅ User data:", data);
            return data;

        } catch (error: any) {
            console.error("❌ Error getting user details:", error);
            return rejectWithValue(error.message || "Failed to get user");
        }
    }
);

const getUserSlice = createSlice({
    name: "getUser",
    initialState,
    reducers: {
        resetGetUserState: (state) => {
            state.user_id = "";
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user_id = action.payload.user_id;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetGetUserState } = getUserSlice.actions;
export default getUserSlice.reducer;
