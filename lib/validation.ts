import { z } from "zod";

export const UserFormValidation = z.object({
    email: z.string().email("Invalid email address"),
    password: z
        .string(),
});
export const RegisterUserValidation = z.object({
    username: z
        .string()
        .min(2, "Username must be at least 2 characters")
        .max(50, "Username must be at most 50 characters"),

    email: z.email({ message: "Invalid email address" }),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password must be at most 100 characters"),

    first_name: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name must be at most 50 characters"),

    last_name: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name must be at most 50 characters"),

    phone_number: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
    date_of_birth: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),



    gender: z.enum(["Male", "Female", "Other"]),
    // primaryPhysician: z.string().min(2, "Select at least one doctor").optional(),
    address: z
        .string()
        .min(5, "Address must be at least 5 characters")
        .max(500, "Address must be at most 500 characters"),

    occupation: z
        .string()
        .min(2, "Occupation must be at least 2 characters")
        .max(100, "Occupation must be at most 100 characters"),

    emergency_contact_name: z
        .string()
        .min(2, "Emergency contact name must be at least 2 characters")
        .max(50, "Emergency contact name must be at most 50 characters"),

    emergency_contact_phone: z
        .string()
        .refine(
            (phone) => /^\+\d{10,15}$/.test(phone),
            "Invalid emergency contact phone number"
        ),

    profile: z.object({
        insurance_provider: z
            .string()
            .min(2, "Insurance provider must be at least 2 characters")
            .max(50, "Insurance provider must be at most 50 characters"),

        insurance_policy_number: z
            .string()
            .min(2, "Insurance policy number must be at least 2 characters")
            .max(50, "Insurance policy number must be at most 50 characters"),

        allergies: z.string().optional(),
        current_medications: z.string().optional(),
        family_medical_history: z.string().optional(),
        past_medical_history: z.string().optional(),
    }),

    // identification_type: z.string().optional(),
    // identification_number: z.string().optional(),
    // identification_document: z.custom<File[]>().optional(),

    // treatment_consent: z
    //     .boolean()
    //     .default(false)
    //     .refine((value) => value === true, {
    //         message: "You must consent to treatment in order to proceed",
    //     }),

    // disclosure_consent: z
    //     .boolean()
    //     .default(false)
    //     .refine((value) => value === true, {
    //         message: "You must consent to disclosure in order to proceed",
    //     }),

    // privacy_consent: z
    //     .boolean()
    //     .default(false)
    //     .refine((value) => value === true, {
    //         message: "You must consent to privacy in order to proceed",
    //     }),
});
export const PatientFormValidation = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
    birthDate: z.coerce.date(),
    gender: z.enum(["male", "female", "other"]),
    address: z
        .string()
        .min(5, "Address must be at least 5 characters")
        .max(500, "Address must be at most 500 characters"),
    occupation: z
        .string()
        .min(2, "Occupation must be at least 2 characters")
        .max(500, "Occupation must be at most 500 characters"),
    emergencyContactName: z
        .string()
        .min(2, "Contact name must be at least 2 characters")
        .max(50, "Contact name must be at most 50 characters"),
    emergencyContactNumber: z
        .string()
        .refine(
            (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
            "Invalid phone number"
        ),
    primaryPhysician: z.string().min(2, "Select at least one doctor"),
    insuranceProvider: z
        .string()
        .min(2, "Insurance name must be at least 2 characters")
        .max(50, "Insurance name must be at most 50 characters"),
    insurancePolicyNumber: z
        .string()
        .min(2, "Policy number must be at least 2 characters")
        .max(50, "Policy number must be at most 50 characters"),
    allergies: z.string().optional(),
    currentMedication: z.string().optional(),
    familyMedicalHistory: z.string().optional(),
    pastMedicalHistory: z.string().optional(),
    identificationType: z.string().optional(),
    identificationNumber: z.string().optional(),
    identificationDocument: z.custom<File[]>().optional(),
    treatmentConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "You must consent to treatment in order to proceed",
        }),
    disclosureConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "You must consent to disclosure in order to proceed",
        }),
    privacyConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "You must consent to privacy in order to proceed",
        }),
});

export const CreateAppointmentSchema = z.object({
    // primaryPhysician: z.string().min(2, "Select at least one doctor"),
    // schedule: z.coerce.date(),
    doctor_id: z.string(),
    expected_appointment_date: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
    reason_for_appointment: z
        .string()
        .min(2, "Reason must be at least 2 characters")
        .max(500, "Reason must be at most 500 characters"),
    additional_notes: z.string().optional(),
    // cancellationReason: z.string().optional(),
    // confirmed_appointment_datetime: z
    //     .string()
    //     .refine((val) => !isNaN(Date.parse(val)), "Invalid date format").optional(),
    confirmed_appointment_datetime: z
        .union([
            z.literal(""), // يسمح بالسلسلة الفاضية
            z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
        ])
        .optional(),

});

export const ScheduleAppointmentSchema = z.object({
    // For scheduling, only the date/time needs to be confirmed from admin UI
    expected_appointment_date: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
    doctor_id: z.string().optional(),
    reason_for_appointment: z.string().optional(),
    additional_notes: z.string().optional(),
    confirmed_appointment_datetime: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
});

export const CancelAppointmentSchema = z.object({
    // For cancel, only cancellationReason is entered in the modal
    reason: z
        .string()
        .min(2, "Reason must be at least 2 characters")
        .max(500, "Reason must be at most 500 characters"),
    doctor_id: z.string().optional(),
    expected_appointment_date: z.string().optional(),
    reason_for_appointment: z.string().optional(),
    additional_notes: z.string().optional(), 
    confirmed_appointment_datetime: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Invalid date format").optional(),

});

export function getAppointmentSchema<T extends "create" | "schedule" | "cancel">(type: T) {
    if (type === "create") return CreateAppointmentSchema;
    if (type === "cancel") return CancelAppointmentSchema;
    return ScheduleAppointmentSchema;
}
