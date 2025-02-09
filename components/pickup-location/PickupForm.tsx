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
  useDistrictsQuery,
  useStatesQuery,
} from "@/services/queries/common";
import {
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  Warehouse,
} from "@/services/queries/warehouse";
import { useQueryClient } from "@tanstack/react-query";
import FormInput from "../common/FormInput";

interface PickupFormProps {
  warehouse?: Warehouse;
}

const PickupForm = ({ warehouse }: PickupFormProps) => {
  const queryClient = useQueryClient();
  const [state, setState] = useState(warehouse?.warehouseState ?? "");
  const [city, setCity] = useState(warehouse?.warehouseCity ?? "");
  const [country, setCountry] = useState("SA");
  const [district, setDistrict] = useState(warehouse?.warehouseDistrict ?? "");
  const [senderPhone, setSenderPhone] = useState(warehouse?.senderPhone);

  const { data: countries = [] } = useCountriesQuery();
  const { data: states = [] } = useStatesQuery();
  const { data: cities = [] } = useCitiesQuery(state);
  const { data: districts = [] } = useDistrictsQuery(city, {
    enabled: Boolean(city),
  });

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["warehouse"] });
  };

  const createWarehouse = useCreateWarehouseMutation({
    onSuccess,
  });

  const updateWarehouse = useUpdateWarehouseMutation({
    onSuccess,
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = Object.fromEntries(new FormData(e.currentTarget));

    values.senderCountry = country;
    values.warehouseState = state;

    if (values.warehouseZipCode) {
      values.warehouseZipCode = parseInt(values.warehouseZipCode as any) as any;
    }

    if (warehouse?.warehouseID) {
      values.warehouseID = warehouse.warehouseID;
      updateWarehouse.mutate(values);
    } else {
      createWarehouse.mutate(values);
    }
  };

  return (
    <Form
      className="w-full h-full"
      onSubmit={onSubmit}
      validationBehavior="native"
    >
      <div className="flex items-center justify-between -mt-10 mb-10 mx-auto max-w-[58rem] min-w-[58rem] rounded-b border-b border-gray-200 border-r border-l px-4 py-2.5 gap-4">
        <p className="text-lg font-semibold">Pickup Location</p>
        <Button
          isLoading={createWarehouse.isPending || updateWarehouse.isPending}
          radius="sm"
          color="primary"
          type="submit"
        >
          Save
        </Button>
      </div>
      <div
        className="overflow-auto w-full gap-6 border border-gray-200 rounded flex flex-col p-8 max-h-full mx-auto max-w-[58rem] min-w-[58rem]"
        style={{ height: "calc(100% - 2rem)" }}
      >
        <FormInput
          size="md"
          className="w-[42rem] mx-auto"
          label="Pickup Location Name"
          radius="sm"
          isRequired
          defaultValue={warehouse?.warehouseName}
          name="warehouseName"
          labelPlacement="outside"
          placeholder=" "
        />
        <FormInput
          size="md"
          className="w-[42rem] mx-auto"
          label="Sender Name"
          radius="sm"
          isRequired
          defaultValue={warehouse?.senderName}
          name="senderName"
          labelPlacement="outside"
          placeholder=" "
        />
        <FormInput
          size="md"
          type="email"
          className="w-[42rem] mx-auto"
          label="Email"
          radius="sm"
          defaultValue={warehouse?.senderEmail}
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
            className="intl-phone-input px-3 py-1.5 border-small border-default-200 shadow-sm rounded-[5px]"
            limitMaxLength={true}
            value={senderPhone}
            onChange={(e: any) => setSenderPhone(e)}
          />
          <FormInput
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
          selectedKey={country}
          onSelectionChange={(k) => {
            setCountry(k as any);
            setState("");
            setCity("");
            setDistrict("");
          }}
          variant="bordered"
          inputProps={{ classNames: { inputWrapper: "border-small rounded" } }}
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
        <FormInput
          size="md"
          className="w-[42rem] mx-auto"
          label="Full Address Line"
          radius="sm"
          isRequired
          defaultValue={warehouse?.warehouseAddress}
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
          variant="bordered"
          inputProps={{ classNames: { inputWrapper: "border-small rounded" } }}
          selectedKey={state}
          onSelectionChange={(k) => {
            setCity("");
            setState(k as any);
          }}
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
          selectedKey={city}
          onSelectionChange={(k) => {
            setCity(k as any);
            setDistrict("");
          }}
          variant="bordered"
          inputProps={{ classNames: { inputWrapper: "border-small rounded" } }}
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
          defaultItems={districts.map((district) => ({
            label: district.name,
            value: district.name,
          }))}
          selectedKey={district}
          onSelectionChange={(k) => {
            setDistrict(k as any);
          }}
          variant="bordered"
          inputProps={{ classNames: { inputWrapper: "border-small rounded" } }}
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
        <FormInput
          size="md"
          className="w-[42rem] mx-auto"
          label="Street Name"
          radius="sm"
          name="warehouseStreetName"
          defaultValue={warehouse?.warehouseStreetName}
          labelPlacement="outside"
          placeholder=" "
        />
        <FormInput
          size="md"
          className="w-[42rem] mx-auto"
          label="Building No/Name"
          radius="sm"
          name="warehouseBuilding"
          labelPlacement="outside"
          defaultValue={warehouse?.warehouseBuilding}
          placeholder=" "
        />
        <FormInput
          size="md"
          className="w-[42rem] mx-auto"
          label="ZIP Code"
          radius="sm"
          defaultValue={
            warehouse?.warehouseZipCode
              ? warehouse?.warehouseZipCode.toString()
              : ""
          }
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
  );
};

export default PickupForm;
