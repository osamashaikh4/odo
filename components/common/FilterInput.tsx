import React, { useCallback } from "react";
import FormInput from "./FormInput";
import { InputProps } from "@heroui/react";
import debounce from "lodash.debounce";

const FilterInput = ({ filters, ...props }: InputProps & { filters: any }) => {
  const handleChange = useCallback(
    debounce((e) => {
      if (props.onChange) props.onChange(e);
    }, 300),
    [filters]
  );

  return <FormInput {...props} onChange={handleChange} />;
};

export default FilterInput;
