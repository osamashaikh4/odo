"use client";
import React, { useState } from "react";
import { Button, Form } from "@heroui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useAppStore } from "@/store/appStore";
import {
  useEmailCheckMutation,
  useRegisterUserMutation,
} from "@/services/queries/user";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FormInput from "../common/FormInput";

const SignupForm = ({ isLoading }: { isLoading: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <FormInput
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
      <FormInput
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
      <Button isLoading={isLoading} type="submit" color="primary" radius="sm">
        Create My Free Account
      </Button>
    </>
  );
};

const AboutForm = ({ isLoading }: { isLoading: boolean }) => {
  const [phone, setPhone] = useState("");
  return (
    <>
      <FormInput
        size="md"
        className="w-full"
        label="First Name"
        radius="sm"
        isRequired
        name="firstName"
        labelPlacement="outside"
        placeholder="First Name"
      />
      <FormInput
        size="md"
        className="w-full"
        label="Last Name"
        radius="sm"
        isRequired
        name="lastName"
        labelPlacement="outside"
        placeholder="Last Name"
      />
      <div>
        <PhoneInputWithCountrySelect
          international
          countryCallingCodeEditable={false}
          defaultCountry="SA"
          className="intl-phone-input px-3 py-1.5 border-small border-default-200 shadow-sm rounded-[5px]"
          limitMaxLength={true}
          value={phone}
          placeholder="Mobile Number *"
          onChange={(e: any) => setPhone(e)}
        />
        <FormInput
          size="md"
          classNames={{
            inputWrapper: "invisible h-0 min-h-0",
            helperWrapper: phone ? "!hidden" : undefined,
          }}
          isRequired
          name="phone"
          value={phone}
        />
      </div>
      <Button isLoading={isLoading} type="submit" color="primary" radius="sm">
        Start Shipping
      </Button>
    </>
  );
};

const RegistrationForm = () => {
  const appStore = useAppStore();
  const [formType, setFormType] = useState("signup");
  const [values, setValues] = useState({});

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

  const emailCheckMutation = useEmailCheckMutation({
    onSuccess: () => {
      setFormType("about");
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  const registerMutation = useRegisterUserMutation({ onSuccess, onError });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: any = Object.fromEntries(
      new FormData(e.currentTarget as any)
    );
    if (formType === "signup") {
      setValues({ ...formData });
      emailCheckMutation.mutate({ email: formData.email });
    } else {
      registerMutation.mutate({ ...values, ...formData });
    }
  };

  return (
    <Form
      className="flex flex-col justify-center items-center"
      onSubmit={onSubmit}
      validationBehavior="native"
    >
      <div className="w-[28rem] sm:w-[36rem] bg-white border border-gray-200 rounded flex flex-col py-8 px-12 gap-6">
        <h3 className="text-3xl font-semibold mb-4">
          {formType === "about"
            ? "Steps away to ship your first order!"
            : "Create your free account now!"}
        </h3>
        {formType === "signup" ? (
          <SignupForm isLoading={emailCheckMutation.isPending} />
        ) : (
          <AboutForm isLoading={registerMutation.isPending} />
        )}
      </div>
    </Form>
  );
};

export default RegistrationForm;
