import React, { useState } from "react";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import {
  useCitiesQuery,
  useCountriesQuery,
  useDistrictsQuery,
  useStatesQuery,
} from "@/services/queries/common";
import "react-phone-number-input/style.css";
import FormAutoComplete from "../common/FormAutoComplete";
import { Accordion, AccordionItem } from "@heroui/react";
import FormInput from "../common/FormInput";
import { isNumber } from "@/helpers";

interface ReceiverDetailsFormProps {
  isView?: boolean;
  values?: { [key: string]: any };
}

const ReceiverDetailsForm = ({ isView, values }: ReceiverDetailsFormProps) => {
  const [customerPhone, setCustomerPhone] = useState(
    values?.customerPhone ?? ""
  );
  console.log(values);
  const [state, setState] = useState(values?.state ?? "");
  const [city, setCity] = useState(values?.city ?? "");
  const [country, setCountry] = useState(values?.country ?? "SA");
  const [district, setDistrict] = useState(values?.district ?? "");
  const { data: countries = [] } = useCountriesQuery();
  const { data: states = [] } = useStatesQuery();
  const { data: cities = [] } = useCitiesQuery(state);
  const { data: districts = [] } = useDistrictsQuery(city, {
    enabled: Boolean(city),
  });

  return (
    <Accordion
      defaultSelectedKeys={["1", "2"]}
      variant="splitted"
      selectionMode="multiple"
    >
      <AccordionItem
        className="shadow-none rounded border border-gray-200 px-0"
        classNames={{
          trigger: "bg-backgroundGrey px-4 py-3 !outline-none",
          title: "font-medium",
        }}
        key="1"
        aria-label="Receiver Contact Details"
        title="Receiver Contact Details"
      >
        <div className="p-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
          <FormInput
            className="w-full"
            label="First Name"
            isRequired
            isDisabled={isView}
            defaultValue={values?.customerFirstName}
            name="customerFirstName"
            labelPlacement="outside"
            placeholder=" "
          />
          <FormInput
            size="md"
            className="w-full"
            label="Last Name"
            isDisabled={isView}
            defaultValue={values?.customerLastName}
            name="customerLastName"
            labelPlacement="outside"
            placeholder=" "
          />
          <div className="w-full mx-auto mt-1">
            <label className="pointer-events-none origin-top-left flex-shrink-0 rtl:origin-top-right subpixel-antialiased block text-black after:content-['*'] after:text-danger after:ms-0.5 will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-foreground group-data-[filled-within=true]:pointer-events-auto pb-0 z-20 top-1/2 -translate-y-1/2 group-data-[filled-within=true]:start-0 start-3 end-auto text-small group-data-[filled-within=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_20px)] pe-2 max-w-full text-ellipsis overflow-hidden">
              Mobile Number
            </label>
            <PhoneInputWithCountrySelect
              international
              countryCallingCodeEditable={false}
              defaultCountry="SA"
              disabled={isView}
              className="intl-phone-input px-3 py-1.5 border-small border-default-200 rounded-[5px]"
              limitMaxLength={true}
              value={customerPhone}
              onChange={(e: any) => setCustomerPhone(e)}
            />
            <FormInput
              size="md"
              isDisabled={isView}
              classNames={{
                inputWrapper: "invisible h-0 min-h-0",
                helperWrapper: customerPhone ? "!hidden" : undefined,
              }}
              isRequired
              name="customerPhone"
              value={customerPhone}
            />
          </div>
          <FormInput
            className="w-full"
            label="Email"
            isDisabled={isView}
            type="email"
            defaultValue={values?.customerEmail}
            name="customerEmail"
            labelPlacement="outside"
            placeholder=" "
          />
        </div>
      </AccordionItem>
      <AccordionItem
        key="2"
        className="shadow-none rounded border border-gray-200 px-0"
        classNames={{
          trigger: "bg-backgroundGrey px-4 py-3 !outline-none",
          title: "font-medium",
        }}
        aria-label="Receiver Address Details"
        title="Receiver Address Details"
      >
        <div className="p-4 w-full flex flex-col gap-5">
          <FormAutoComplete
            className="w-full"
            options={countries.map((country) => ({
              label: country.countryName,
              value: country.countryCode,
            }))}
            isDisabled={isView}
            label="Country"
            isRequired
            selectedKey={country}
            onSelectionChange={(k) => {
              setCountry(k as any);
              setState("");
              setCity("");
              setDistrict("");
            }}
            defaultSelectedKey="SA"
            labelPlacement="outside"
            name="country"
            placeholder=" "
          />
          <FormInput
            size="md"
            className="w-full"
            label="Full Address Line"
            isRequired
            name="address"
            isDisabled={isView}
            defaultValue={values?.address}
            labelPlacement="outside"
            placeholder=" "
          />
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
            <FormAutoComplete
              className="w-full"
              options={states.map((state) => ({
                label: state.stateName,
                value: state.stateCode,
              }))}
              label="State/Region"
              isRequired
              isDisabled={isView}
              selectedKey={state}
              onSelectionChange={(k) => {
                setCity("");
                setState(k as any);
              }}
              labelPlacement="outside"
              name="state"
              placeholder="State"
            />
            <FormAutoComplete
              className="w-full"
              options={cities.map((city) => ({
                label: city.cityName,
                value: city.cityName,
              }))}
              isDisabled={isView}
              selectedKey={city}
              onSelectionChange={(k) => {
                setCity(k as any);
                setDistrict("");
              }}
              label="City"
              isRequired
              labelPlacement="outside"
              name="city"
              placeholder="City"
            />
            <FormAutoComplete
              className="w-full"
              options={districts.map((district) => ({
                label: district.name,
                value: district.name,
              }))}
              isDisabled={isView}
              selectedKey={district}
              onSelectionChange={(k) => {
                setDistrict(k as any);
              }}
              label="District"
              labelPlacement="outside"
              name="district"
              placeholder="-"
            />
            <FormInput
              size="md"
              className="w-full"
              label="Street Name"
              isDisabled={isView}
              name="streetName"
              defaultValue={values?.streetName}
              labelPlacement="outside"
              placeholder=" "
            />
            <FormInput
              size="md"
              className="w-full"
              label="Building No/Name"
              defaultValue={values?.building}
              name="building"
              isDisabled={isView}
              labelPlacement="outside"
              placeholder=" "
            />
            <FormInput
              size="md"
              className="w-full"
              label="ZIP Code"
              defaultValue={values?.zipCode}
              name="zipCode"
              isDisabled={isView}
              labelPlacement="outside"
              placeholder=" "
              onKeyPress={isNumber}
            />
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default ReceiverDetailsForm;
