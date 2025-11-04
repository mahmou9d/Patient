import RegisterForm from "@/components/forms/RegisterForm";
// import { getUser } from "@/store/slices/User/getUserSlice";
// import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";

const Registration = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  // const user = await getUser();
  // const userid = user.user_id;
  // const patient = await getPatient(userId);
  console.log(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Link href={"/"} >
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          /></Link>
          
          <RegisterForm user={Number(userId)} />
          <p className="copyright py-10">© 2025 CarePluse</p>
        </div>
      </section>
      <Image
        src={"/assets/images/register-img.png"}
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Registration;
