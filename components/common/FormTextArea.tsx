import { cn } from "@/helpers";
import { Textarea, TextAreaProps } from "@heroui/react";
import React from "react";

const FormTextArea = (props: TextAreaProps) => {
  return (
    <Textarea
      {...props}
      classNames={{
        ...props.classNames,
        inputWrapper: cn(
          "rounded border-small shadow-none border-borderGrey border-1 bg-white group-data-[focus=true]:border-default-400",
          props.classNames?.inputWrapper ?? ""
        ),
      }}
      variant="bordered"
    />
  );
};

export default FormTextArea;
