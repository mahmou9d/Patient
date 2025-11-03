"use client";

import PrivateRoute from "@/components/PrivateRoute";
import { Button } from "@/components/ui/button";
// import { Doctors } from "@/constants";
// import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllAppointment } from "@/store/slices/Appointment/getAllAppointmentSlice";
import { getAppointment } from "@/store/slices/Appointment/getAppointmentSlice";
import { getdoctors } from "@/store/slices/Patient/getdoctorsSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
// import getAppointment from "../../../../../store/slices/Appointment/getAppointmentSlice";
const Success =  ({
  searchParams,
  params,
}: SearchParamProps) => {
   const { userId } = React.use(params);
   const { appointmentId } = React.use(searchParams);
   console.log(appointmentId, "appointment_Id");
  // const dispatch = useAppDispatch();
  const { Doctors } = useAppSelector((state: RootState) => state.getdoctors);
  // console.log(Doctors, "RootState");
  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log("🟢 Dispatching getdoctors...");
    dispatch(getdoctors());
  }, [dispatch]);
    const {
      appointments:appo,
      loading: allLoading,
      error: allError,
    } = useAppSelector((state) => state.getAllAppointment);
    
    const book =appo[appo.length-1]
    console.log(book, "klgjjkda");
  const appointment_Id = (appointmentId as string) || "";
  const { appointments } = useAppSelector(
    (state: RootState) => state.getAppointment
  );
  console.log(appointments, "RootStateeeeeeeeeeeeeeee");
  // const dispatch = useAppDispatch();
  useEffect(() => {
    // console.log("🟢 Dispatching getdoctors...");
    dispatch(getAllAppointment());
    dispatch(getAppointment(userId));
  }, [dispatch]);
  // const appointment = await dispatch(getAppointment()).unwrap();
  // const appointment = await getAppointment(appointmentId);
  const doctor = Doctors.find(
    (doctor) => doctor.id === appointments?.doctor?.id
  );
console.log(doctor,"gtrt")

  return (
    <PrivateRoute>
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          {/* <Image
            src="/assets/icons/check-mark-circle-svgrepo-com.svg"
            height={230}
            width={230}
            alt="success"
            
          /> */}
          <FaRegCircleCheck className="shadow-green-dual rounded-full h-[100px] w-[100px] text-[#24ae7c]" />
          <h2 className="header mb-6 max-w-[600px] text-center mt-7">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={book?.doctor?.img_url! || "/assets/images/dr-peter.png"}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">
              Dr. {`${book?.doctor?.first_name} ${book?.doctor?.last_name}`}
            </p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>
              {" "}
              {/* {formatDateTime(appointments?.expected_appointment_date!).dateTime} */}
              {
                formatDateTime(
                  book?.expected_appointment_date ?? new Date()
                ).dateTime
              }
            </p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        {/* <p className="copyright">© 2024 CarePluse</p> */}
      </div>
    </div>
    </PrivateRoute>
  );
};

export default Success;
