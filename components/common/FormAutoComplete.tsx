import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@heroui/react";
import { cn } from "@/helpers";

const FormAutoComplete = ({
  options,
  name,
  selectedKey,
  ...props
}: Omit<AutocompleteProps, "children"> & {
  options: { label: string; value: string }[];
}) => {
  return (
    <div>
      <Autocomplete
        size="md"
        radius="sm"
        variant="bordered"
        className="w-full"
        {...props}
        defaultItems={options}
        selectedKey={selectedKey}
        inputProps={{
          ...props.inputProps,
          classNames: {
            ...props.inputProps?.classNames,
            inputWrapper: cn(
              "rounded border-small shadow-none border-borderGrey border-1 bg-white",
              props.inputProps?.classNames?.inputWrapper ?? ""
            ),
          },
        }}
      >
        {(item: any) => (
          <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>
      <input type="hidden" name={name} value={selectedKey as any} />
    </div>
  );
};

export default FormAutoComplete;
