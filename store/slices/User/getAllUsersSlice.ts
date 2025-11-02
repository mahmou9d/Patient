// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { users } from "@/lib/appwrite";

// // ✳️ Type of single user
// export interface UserData {
//     id: string;
//     name: string;
//     email: string;
//     phone: string;
// }

// // 🔹 Redux state
// interface GetAllUsersState {
//     users: UserData[];
//     loading: boolean;
//     error: string | null;
//     success: boolean;
// }

// const initialState: GetAllUsersState = {
//     users: [],
//     loading: false,
//     error: null,
//     success: false,
// };

// // 🚀 AsyncThunk — Get all users
// export const getAllUsers = createAsyncThunk(
//     "users/getAllUsers",
//     async (_, { rejectWithValue }) => {
//         try {
//             // ⚙️ استدعاء API Appwrite
//             const response = await users.list();

//             // ✳️ نحول البيانات لشكل مناسب
//             const formattedUsers: UserData[] = response.users.map((user: any) => ({
//                 id: user.$id,
//                 name: user.name,
//                 email: user.email,
//                 phone: user.phone,
//             }));

//             return formattedUsers;
//         } catch (error: any) {
//             console.error("Error fetching all users:", error);
//             return rejectWithValue(error?.message || "Failed to fetch users");
//         }
//     }
// );

// // 🧠 Slice
// const getAllUsersSlice = createSlice({
//     name: "getAllUsers",
//     initialState,
//     reducers: {
//         resetGetAllUsersState: (state) => {
//             state.users = [];
//             state.loading = false;
//             state.error = null;
//             state.success = false;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getAllUsers.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//                 state.success = false;
//             })
//             .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<UserData[]>) => {
//                 state.loading = false;
//                 state.success = true;
//                 state.users = action.payload;
//             })
//             .addCase(getAllUsers.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 state.success = false;
//             });
//     },
// });

// export const { resetGetAllUsersState } = getAllUsersSlice.actions;
// export default getAllUsersSlice.reducer;
