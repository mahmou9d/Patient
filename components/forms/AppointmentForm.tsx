"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  cancelAppointment,
  CancelAppointmentPayload,
} from "@/store/slices/Appointment/cancelAppointmentSlice";
import { getRecentAppointmentList } from "@/store/slices/Appointment/getRecentAppointmentListSlice";
import { getAllAppointment } from "@/store/slices/Appointment/getAllAppointmentSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Link from "next/link";
import { getUser } from "@/store/slices/User/getUserSlice";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useToast } from "@/hooks/use-toast";
interface AppointmentFormProps {
  userId: string;
  type?: "create" | "schedule" | "cancel";
  appointment?: any;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
export const AppointmentForm = ({
  userId,
  // patientId,
  type = "create",
  appointment,
  setOpen,
}: AppointmentFormProps) => {
  // console.log(userId)
  // console.log(appointment, "additional_notes");
  const { Doctors } = useAppSelector((state: RootState) => state.getdoctors);
  const { is_admin } = useAppSelector((state: RootState) => state.getUser);
  // console.log(Doctors, "RootState");
  const dispatch = useAppDispatch();
  const currentType = type ?? "create";
  useEffect(() => {
    // console.log("🟢 Dispatching getdoctors...");
    dispatch(getUser());
    dispatch(getdoctors());
  }, [dispatch]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [openSpecialization, setOpenSpecialization] = useState<string>("");
  const { toast } = useToast();
  
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
          : "",
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
          toast({
            title: "✅ Appointment Created",
            variant: "success",
          });
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment?.appointment_id}`
          );
        }
      } else if (type === "cancel" && userId) {
        console.log(appointment?.id!);
        const cancelAppointments = await dispatch(
          cancelAppointment(payload!)
        ).unwrap();
        if (cancelAppointments) {
          form.setValue("confirmed_appointment_datetime", ""); // يمسح القيمة من الفورم
          form.trigger("confirmed_appointment_datetime"); // يجبر الفورم يحدّث القيم
          setOpen && setOpen(false);
          form.reset();
          toast({
            title: "❌ Appointment Cancelled",
            variant: "destructive",
          });
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
          toast({
            title: "🕓 Appointment schedule",
            variant: "success",
          });
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
  const groupedDoctors = Doctors.reduce((groups, doctor) => {
    const key = doctor.specialty || "Other";
    if (!groups[key]) groups[key] = [];
    groups[key].push(doctor);
    return groups;
  }, {} as Record<string, typeof Doctors>);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {/* <pre className="text-red-500 text-xs">
          {JSON.stringify(form.formState.errors, null, 2)}
        </pre> */}
        {type === "create" && (
          <section className="mb-12 space-y-4">
            {is_admin && (
              <Link href={"/admin"} className="text-green-500">
                Admin
              </Link>
            )}
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}
        {type !== "cancel" && type !== "create" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="doctor_id"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Object.entries(groupedDoctors).map(
                ([specialization, doctors]) => {
                  // const isOpen =
                  //   form.watch("openSpecialization") === specialization;
                  const isOpen = openSpecialization === specialization;
                  return (
                    <div key={specialization} className="w-full">
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setOpenSpecialization(isOpen ? "" : specialization);
                        }}
                        className="flex w-full items-center justify-between px-3 py-2 hover:bg-accent rounded-md cursor-pointer mb-1"
                      >
                        <h1 className="text-gray-400 font-medium capitalize">
                          {specialization}
                        </h1>

                        <h1 className="text-gray-400 text-xs">
                          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </h1>
                      </div>

                      {isOpen && (
                        <div className="pl-4 py-1 flex flex-col gap-1">
                          {doctors.map((doctor) => (
                            <SelectItem
                              key={doctor.id}
                              value={doctor.id.toString()}
                              className="flex flex-row w-full items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md transition"
                            >
                              <div className="flex gap-2">
                                <Image
                                  src={doctor.img_url.replace(
                                    "http://",
                                    "https://"
                                  )}
                                  width={28}
                                  height={28}
                                  alt="doctor"
                                  className="rounded-full border border-gray-300"
                                />
                                <div className="text-sm">
                                  {doctor.first_name} {doctor.last_name}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </CustomFormField>
            <div>
              {/* <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="doctor_id"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Object.entries(groupedDoctors).map(
                ([specialization, doctors]) => (
                  <SelectGroup key={specialization}>
                    <SelectLabel className="text-gray-500 font-medium capitalize">
                      {specialization}
                    </SelectLabel>

                    {doctors.map((doctor) => (
                      <SelectItem
                        key={doctor.id}
                        value={doctor.id.toString()}
                        className="flex items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md transition"
                      >
                        <Image
                          src={doctor.img_url.replace("http://", "https://")}
                          width={28}
                          height={28}
                          alt="doctor"
                          className="rounded-full border border-gray-300"
                        />
                        <span className="text-sm">
                          {doctor.first_name} {doctor.last_name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )
              )}
            </CustomFormField> */}

              {/* <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="doctor_id"
              label="Doctor"
              placeholder="Select a doctor"
            >
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(groupedDoctors).map(
                  ([specialization, doctors]) => (
                    <AccordionItem key={specialization} value={specialization}>
                      <AccordionTrigger className="text-sm font-medium xl:px-5 capitalize hover:no-underline">
                        {specialization}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2 xl:px-5">
                          {doctors.map((doctor) => (
                            <div
                              key={doctor.id}
                              onClick={() =>
                                form.setValue("doctor_id", doctor.id.toString())
                              }
                              className="flex items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md transition"
                            >
                              <Image
                                src={doctor.img_url.replace(
                                  "http://",
                                  "https://"
                                )}
                                width={32}
                                height={32}
                                alt="doctor"
                                className="rounded-full border border-gray-300"
                              />
                              <p className="text-sm">{`${doctor.first_name} ${doctor.last_name}`}</p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
              </Accordion>
            </CustomFormField> */}
            </div>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="expected_appointment_date"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="confirmed_appointment_datetime"
              label="Confirmed appointment datetime"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />
            <div
              className={`flex flex-col gap-6  ${
                currentType === "create" && "xl:flex-row"
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
        {type === "create" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="doctor_id"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Object.entries(groupedDoctors).map(
                ([specialization, doctors]) => {
                  // const isOpen =
                  //   form.watch("openSpecialization") === specialization;
                  const isOpen = openSpecialization === specialization;
                  return (
                    <div key={specialization} className="w-full">
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setOpenSpecialization(isOpen ? "" : specialization);
                        }}
                        className="flex w-full items-center justify-between px-3 py-2 hover:bg-accent rounded-md cursor-pointer mb-1"
                      >
                        <h1 className="text-gray-400 font-medium capitalize">
                          {specialization}
                        </h1>

                        <h1 className="text-gray-400 text-xs">
                          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </h1>
                      </div>

                      {isOpen && (
                        <div className="pl-4 py-1 flex flex-col gap-1">
                          {doctors.map((doctor) => (
                            <SelectItem
                              key={doctor.id}
                              value={doctor.id.toString()}
                              className="flex flex-row w-full items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md transition"
                            >
                              <div className="flex gap-2">
                                <Image
                                  src={doctor.img_url.replace(
                                    "http://",
                                    "https://"
                                  )}
                                  width={28}
                                  height={28}
                                  alt="doctor"
                                  className="rounded-full border border-gray-300"
                                />
                                <div className="text-sm">
                                  {doctor.first_name} {doctor.last_name}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </CustomFormField>
            <div>
              {/* <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="doctor_id"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Object.entries(groupedDoctors).map(
                ([specialization, doctors]) => (
                  <SelectGroup key={specialization}>
                    <SelectLabel className="text-gray-500 font-medium capitalize">
                      {specialization}
                    </SelectLabel>

                    {doctors.map((doctor) => (
                      <SelectItem
                        key={doctor.id}
                        value={doctor.id.toString()}
                        className="flex items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md transition"
                      >
                        <Image
                          src={doctor.img_url.replace("http://", "https://")}
                          width={28}
                          height={28}
                          alt="doctor"
                          className="rounded-full border border-gray-300"
                        />
                        <span className="text-sm">
                          {doctor.first_name} {doctor.last_name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )
              )}
            </CustomFormField> */}

              {/* <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="doctor_id"
              label="Doctor"
              placeholder="Select a doctor"
            >
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(groupedDoctors).map(
                  ([specialization, doctors]) => (
                    <AccordionItem key={specialization} value={specialization}>
                      <AccordionTrigger className="text-sm font-medium xl:px-5 capitalize hover:no-underline">
                        {specialization}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2 xl:px-5">
                          {doctors.map((doctor) => (
                            <div
                              key={doctor.id}
                              onClick={() =>
                                form.setValue("doctor_id", doctor.id.toString())
                              }
                              className="flex items-center gap-2 cursor-pointer hover:bg-accent p-2 rounded-md transition"
                            >
                              <Image
                                src={doctor.img_url.replace(
                                  "http://",
                                  "https://"
                                )}
                                width={32}
                                height={32}
                                alt="doctor"
                                className="rounded-full border border-gray-300"
                              />
                              <p className="text-sm">{`${doctor.first_name} ${doctor.last_name}`}</p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
              </Accordion>
            </CustomFormField> */}
            </div>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="expected_appointment_date"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />
            {/* <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="confirmed_appointment_datetime"
              label="Confirmed appointment datetime"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            /> */}
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
