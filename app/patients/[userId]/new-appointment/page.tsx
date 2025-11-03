import { AppointmentForm } from "@/components/forms/AppointmentForm";
import PrivateRoute from "@/components/PrivateRoute";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
const Appointment = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  console.log(userId);
  // const patient = await getPatient(userId);
  // console.log(patient)
  return (
    <PrivateRoute>
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container">
          <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
            />
            <AppointmentForm
              // patientId={patient?.$id}
              userId={userId}
              type="create"
            />
            <p className="copyright py-10">© 2025 CarePluse</p>
          </div>
        </section>
        <Image
          src="/assets/images/appointment-img.png"
          height={1000}
          width={1000}
          alt="appointment"
          className="side-img max-w-[390px]"
        />
      </div>
    </PrivateRoute>
  );
};

export default Appointment;
