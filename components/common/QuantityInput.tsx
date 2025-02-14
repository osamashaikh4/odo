import React, { useState } from "react";
import FormInput from "./FormInput";
import { Button, InputProps } from "@heroui/react";
import { isNumber } from "@/helpers";
import { BsPlus } from "react-icons/bs";
import { FiMinus } from "react-icons/fi";

const QuantityInput = (props: InputProps) => {
  const [value, setValue] = useState<any>(props.defaultValue);
  return (
    <div className="flex w-32">
      <Button
        variant="bordered"
        radius="sm"
        onPress={() => {
          if (value === undefined || value === "" || value <= 0) {
            setValue(0);
          } else {
            setValue(value - 1);
          }
        }}
        className="border-small min-w-4 px-3 rounded-tr-none border-r-0 rounded-br-none"
      >
        <FiMinus fontSize="2rem" />
      </Button>
      <FormInput
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={isNumber}
        classNames={{ inputWrapper: "px-0 rounded-none", input: "text-center" }}
      />
      <Button
        variant="bordered"
        radius="sm"
        onPress={() => {
          if (value === undefined || value === "") {
            setValue(0);
          } else {
            setValue(value + 1);
          }
        }}
        className="border-small min-w-4 px-3 rounded-tl-none border-l-0 rounded-bl-none"
      >
        <BsPlus fontSize="2rem" />
      </Button>
    </div>
  );
};

export default QuantityInput;
