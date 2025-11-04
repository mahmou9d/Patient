import { configureStore } from "@reduxjs/toolkit";
import createUserReducer from "./slices/User/createUserSlice";
import getUserReducer from "./slices/User/getUserSlice";
import registerPatientReducer from "./slices/Patient/registerPatientSlice";
import getdoctorsSlice from "./slices/Patient/getdoctorsSlice";
import getAppointmentDoctorSlice from "./slices/Appointment/getAppointmentDoctorSlice";
// import getPatientReducer from "./slices/Patient/getPatientSlice";
// import createAppointmentReducer from "./slices/Appointment/createAppointmentSlice";
import getAppointmentSlice from "./slices/Appointment/getAppointmentSlice";
import getAllAppointmentSlice from "./slices/Appointment/getAllAppointmentSlice";
import getRecentAppointmentListSlice from "./slices/Appointment/getRecentAppointmentListSlice";
// import updateAppointmentSlice from "./slices/Appointment/updateAppointmentSlice";

export const store = configureStore({
    reducer: {
        createUser: createUserReducer,
        getUser: getUserReducer,
        registerPatient: registerPatientReducer,
        getdoctors: getdoctorsSlice,
        getAppointmentDoctor: getAppointmentDoctorSlice,
        // getPatient: getPatientReducer,
        // createAppointment: createAppointmentReducer,
        getAppointment: getAppointmentSlice,
        getAllAppointment: getAllAppointmentSlice,
        getRecent: getRecentAppointmentListSlice,
        // updateAppointment: updateAppointmentSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
