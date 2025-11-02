/* eslint-disable no-unused-vars */

// declare type SearchParamProps = {
//     params: { [key: string]: string };
//     searchParams: { [key: string]: string | string[] | undefined };
// };
type SearchParamProps = {
    params: Promise<{
        [key: string]: string;
    }>;
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
};

declare type Gender = "Male" | "Female" | "Other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
}
declare interface User extends CreateUserParams {
    user_id: string;
}

// declare interface RegisterUserParams extends CreateUserParams {
//     userId: string;
//     birthDate: Date;
//     gender: Gender;
//     address: string;
//     occupation: string;
//     emergencyContactName: string;
//     emergencyContactNumber: string;
//     primaryPhysician: string;
//     insuranceProvider: string;
//     insurancePolicyNumber: string;
//     allergies: string | undefined;
//     currentMedication: string | undefined;
//     familyMedicalHistory: string | undefined;
//     pastMedicalHistory: string | undefined;
//     identificationType: string | undefined;
//     identificationNumber: string | undefined;
//     identificationDocument: FormData | undefined;
//     privacyConsent: boolean;

// }

declare interface RegisterUser {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    date_of_birth: string;
    gender: Gender;
    address: string;
    occupation: string;
    emergency_contact_name: string;
    emergency_contact_phone: string;
    profile: {
        insurance_provider: string;
        insurance_policy_number: string;
        allergies?: string;
        current_medications?: string;
        family_medical_history?: string;
        past_medical_history?: string;
    };
}
declare type CreateAppointmentParams = {
    doctor_id: number;
    reason_for_appointment: string;
    expected_appointment_date: string;
    additional_notes: string | undefined;
     appointment_id?: string;
    confirmed_appointment_datetime?:string
    id?:string
};

declare type UpdateAppointmentParams = {
    appointmentId: string;
    userId: string;
    timeZone: string;
    appointment: Appointment;
    type: string;
};