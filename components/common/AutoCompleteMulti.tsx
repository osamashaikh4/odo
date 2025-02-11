"use client";
import { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { cn } from "@/helpers";
import { GoX } from "react-icons/go";
import FormInput from "./FormInput";
import Search from "./Search";

interface AutoCompleteMultiProps {
  items: { label: string; value: string }[];
  selectedKeys: string[];
  onSelectionChange: (selectedKeys: string[]) => void;
}

const AutoCompleteMulti = ({
  items = [],
  selectedKeys = [],
  onSelectionChange = () => null,
  ...props
}: AutoCompleteMultiProps) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selection.length === 0 && selectedKeys.length > 0)
      setSelection(selectedKeys);
  }, [selectedKeys]);

  const handleRemoveItem = (id: string) =>
    setSelection(selection.filter((i) => i !== id));

  const handleSelectItem = (id: any) => {
    if (!id) return;
    if (!selection.includes(id)) {
      setSelection([...selection, id]);
    } else {
      handleRemoveItem(id);
    }
    setInputValue("");
  };

  const filteredItems = inputValue
    ? items.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    : items;

  return (
    <Popover
      isOpen={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onSelectionChange(selection);
        }
        setOpen(isOpen);
      }}
      offset={20}
      radius="sm"
      className="-mt-2 w-[225px]"
      placement="bottom-start"
    >
      <PopoverTrigger>
        <FormInput
          radius="sm"
          size="sm"
          classNames={{
            input:
              "cursor-pointer h-full pl-2 !pr-0 w-[86%] overflow-hidden text-ellipsis whitespace-nowrap",
            inputWrapper: "!p-0",
          }}
          placeholder="Select"
          isReadOnly
          value={selectedKeys
            .map((s) => items.find((item) => item.value == s)?.label ?? s)
            .join(", ")}
          endContent={
            <div className="flex items-center gap-1">
              <Button
                variant="light"
                isIconOnly
                size="sm"
                className={cn(
                  "p-0 rounded-full opacity-0 group-data-[hover=true]:opacity-100 data-[hover=true]:bg-default/40",
                  {
                    hidden: !selectedKeys.length,
                  }
                )}
                style={{
                  minHeight: "unset",
                  minWidth: "unset",
                  width: "unset",
                  height: "unset",
                }}
                onPress={() => {
                  setSelection([]);
                  onSelectionChange([]);
                }}
              >
                <GoX className="size-5" />
              </Button>
            </div>
          }
        />
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <div className="p-2 w-full">
          <Search
            placeholder="Search"
            autoFocus
            size="sm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <Listbox variant="flat" className="pt-1 pb-2">
          {filteredItems.map((item) => (
            <ListboxItem
              key={item.value}
              textValue={item.label}
              startContent={
                <Checkbox
                  isSelected={selection.includes(item.value)}
                  onChange={() => handleSelectItem(item.value)}
                />
              }
            >
              {item.label}
            </ListboxItem>
          ))}
        </Listbox>
      </PopoverContent>
    </Popover>

    // <Autocomplete
    //   radius="sm"
    //   size="sm"
    //   menuTrigger="manual"
    //   onClose={() => {
    //     onSelectionChange(selection);
    //   }}
    //   popoverProps={{
    //     radius: "sm",
    //     className: "w-[225px]",
    //   }}
    //   listboxProps={{ variant: "flat" }}
    //   ref={inputRef}
    //   classNames={{
    //     base: "overflow-hidden",
    //     endContentWrapper: "absolute top-[0.4px] right-3",
    //   }}
    //   onFocus={() => {

    //   }}
    //   startContent={
    //     <span
    //       onClick={() => {}}
    //       className="block overflow-hidden whitespace-nowrap text-ellipsis"
    //       style={{ width: "calc(100% + 300px)" }}
    //     >
    //       {selectedKeys
    //         .map((s) => items.find((item) => item.value == s)?.label ?? s)
    //         .join(", ")}
    //     </span>
    //   }
    //   endContent={
    //     <Button
    //       variant="light"
    //       isIconOnly
    //       size="sm"
    //       className={cn(
    //         "p-0 rounded-full opacity-0 group-data-[hover=true]:opacity-100 data-[hover=true]:bg-default/40",
    //         {
    //           hidden: !selectedKeys.length,
    //         }
    //       )}
    //       style={{
    //         minHeight: "unset",
    //         minWidth: "unset",
    //         width: "unset",
    //         height: "unset",
    //       }}
    //       onPress={() => setSelection([])}
    //     >
    //       <GoX className="size-4" />
    //     </Button>
    //   }
    //   selectedKey={null}
    //   isClearable={false}
    //   // onSelectionChange={handleSelectItem}
    //   inputValue={inputValue}
    //   onInputChange={setInputValue}
    //   inputProps={{
    //     classNames: {
    //       label:
    //         "mt-2.5 group-data-[filled-within=true]:translate-y-0 group-data-[filled-within=true]:mt-0",
    //       inputWrapper: cn(" block", {
    //         "min-h-8": selectedKeys.length === 0,
    //         "h-auto": selectedKeys.length > 0,
    //       }),
    //     },
    //   }}
    //   {...props}
    // >
    //   <>
    //     <AutocompleteItem>
    //       <span></span>
    //     </AutocompleteItem>
    //     {filteredItems.map((item) => (
    //       <AutocompleteItem
    //         key={item.value}
    //         textValue={item.label}
    //         startContent={
    //           <Checkbox
    //             isSelected={selection.includes(item.value)}
    //             onChange={(e) => handleSelectItem(item.value)}
    //           />
    //         }
    //       >
    //         {item.label}
    //       </AutocompleteItem>
    //     ))}
    //   </>
    // </Autocomplete>
  );
};

export default AutoCompleteMulti;
