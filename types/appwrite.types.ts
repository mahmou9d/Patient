import { DoctorInfo } from "@/store/slices/Appointment/getAppointmentSlice";
import { Models } from "node-appwrite";

// export interface Patient extends Models.Document {
//     userId: string;
//     name: string;
//     email: string;
//     phone: string;
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
export interface Patient extends Models.Document {
    first_name: string
    id: number
    img_url: string
    last_name: string
}
export interface Appointment extends Models.Document {
    patient: Patient;
    expected_appointment_date: Date;
    status: Status;
    // primaryPhysician: string;
    reason: string;
    // note?: string;
    id: string;
    // cancellationReason: string | null;
    confirmed_appointment_datetime?: string | null;
    doctor: DoctorInfo;
    doctor_id?: string | number
    reason_for_appointment?: string
    additional_notes?: string
}