import React from "react";
import { Input, InputProps } from "@heroui/react";
import { cn } from "@/helpers";

const FormInput = (props: InputProps) => {
  return (
    <Input
      size="md"
      radius="sm"
      variant="bordered"
      {...props}
      classNames={{
        ...props.classNames,
        inputWrapper: cn(
          "rounded border-small shadow-none border-borderGrey border-1 bg-white group-data-[focus=true]:border-default-400",
          props.classNames?.inputWrapper ?? ""
        ),
      }}
    />
  );
};

export default FormInput;
