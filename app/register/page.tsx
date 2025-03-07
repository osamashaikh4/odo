import RegistrationForm from "@/components/register/RegistrationForm";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="p-12 flex flex-col justify-between w-full h-full bg-[#F5F7F9]">
      <div>
        <img
          className="absolute -top-[55px] -left-[34px]"
          src="/assets/images/black-bolt-logo.jpg"
          alt="black-bolt-logo"
          width={185}
          height={185}
        />
      </div>
      <div className="w-full justify-center items-center flex flex-col">
        <RegistrationForm />
        <div className="mx-auto p-8 flex items-center">
          <span className="text-sm">Already have an account?</span>{" "}
          <Link href="/login">
            <Button
              variant="light"
              color="primary"
              className="underline p-2 hover:!bg-transparent"
              radius="sm"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
}
