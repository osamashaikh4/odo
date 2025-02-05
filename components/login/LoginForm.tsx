"use client";
import React, { useState } from "react";
import { Button, Form, Input } from "@heroui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useAppStore } from "@/store/appStore";
import { useLoginUserMutation } from "@/services/queries/user";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";

const LoginForm = () => {
  const appStore = useAppStore();
  const [isVisible, setIsVisible] = useState(false);

  const onSuccess = (data: any) => {
    if (data.userID) {
      const { accessToken, refreshToken, ...user } = data;
      const today = new Date();
      today.setTime(today.getTime() + 1000 * 24 * 60 * 60 * 1000);
      appStore.update({ user });
      setCookie("odo-access-token", accessToken, { expires: today });
      localStorage.setItem("odo-access-token", accessToken);
      localStorage.setItem("odo-refresh-token", refreshToken);
      window.location.href = "/home";
    }
  };

  const onError = (error: any) => {
    toast.error(error.response.data.error);
  };

  const loginUser = useLoginUserMutation({ onSuccess, onError });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values: any = Object.fromEntries(
      new FormData(e.currentTarget as any)
    );
    loginUser.mutate({ ...values, email: values.email.toLowerCase() });
  };

  return (
    <Form
      className="flex flex-col justify-center items-center"
      onSubmit={onSubmit}
      validationBehavior="native"
    >
      <div className="w-[28rem] sm:w-[36rem] bg-white border border-gray-200 rounded flex flex-col py-8 px-12 gap-6">
        <h3 className="text-3xl font-semibold mb-4">Welcome back!</h3>
        <Input
          size="md"
          className="w-full"
          label="Email"
          type="email"
          radius="sm"
          isRequired
          name="email"
          labelPlacement="outside"
          placeholder="Enter your email"
        />
        <Input
          size="md"
          isRequired
          className="w-full"
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <FaRegEyeSlash className="text-xl text-default-400 pointer-events-none" />
              ) : (
                <FaRegEye className="text-xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          labelPlacement="outside"
          placeholder=" "
          label="Password"
          name="password"
          radius="sm"
          type={isVisible ? "text" : "password"}
        />
        <Button
          isLoading={loginUser.isPending}
          type="submit"
          color="primary"
          radius="sm"
        >
          Log in to my account
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
