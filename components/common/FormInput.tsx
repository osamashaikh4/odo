import React from "react";
import { Input, InputProps } from "@heroui/react";
import { cn } from "@/helpers";

const FormInput = (props: InputProps) => {
  return (
    <Input
      {...props}
      classNames={{
        ...props.classNames,
        inputWrapper: cn(
          "rounded border-small",
          props.classNames?.inputWrapper ?? ""
        ),
      }}
      variant="bordered"
    />
  );
};

export default FormInput;
