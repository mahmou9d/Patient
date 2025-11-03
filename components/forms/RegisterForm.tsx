"use client";
import { Form, FormControl } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import {
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "@/components/FileUploader";
import {
  PatientFormValidation,
  RegisterUserValidation,
} from "@/lib/validation";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { registerPatient } from "@/store/slices/Patient/registerPatientSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getdoctors } from "@/store/slices/Patient/getdoctorsSlice";
import Link from "next/link";
import { getUser } from "@/store/slices/User/getUserSlice";
import { useToast } from "@/hooks/use-toast";

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

const RegisterForm = ({ user }: { user: number }) => {
  const { Doctors } = useAppSelector((state: RootState) => state.getdoctors);
  const { is_admin } = useAppSelector((state: RootState) => state.getUser);
  const dispatch = useAppDispatch();
const { toast } = useToast();

  useEffect(() => {
    // console.log("🟢 Dispatching getdoctors...");
    dispatch(getUser());
    dispatch(getdoctors());
  }, [dispatch]);
  // const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof RegisterUserValidation>>({
    resolver: zodResolver(RegisterUserValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      // name: user.name,
      // email: user.email,
      // phone: user.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterUserValidation>) => {
    // console.log("Submitting...", values);
    setIsLoading(true);

    // Store file info in form data as
    // let formData;
    // if (
    //   values.identificationDocument &&
    //   values.identificationDocument?.length > 0
    // ) {
    //   const blobFile = new Blob([values.identificationDocument[0]], {
    //     type: values.identificationDocument[0].type,
    //   });

    //   formData = new FormData();
    //   formData.append("blobFile", blobFile);
    //   formData.append("fileName", values.identificationDocument[0].name);
    // }

    try {
      // const patient = {
      //   userId: user.$id,
      //   name: values.name,
      //   email: values.email,
      //   phone: values.phone,
      //   birthDate: new Date(values.birthDate),
      //   gender: values.gender,
      //   address: values.address,
      //   occupation: values.occupation,
      //   emergencyContactName: values.emergencyContactName,
      //   emergencyContactNumber: values.emergencyContactNumber,
      //   primaryPhysician: values.primaryPhysician,
      //   insuranceProvider: values.insuranceProvider,
      //   insurancePolicyNumber: values.insurancePolicyNumber,
      //   allergies: values.allergies,
      //   currentMedication: values.currentMedication,
      //   familyMedicalHistory: values.familyMedicalHistory,
      //   pastMedicalHistory: values.pastMedicalHistory,
      //   identificationType: values.identificationType,
      //   identificationNumber: values.identificationNumber,
      //   identificationDocument: values.identificationDocument
      //     ? formData
      //     : undefined,
      //   privacyConsent: values.privacyConsent,
      // };
      const registerUser: RegisterUser = {
        username: values.username || "",
        email: values.email,
        password: values.password || "",
        first_name: values.first_name || "",
        last_name: values.last_name || "",
        phone_number: values.phone_number,
        date_of_birth: new Date(values.date_of_birth)
          .toISOString()
          .split("T")[0],
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergency_contact_name: values.emergency_contact_name,
        emergency_contact_phone: values.emergency_contact_phone,
        profile: {
          insurance_provider: values.profile.insurance_provider,
          insurance_policy_number: values.profile.insurance_policy_number,
          allergies: values.profile.allergies,
          current_medications: values.profile.current_medications,
          family_medical_history: values.profile.family_medical_history,
          past_medical_history: values.profile.past_medical_history,
        },
      };
      // console.log(registerUser)
      const newPatient = await dispatch(registerPatient(registerUser));
      // const newPatient = await registerPatient(registerUser);
      // console.log(newPatient);
      if (newPatient) {
        router.push(`/patients/${user}/new-appointment`);
         toast({
          title: "✅ Register successfully",
          variant: "success",
         });
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        {/* <pre className="text-red-500 text-xs">
          {JSON.stringify(form.formState.errors, null, 2)}
        </pre> */}

        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
          {is_admin && (
            <Link href={"/admin"} className="text-green-500">
              Admin
            </Link>
          )}
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name={"username"}
            label="Username"
            placeholder="Mahmoud Mohamed"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />{" "}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name={"first_name"}
              label="First Name"
              placeholder="Mahmoud"
              iconSrc=""
              iconAlt="first_name"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name={"last_name"}
              label="Last name"
              placeholder="mohamed"
              iconSrc=""
              iconAlt="last_name"
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
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
            />
          </div>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name={"phone_number"}
            label="Phone number"
            placeholder="(555) 123-4567"
          />
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="date_of_birth"
              label="Date of birth"
            />
            <CustomFormField
              fieldType={FormFieldType.SKELETION}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between "
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div
                        key={option + i}
                        // className="radio-group"
                        className={cn(
                          "radio-group flex items-center gap-2 rounded-md border border-dark-500 px-3 py-1.5 transition-all duration-150",
                          "focus-within:border-[#24ad7b] focus-within:bg-dark-400",
                          "data-[state=checked]:border-[#24ad7b] data-[state=checked]:bg-dark-400"
                        )}
                      >
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="14 street, New york, NY - 5101"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder=" Software Engineer"
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergency_contact_name"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergency_contact_phone"
              label="Emergency contact number"
              placeholder="(555) 123-4567"
            />
          </div>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
          {/* <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.id + i} value={doctor.first_name}>
                <div className="flex cursor-pointer items-center gap-2 ">
                  <Image
                    src={doctor.img_url.replace("http://", "https://")}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{`${doctor.first_name} ${doctor.last_name}`}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField> */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="profile.insurance_provider"
              label="Insurance provider"
              placeholder="BlueCross BlueShield"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="profile.insurance_policy_number"
              label="Insurance policy number"
              placeholder="ABC123456789"
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="profile.allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="profile.current_medications"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="profile.family_medical_history"
              label=" Family medical history (if relevant)"
              placeholder="Mother had brain cancer, Father has hypertension"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="profile.past_medical_history"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verfication</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identification_type"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identification_number"
            label="Identification Number"
            placeholder="123456789"
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETION}
            control={form.control}
            name="identification_document"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatment_consent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosure_consent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacy_consent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          />
        </section>
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
