"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/store/slices/User/createUserSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getUser } from "@/store/slices/User/getUserSlice";
import Link from "next/link";
import PassKeyModal from "../PassKeyModal";
// import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datepicker",
  SELECT = "select",
  SKELETION = "skeleton",
  PASSWORD = "password",
}

const PatientForm = () => {
  const dispatch = useDispatch<AppDispatch>();
const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    // console.log("yyhhtyety")
    try {
      const user = {
        email: values.email,
        password: values.password,
      };
      // console.log(user);
      const newUser = await dispatch(createUser(user));
      const getuser = await dispatch(getUser());
      // console.log(getuser.payload.user_id, "getuser.payload.user_id");
      // const newUser = await createUser(user);
      console.log(getuser.payload.is_admin);
      // console.log(newUser,"jgfkjhgk")
      if (newUser && !getuser.payload.is_admin) {
        // router.push(`/patients/${getuser.payload.user_id}/register`);
        router.push(`/patients/${getuser.payload.user_id}/new-appointment`);
      }
if (getuser.payload.is_admin) {
  setShowModal(true);
}

    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };
  return (
    <>
    {showModal && <PassKeyModal />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Get started with appointments.</p>
          </section>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name={"email"}
            label="Email"
            placeholder="Mahmoud@mohamed.ed"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PASSWORD}
            name={"password"}
            label="Password"
            placeholder="123ABC"
            iconSrc="/assets/icons/password-svgrepo-com.svg"
            iconAlt="user"
          />
          {/* <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name={"phone"}
          label="Phone number"
          placeholder="(555) 123-4567"
        /> */}
          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
        <p className="flex justify-center text-[12px] mt-3">
          Don’t have an account yet?{" "}
          <Link
            href="/patients/register"
            className="ml-2 text-[#24ae7c] hover:underline-offset-1"
          >
            Register
          </Link>
        </p>
      </Form>
      
    </>
  );
};

export default PatientForm;
