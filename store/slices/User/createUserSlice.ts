import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CreateUserParams {
    email: string;
    password: string;
}

interface CreateUserState {
    access: string;
    refresh: string;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: CreateUserState = {
    access: "",
    refresh: "",
    loading: false,
    error: null,
    success: false,
};

export const createUser = createAsyncThunk(
    "users/createUser",
    async (user: CreateUserParams, { rejectWithValue }) => {
        // console.log(user.email, "hdkhgfhkfhfghj")
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        try {
            const response = await fetch("https://fo2sh.pythonanywhere.com/api/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to login");
            }

            const data = await response.json();

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            // console.log(data, "jbqguiglhiewf")
            return data;

        } catch (error: any) {
            console.error("Error creating user:", error);
            return rejectWithValue(error.message || "Network error");
        }
    }
);
export const refreshAccessToken = createAsyncThunk(
    "auth/refreshAccessToken",
    async (_, { rejectWithValue, getState }) => {
        try {
            const state: any = getState();
            const refreshToken = state.createUser.refresh || localStorage.getItem("refresh");

            if (!refreshToken) throw new Error("No refresh token available");

            const response = await fetch("https://fo2sh.pythonanywhere.com/api/auth/token/refresh/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (!response.ok) throw new Error("Failed to refresh token");

            const data = await response.json();
            // console.log("✅ Token refreshed:", data);

            // ✅ Update token in localStorage
            localStorage.setItem("access", data.access);

            return data.access;
        } catch (error: any) {
            console.error("Error refreshing token:", error);
            return rejectWithValue(error.message || "Failed to refresh token");
        }
    }
);

const createUserSlice = createSlice({
    name: "createUser",
    initialState,
    reducers: {
        resetCreateUserState: (state) => {
            // state.userId = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.access = action.payload.access;
                state.refresh = action.payload.refresh;

            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    },
});

export const { resetCreateUserState } = createUserSlice.actions;
export default createUserSlice.reducer;


// import { users } from "@/lib/appwrite.config";
// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// import { ID, Query } from "appwrite";

// interface UserResult {
//     id: string;
// }


// interface CreateUserState {
//     userId: string | null;
//     loading: boolean;
//     error: string | null;
//     success: boolean;
// }

// const initialState: CreateUserState = {
//     userId: null,
//     loading: false,
//     error: null,
//     success: false,
// };


// export const createUser = createAsyncThunk(
//     "users/createUser",
//     async (user: CreateUserParams, { rejectWithValue }) => {
//         try {
//             const newUser = await users.create(
//                 ID.unique(),
//                 user.email,
//                 user.phone,
//                 undefined,
//                 user.name
//             );

//             return { id: newUser.$id } as UserResult;
//         } catch (error: any) {
//             if (error?.code === 409) {
//                 const existingUser = await users.list([Query.equal("email", [user.email])]);
//                 const existing = existingUser.users?.[0];
//                 if (!existing) throw new Error("Existing user not found");
//                 return { id: existing.$id } as UserResult;
//             }

//             console.error("Error creating user:", error);
//             return rejectWithValue(error?.message || "Failed to create user");
//         }
//     }
// );


// const createUserSlice = createSlice({
//     name: "createUser",
//     initialState,
//     reducers: {
//         resetCreateUserState: (state) => {
//             state.userId = null;
//             state.loading = false;
//             state.error = null;
//             state.success = false;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(createUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//                 state.success = false;
//             })
//             .addCase(createUser.fulfilled, (state, action: PayloadAction<UserResult>) => {
//                 state.loading = false;
//                 state.success = true;
//                 state.userId = action.payload.id;
//             })
//             .addCase(createUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 state.success = false;
//             });
//     },
// });

// export const { resetCreateUserState } = createUserSlice.actions;
// export default createUserSlice.reducer;
