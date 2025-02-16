import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteItemProps,
  AutocompleteProps,
} from "@heroui/react";
import { cn } from "@/helpers";

const FormAutoComplete = ({
  options,
  name,
  selectedKey,
  render,
  ...props
}: Omit<AutocompleteProps, "children"> & {
  render?: (item: any) => React.ReactNode;
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
              "rounded border-small shadow-none border-borderGrey border-1 bg-white group-data-[focus=true]:border-default-400",
              props.inputProps?.classNames?.inputWrapper ?? ""
            ),
          },
        }}
      >
        {(item: any) => (
          <AutocompleteItem key={item.value} textValue={item.label}>
            {typeof render === "function" ? render(item) : item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <input type="hidden" name={name} value={selectedKey as any} />
    </div>
  );
};

export default FormAutoComplete;
