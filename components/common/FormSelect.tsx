import React from "react";
import { Select, SelectItem, SelectProps } from "@heroui/react";
import { cn } from "@/helpers";

const FormSelect = ({
  options,
  ...props
}: Omit<SelectProps, "children"> & {
  options: { label: string; value: string }[];
}) => {
  return (
    <Select
      {...props}
      radius="sm"
      variant="bordered"
      classNames={{
        ...props.classNames,
        trigger: cn(
          "rounded border-small shadow-none border-borderGrey border-1 bg-white group-data-[focus=true]:border-default-400 data-[open=true]:border-default-400 data-[focus=true]:border-default-400",
          props.classNames?.trigger ?? ""
        ),
      }}
    >
      {options.map((option) => (
        <SelectItem key={option.value}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default FormSelect;
