"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Appointment } from "@/types/appwrite.types";
import { AppointmentForm } from "./forms/AppointmentForm";
import "react-datepicker/dist/react-datepicker.css";

interface AppointmentModalProps {
  patientId: string;
  userId: string;
  appointment?: Appointment;
  type: "schedule" | "cancel";
  title: string;
  description: string;
}

export const AppointmentModal = ({
  patientId,
  userId,
  appointment,
  type,
  title,
  description,
}: AppointmentModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={type === "cancel" ? "destructive" : null}
          className={`capitalize ${
            type === "schedule" ? "bg-green-600 text-white" : ""
          }`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="capitalize">
            {title || `${type} Appointment`}
          </DialogTitle>
          <DialogDescription>
            {description ||
              `Please fill in the following details to ${type} appointment.`}
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          userId={userId}
          type={type}
          appointment={appointment as any}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
