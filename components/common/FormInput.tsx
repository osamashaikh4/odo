import React from "react";
import { Input, InputProps } from "@heroui/react";

const FormInput = (props: InputProps) => {
  return (
    <Input
      classNames={{
        inputWrapper: "rounded border-small",
      }}
      variant="bordered"
      {...props}
    />
  );
};

export default FormInput;
