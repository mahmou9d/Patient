"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectItem } from "@/components/ui/select";
// import { Doctors } from "@/constants";
import // createAppointment,
// updateAppointment,
"@/lib/actions/appointment.actions";
import { getAppointmentSchema } from "@/lib/validation";
// import { Appointment } from "@/types/appwrite.types";

import "react-datepicker/dist/react-datepicker.css";

import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";
import { FormFieldType } from "./PatientForm";
// import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getdoctors } from "@/store/slices/Patient/getdoctorsSlice";
import { createAppointment } from "@/store/slices/Appointment/createAppointmentSlice";
import { updateAppointment } from "@/store/slices/Appointment/updateAppointmentSlice";
import { cancelAppointment, CancelAppointmentPayload } from "@/store/slices/Appointment/cancelAppointmentSlice";
import { getRecentAppointmentList } from "@/store/slices/Appointment/getRecentAppointmentListSlice";
import { getAllAppointment } from "@/store/slices/Appointment/getAllAppointmentSlice";

export const AppointmentForm = ({
  userId,
  // patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: any;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  // console.log(userId)
  // console.log(appointment, "additional_notes");
  const { Doctors } = useAppSelector((state: RootState) => state.getdoctors);
  console.log(Doctors, "RootState");
  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log("🟢 Dispatching getdoctors...");
    dispatch(getdoctors());
  }, [dispatch]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      // reason:"",
      doctor_id: appointment?.doctor_id?.toString() || "",
      expected_appointment_date: appointment?.expected_appointment_date
        ? typeof appointment.expected_appointment_date === "string"
          ? appointment.expected_appointment_date
          : new Date(appointment.expected_appointment_date).toLocaleDateString(
              "en-CA"
            )
        : new Date().toLocaleDateString("en-CA"),
      reason_for_appointment: appointment
        ? appointment.reason_for_appointment
        : "",
      additional_notes: appointment?.additional_notes || "",
      confirmed_appointment_datetime:
        appointment?.confirmed_appointment_datetime
          ? new Date(appointment.confirmed_appointment_datetime).toISOString()
          : new Date().toISOString(),
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
const payload: CancelAppointmentPayload | null =
  type === "cancel"
    ? {
        id: appointment?.id!,
        reason: (values as any)?.reason || "",
      }
    : null;
    setIsLoading(true);
    // if (!values.doctor_id) {
    //   alert("Please select a doctor!");
    //   setIsLoading(false);
    //   return;
    // }
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && userId) {
        if (!values?.doctor_id) {
          throw new Error("Doctor ID is required");
        }
        const appointment = {
          doctor_id: values?.doctor_id,
          expected_appointment_date: values?.expected_appointment_date
            ? new Date(values.expected_appointment_date)
                .toISOString()
                .split("T")[0]
            : new Date().toISOString().split("T")[0],
          reason_for_appointment: values.reason_for_appointment!,
          additional_notes: values.additional_notes,
        };

        const newAppointment = await dispatch(
          createAppointment(appointment)
        ).unwrap();
        // console.log(newAppointment, "bbbbbbbbbbbbbbb");
        if (newAppointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment?.appointment_id}`
          );
        }
      } else if (type === "cancel" && userId) {
         console.log(appointment?.id!);
        const cancelAppointments = await dispatch(cancelAppointment(payload!)).unwrap();
                if (cancelAppointments) {
                  setOpen && setOpen(false);
                  form.reset();
                }
      } else {
        console.log(values?.confirmed_appointment_datetime!);
        // if (values?.confirmed_appointment_datetime!) {
        //   alert("No confirmed appointment time available");
        //   setIsLoading(false);
        //   return;
        // }

        // console.log(appointment, "appointment");
        const updatedAppointment = await dispatch(
          updateAppointment({
            id: appointment?.id!,
            time: values?.confirmed_appointment_datetime!,
          })
        ).unwrap();

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
        dispatch(getRecentAppointmentList());
        dispatch(getAllAppointment());

  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Apppointment";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="doctor_id"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem
                  // className="z-[9999]"
                  key={doctor.id}
                  value={doctor.id.toString()}
                >
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.img_url.replace("http://", "https://")}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{`${doctor.first_name} ${doctor.last_name}`} </p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="expected_appointment_date"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />

            <div
              className={`flex flex-col gap-6  ${
                type === "create" && "xl:flex-row"
              }`}
            >
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason_for_appointment"
                label="Appointment reason"
                placeholder="Annual montly check-up"
                // disabled={type === "schedule"}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="additional_notes"
                label="Comments/notes"
                placeholder="Prefer afternoon appointments, if possible"
                // disabled={type === "schedule"}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full h-12`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
