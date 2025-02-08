"use client";
import React, { useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Form,
  Input,
} from "@heroui/react";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  useCitiesQuery,
  useCountriesQuery,
  useStatesQuery,
} from "@/services/queries/common";

const PickupLocation = () => {
  const [senderPhone, setSenderPhone] = useState("");

  const { data: countries = [] } = useCountriesQuery();
  const { data: states = [] } = useStatesQuery();
  const { data: cities = [] } = useCitiesQuery();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    console.log(data);
  };

  return (
    <div className="p-10 flex flex-col h-full overflow-x-auto overflow-y-hidden">
      <Form
        className="w-full h-full"
        onSubmit={onSubmit}
        validationBehavior="native"
      >
        <div className="flex items-center justify-between -mt-10 mb-10 mx-auto max-w-[58rem] min-w-[58rem] rounded-b border-b border-gray-200 border-r border-l px-4 py-2.5 gap-4">
          <p className="text-lg font-semibold">Pickup Location</p>
          <Button radius="sm" color="primary" type="submit">
            Save
          </Button>
        </div>
        <div
          className="overflow-auto w-full gap-6 border border-gray-200 rounded flex flex-col p-8 max-h-full mx-auto max-w-[58rem] min-w-[58rem]"
          style={{ height: "calc(100% - 2rem)" }}
        >
          <Input
            size="md"
            className="w-[42rem] mx-auto"
            label="Pickup Location Name"
            radius="sm"
            isRequired
            name="warehouseName"
            labelPlacement="outside"
            placeholder=" "
          />
          <Input
            size="md"
            className="w-[42rem] mx-auto"
            label="Sender Name"
            radius="sm"
            isRequired
            name="senderName"
            labelPlacement="outside"
            placeholder=" "
          />
          <Input
            size="md"
            type="email"
            className="w-[42rem] mx-auto"
            label="Email"
            radius="sm"
            isRequired
            name="senderEmail"
            labelPlacement="outside"
            placeholder=" "
          />
          <div className="w-[42rem] mx-auto mt-1">
            <label className="pointer-events-none origin-top-left flex-shrink-0 rtl:origin-top-right subpixel-antialiased block text-black after:content-['*'] after:text-danger after:ms-0.5 will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-foreground group-data-[filled-within=true]:pointer-events-auto pb-0 z-20 top-1/2 -translate-y-1/2 group-data-[filled-within=true]:start-0 start-3 end-auto text-small group-data-[filled-within=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_20px)] pe-2 max-w-full text-ellipsis overflow-hidden">
              Mobile Number
            </label>
            <PhoneInputWithCountrySelect
              international
              countryCallingCodeEditable={false}
              defaultCountry="SA"
              className="intl-phone-input p-3 bg-default-100 rounded-[5px]"
              limitMaxLength={true}
              value={senderPhone}
              onChange={(e: any) => setSenderPhone(e)}
            />
            <Input
              size="md"
              classNames={{
                inputWrapper: "invisible h-0 min-h-0",
                helperWrapper: senderPhone ? "!hidden" : undefined,
              }}
              isRequired
              name="senderPhone"
              value={senderPhone}
            />
          </div>
          <Autocomplete
            className="w-[42rem] mx-auto"
            defaultItems={countries.map((country) => ({
              label: country.countryName,
              value: country.countryCode,
            }))}
            label="Country"
            isRequired
            isDisabled
            defaultSelectedKey="SA"
            labelPlacement="outside"
            name="senderCountry"
            size="md"
            radius="sm"
            placeholder=" "
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <Input
            size="md"
            className="w-[42rem] mx-auto"
            label="Full Address Line"
            radius="sm"
            isRequired
            name="warehouseAddress"
            labelPlacement="outside"
            placeholder=" "
          />
          <Autocomplete
            className="w-[42rem] mx-auto"
            defaultItems={states.map((state) => ({
              label: state.stateName,
              value: state.stateCode,
            }))}
            label="State/Region"
            isRequired
            labelPlacement="outside"
            name="warehouseState"
            size="md"
            radius="sm"
            placeholder="State"
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <Autocomplete
            className="w-[42rem] mx-auto"
            defaultItems={cities.map((city) => ({
              label: city.cityName,
              value: city.cityName,
            }))}
            label="City"
            isRequired
            labelPlacement="outside"
            name="warehouseCity"
            size="md"
            radius="sm"
            placeholder="City"
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <Autocomplete
            className="w-[42rem] mx-auto"
            defaultItems={[{ label: "!", value: "1" }]}
            label="District"
            labelPlacement="outside"
            name="warehouseDistrict"
            size="md"
            radius="sm"
            placeholder="-"
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <Input
            size="md"
            className="w-[42rem] mx-auto"
            label="Street Name"
            radius="sm"
            name="warehouseStreetName"
            labelPlacement="outside"
            placeholder=" "
          />
          <Input
            size="md"
            className="w-[42rem] mx-auto"
            label="Building No/Name"
            radius="sm"
            name="warehouseBuilding"
            labelPlacement="outside"
            placeholder=" "
          />
          <Input
            size="md"
            className="w-[42rem] mx-auto"
            label="ZIP Code"
            radius="sm"
            name="warehouseZipCode"
            labelPlacement="outside"
            placeholder=" "
            onKeyPress={(e) => {
              if (!/([0-9])/g.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>
      </Form>
    </div>
  );
};

export default PickupLocation;
