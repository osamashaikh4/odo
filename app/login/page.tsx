import LoginForm from "@/components/login/LoginForm";
import { Button, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="p-12 flex flex-col justify-between w-full h-full bg-[#F5F7F9]">
      <div>
        <Image
          className="absolute -top-[73px] -left-[34px]"
          src="/assets/images/odo-logo.png"
          alt="odo-logo"
          width={250}
          height={250}
        />
      </div>
      <div className="w-full justify-center items-center flex flex-col">
        <LoginForm />
        <div className="mx-auto p-8 flex items-center">
          <span className="text-base">New here?</span>{" "}
          <Link href="/register">
            <Button
              variant="light"
              color="primary"
              className="underline p-2"
              radius="sm"
            >
              Create a free account
            </Button>
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
}
