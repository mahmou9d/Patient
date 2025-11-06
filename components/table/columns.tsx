"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { AppointmentModal } from "../AppointmentModal";
import { StatusBadge } from "../StatusBadge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { getdoctors } from "@/store/slices/Patient/getdoctorsSlice";

export const useAppointmentColumns = () => {
  const dispatch = useAppDispatch();
  const { Doctors } = useAppSelector((state) => state.getdoctors);

  useEffect(() => {
    dispatch(getdoctors());
  }, [dispatch]);

  const columns: ColumnDef<Appointment>[] = [
    {
      header: "#",
      cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
    },
    {
      accessorKey: "patient",
      header: "Patient",
      cell: ({ row }) => {
        const appointment = row.original;
        return (
          <p className="text-14-medium">
            {`${appointment.patient?.first_name ?? ""} ${
              appointment.patient?.last_name ?? ""
            }`}
          </p>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const appointment = row.original;
        console.log(appointment,"stut")
        
        return (
          <div className="min-w-[115px]">
            <StatusBadge status={appointment.status}  />
          </div>
        );
      },
    },
    {
      accessorKey: "schedule",
      header: "Appointment",
      cell: ({ row }) => {
        const appointment = row.original;
        return (
          <p className="text-14-regular min-w-[100px]">
            {formatDateTime(
              appointment?.confirmed_appointment_datetime as string
            ).dateTime === "Jan 1, 1970, 2:00 AM"
              ? formatDateTime(
                  appointment?.expected_appointment_date
                ).dateTime
              : formatDateTime(
                  appointment?.confirmed_appointment_datetime as string
                ).dateTime}
          </p>
        );
      },
    },
    {
      accessorKey: "primaryPhysician",
      header: "Doctor",
      cell: ({ row }) => {
        const appointment = row.original;
        const doctorId =
          appointment.doctor && (appointment.doctor as any).id
            ? String((appointment.doctor as any).id)
            : appointment.doctor_id
            ? String(appointment.doctor_id)
            : undefined;

        const doctor = (Doctors || []).find(
          (doc) => String(doc.id) === doctorId
        );

        return (
          <div className="flex items-center gap-3">
            <Image
              src={(doctor?.img_url || "/assets/images/dr-sharma.png").replace(
                "http://",
                "https://"
              )}
              alt="doctor"
              width={100}
              height={100}
              className="size-8"
            />
            <p className="whitespace-nowrap">
              Dr.{" "}
              {doctor ? `${doctor.first_name} ${doctor.last_name}` : "Unknown"}
            </p>
          </div>
        );
      },
    },
//     {
//       id: "actions",
//       header: () => <div className="pl-4">Actions</div>,
//       cell: ({ row }) => {
//         const appointment = row.original;
// console.log(row.original, "row");
//         return (
//           <div className="flex gap-2 pt-[2px]">
//                   <AppointmentModal
//                     patientId={String(appointment.patient?.id ?? "")}
//                     userId={String(appointment.id)}
//                     appointment={appointment}
//                     type="schedule"
//                     title="Schedule Appointment"
//                     description="Please confirm the following details to schedule."
//                   />

//                   <AppointmentModal
//                     patientId={String(appointment.patient?.id ?? "")}
//                     userId={String(appointment.id)}
//                     appointment={appointment}
//                     type="cancel"
//                     title="Cancel Appointment"
//                     description="Are you sure you want to cancel this appointment?"
//                   />
                
//           </div>
//         );
//       },
//     },
  ];

  return columns;
};
