import React, { useState } from "react";
import FormInput from "./FormInput";
import { Button, InputProps } from "@heroui/react";
import { isNumber } from "@/helpers";
import { BsPlus } from "react-icons/bs";
import { FiMinus } from "react-icons/fi";

const QuantityInput = ({ isDisabled, ...props }: InputProps) => {
  const [value, setValue] = useState<any>(props.defaultValue);
  return (
    <div className="flex w-32">
      <Button
        isDisabled={isDisabled}
        variant="bordered"
        radius="sm"
        onPress={() => {
          let fin;
          if (value === undefined || value === "" || value <= 0) {
            fin = 0;
          } else {
            fin = value - 1;
          }
          setValue(fin);
          if (props.onChange)
            props.onChange({ target: { value: fin, name: props.name } } as any);
        }}
        className="border-small min-w-4 px-3 rounded-tr-none border-r-0 rounded-br-none"
      >
        <FiMinus fontSize="2rem" />
      </Button>
      <FormInput
        {...props}
        isDisabled={isDisabled}
        value={value}
        onChange={(e) => {
          if (props.onChange) props.onChange(e);
          setValue(e.target.value);
        }}
        onKeyPress={isNumber}
        classNames={{ inputWrapper: "px-0 rounded-none", input: "text-center" }}
      />
      <Button
        isDisabled={isDisabled}
        variant="bordered"
        radius="sm"
        onPress={() => {
          let fin;
          if (value === undefined || value === "") {
            fin = 0;
          } else {
            fin = Number(value) + 1;
          }
          setValue(fin);
          if (props.onChange)
            props.onChange({ target: { value: fin, name: props.name } } as any);
        }}
        className="border-small min-w-4 px-3 rounded-tl-none border-l-0 rounded-bl-none"
      >
        <BsPlus fontSize="2rem" />
      </Button>
    </div>
  );
};

export default QuantityInput;
