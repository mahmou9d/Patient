// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { databases } from "@/lib/appwrite";
// import { DATABASE_ID, PATIENT_COLLECTION_ID } from "@/lib/config";
// import { Query } from "appwrite";
// import { Patient } from "@/types/appwrite.types";



// interface GetPatientState {
//     patient: Patient | null;
//     loading: boolean;
//     error: string | null;
//     success: boolean;
// }

// const initialState: GetPatientState = {
//     patient: null,
//     loading: false,
//     error: null,
//     success: false,
// };




// export const getPatient = createAsyncThunk(
//     "patients/getPatient",
//     async (userId: string, { rejectWithValue }) => {
//         try {
//             const patients = await databases.listDocuments(
//                 DATABASE_ID!,
//                 PATIENT_COLLECTION_ID!,
//                 [Query.equal("userId", [userId])]
//             );

//             if (!patients.documents.length) {
//                 throw new Error("No patient found for this user ID");
//             }

//             const patient = patients.documents[0];

//             return {
//                 id: patient.$id,
//                 ...patient,
//             } as Patient;
//         } catch (error: any) {
//             console.error("Error fetching patient:", error);
//             return rejectWithValue(error?.message || "Failed to fetch patient");
//         }
//     }
// );



// const getPatientSlice = createSlice({
//     name: "getPatient",
//     initialState,
//     reducers: {
//         resetGetPatientState: (state) => {
//             state.patient = null;
//             state.loading = false;
//             state.error = null;
//             state.success = false;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getPatient.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//                 state.success = false;
//             })
//             .addCase(getPatient.fulfilled, (state, action: PayloadAction<Patient>) => {
//                 state.loading = false;
//                 state.success = true;
//                 state.patient = action.payload;
//             })
//             .addCase(getPatient.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 state.success = false;
//             });
//     },
// });

// export const { resetGetPatientState } = getPatientSlice.actions;
// export default getPatientSlice.reducer;
