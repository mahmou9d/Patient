"use client";

import StatCard from "@/components/StatCard";
import Image from "next/image";
import Link from "next/link";
// import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { useAppointmentColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { getRecentAppointmentList } from "@/store/slices/Appointment/getRecentAppointmentListSlice";
import { getAllAppointment } from "@/store/slices/Appointment/getAllAppointmentSlice";
import { getdoctors } from "@/store/slices/Patient/getdoctorsSlice";
import { Appointment } from "@/types/appwrite.types";
import { Button } from "@/components/ui/button";
import { AppointmentModal } from "@/components/AppointmentModal";
import { RootState } from "@/store/store";
import { getUser } from "@/store/slices/User/getUserSlice";

const AdminPage = () => {
  const [paginat, setPaginat] = useState(0);
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.getRecent);
  const { user_id } = useAppSelector((state: RootState) => state.getUser);
  console.log(data);
  const {
    appointments,
    loading: allLoading,
    error: allError,
  } = useAppSelector((state) => state.getAllAppointment);
  const { Doctors, loading: docsLoading } = useAppSelector(
    (state) => state.getdoctors
  );

  useEffect(() => {
    dispatch(getRecentAppointmentList());
    dispatch(getAllAppointment());
    dispatch(getdoctors());
    dispatch(getUser());
  }, [dispatch]);
  const book = appointments.slice(paginat, paginat + 10);
  console.log(book, "book");
  const columns = useAppointmentColumns();
  // const appointments = await getRecentAppointmentList();
  // console.log(appointments)
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link
          href={`/patients/${user_id}/new-appointment`}
          className="cursor-pointer"
        >
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <nav className="flex gap-3 items-center">
          <Image
            src="/assets/icons/person.svg"
            height={32}
            width={162}
            alt="person"
            className="h-8 w-fit"
          />
          <p className="text-16-semibold">Admin</p>
        </nav>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
          {/* <AppointmentModal
            patientId="123"
            userId="123"
            type="schedule"
            title="Test Modal"
            description="This is a test modal outside the table"
          /> */}
          <div>
            <Button
              className="shad-primary-btn"
              onClick={() => {
                dispatch(getRecentAppointmentList());
                dispatch(getAllAppointment());
                dispatch(getdoctors());
              }}
            >
              Refresh
            </Button>
          </div>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={Number(
              (data?.total ?? 0) -
                (data?.pending_appointments_count ?? 0) -
                (data?.cancelled_appointments_count ?? 0)
            )}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={Number(data?.pending_appointments_count ?? 0)}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={Number(data?.cancelled_appointments_count ?? 0)}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>
        {/* 
        {(loading || allLoading || docsLoading) && (
          <div className="w-full rounded-md border border-dark-500 bg-dark-400 p-4 text-dark-700">
            Loading admin data...
          </div>
        )}

        {(error || allError) && (
          <div className="w-full rounded-md border border-red-500 bg-red-950/40 p-4 text-red-400">
            {error || allError}
          </div>
        )} */}
        <div className="flex flex-row w-full">
          <DataTable<Appointment, unknown>
            columns={columns}
            data={appointments || []}
            loading={loading || allLoading}
            emptyText={"No appointments found."}
            setPaginat={setPaginat}
            paginat={paginat}
          />
          <div className="rounded-lg border border-dark-400 shadow-lg">
            <p className="bg-dark-200 text-[#a3a3a3] px-[8px] py-2 rounded-lg">
              Actions
            </p>
            <div className="flex flex-col mt-2 gap-[12.5px]">
              {book?.map((appointment: Appointment) => (
                <div key={appointment.id} className="flex gap-2">
                  <AppointmentModal
                    patientId={String(appointment.patient?.id ?? "")}
                    userId={String(appointment.id)}
                    appointment={appointment}
                    type="schedule"
                    title="Schedule Appointment"
                    description="Please confirm the following details to schedule."
                  />

                  <AppointmentModal
                    patientId={String(appointment.patient?.id ?? "")}
                    userId={String(appointment.id)}
                    appointment={appointment}
                    type="cancel"
                    title="Cancel Appointment"
                    description="Are you sure you want to cancel this appointment?"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
