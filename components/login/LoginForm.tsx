"use client";
import React from "react";
import { Button, Form, Input } from "@heroui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const LoginForm = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
  };

  return (
    <Form
      className="flex flex-col justify-center items-center"
      onSubmit={onSubmit}
      validationBehavior="native"
    >
      <div className="w-[28rem] sm:w-[34rem] bg-white border border-gray-200 rounded flex flex-col py-8 px-12 gap-6">
        <h3 className="text-3xl font-bold mb-4">Welcome back!</h3>
        <Input
          size="md"
          className="w-full"
          label="Email"
          type="email"
          radius="sm"
          isRequired
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
          radius="sm"
          type={isVisible ? "text" : "password"}
        />
        <Button type="submit" color="primary" radius="sm">
          Log in to my account
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
