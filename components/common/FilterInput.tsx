import React, { useCallback } from "react";
import FormInput from "./FormInput";
import { InputProps } from "@heroui/react";
import debounce from "lodash.debounce";

const FilterInput = (props: InputProps) => {
  const handleChange = useCallback(
    debounce((e) => {
      if (props.onChange) props.onChange(e);
    }, 300),
    []
  );

  return <FormInput {...props} onChange={handleChange} />;
};

export default FilterInput;
