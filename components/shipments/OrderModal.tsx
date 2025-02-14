import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Accordion,
  AccordionItem,
  Form,
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
} from "@heroui/react";
import React, { useEffect, useRef, useState } from "react";
import FormInput from "../common/FormInput";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import {
  useCitiesQuery,
  useCountriesQuery,
  useDistrictsQuery,
  useStatesQuery,
} from "@/services/queries/common";
import "react-phone-number-input/style.css";
import Stepper from "../common/Stepper";
import { BsPlus } from "react-icons/bs";
import { PaymentMethods } from "@/helpers";

interface OrderModalProps {
  onClose: () => void;
}

const ReceiverDetailsForm = () => {
  const [customerPhone, setCustomerPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("SA");
  const [district, setDistrict] = useState("");
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
            size="md"
            className="w-full"
            label="First Name"
            isRequired
            radius="sm"
            name="customerFirstName"
            labelPlacement="outside"
            placeholder=" "
          />
          <FormInput
            size="md"
            className="w-full"
            label="Last Name"
            radius="sm"
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
              className="intl-phone-input px-3 py-1.5 border-small border-default-200 shadow-sm rounded-[5px]"
              limitMaxLength={true}
              value={customerPhone}
              onChange={(e: any) => setCustomerPhone(e)}
            />
            <FormInput
              size="md"
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
            size="md"
            className="w-full"
            label="Email"
            type="email"
            radius="sm"
            name="customerEmail"
            labelPlacement="outside"
            placeholder=" "
          />
        </div>
      </AccordionItem>
      <AccordionItem
        key="2"
        tabIndex={-1}
        className="shadow-none rounded border border-gray-200 px-0"
        classNames={{
          trigger: "bg-backgroundGrey px-4 py-3 !outline-none",
          title: "font-medium",
        }}
        aria-label="Receiver Address Details"
        title="Receiver Address Details"
      >
        <div className="p-4 w-full flex flex-col gap-5">
          <Autocomplete
            className="w-full"
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
            inputProps={{
              classNames: { inputWrapper: "border-small rounded" },
            }}
            defaultSelectedKey="SA"
            labelPlacement="outside"
            name="country"
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
            className="w-full"
            label="Full Address Line"
            radius="sm"
            isRequired
            name="address"
            labelPlacement="outside"
            placeholder=" "
          />
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Autocomplete
              className="w-full"
              defaultItems={states.map((state) => ({
                label: state.stateName,
                value: state.stateCode,
              }))}
              label="State/Region"
              isRequired
              variant="bordered"
              inputProps={{
                classNames: {
                  inputWrapper: "border-small rounded",
                },
              }}
              selectedKey={state}
              onSelectionChange={(k) => {
                setCity("");
                setState(k as any);
              }}
              labelPlacement="outside"
              name="state"
              size="md"
              radius="sm"
              placeholder="State"
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              className="w-full"
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
              inputProps={{
                classNames: {
                  inputWrapper: "border-small rounded",
                },
              }}
              label="City"
              isRequired
              labelPlacement="outside"
              name="city"
              size="md"
              radius="sm"
              placeholder="City"
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              className="w-full"
              defaultItems={districts.map((district) => ({
                label: district.name,
                value: district.name,
              }))}
              selectedKey={district}
              onSelectionChange={(k) => {
                setDistrict(k as any);
              }}
              variant="bordered"
              inputProps={{
                classNames: {
                  inputWrapper: "border-small rounded",
                },
              }}
              label="District"
              labelPlacement="outside"
              name="district"
              size="md"
              radius="sm"
              placeholder="-"
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <FormInput
              size="md"
              className="w-full"
              label="Street Name"
              radius="sm"
              name="streetName"
              labelPlacement="outside"
              placeholder=" "
            />
            <FormInput
              size="md"
              className="w-full"
              label="Building No/Name"
              radius="sm"
              name="building"
              labelPlacement="outside"
              placeholder=" "
            />
            <FormInput
              size="md"
              className="w-full"
              label="ZIP Code"
              radius="sm"
              name="zipCode"
              labelPlacement="outside"
              placeholder=" "
              onKeyPress={(e) => {
                if (!/([0-9])/g.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

const OrderDetailsForm = () => {
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
        aria-label="Order Details"
        title="Order Details"
      >
        <div className="p-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
          <FormInput
            size="md"
            className="w-full"
            label="Order Number"
            isRequired
            radius="sm"
            name="orderNumber"
            labelPlacement="outside"
            placeholder=" "
          />
          <FormInput
            size="md"
            className="w-full"
            label="Order Date"
            isRequired
            radius="sm"
            name="orderNumber"
            labelPlacement="outside"
            placeholder=" "
          />
          <Select
            name="paymentMethod"
            radius="sm"
            className="w-full"
            variant="bordered"
            defaultSelectedKeys={["paid"]}
            labelPlacement="outside"
            label="Payment Method"
          >
            {PaymentMethods.map((paymentMethod) => (
              <SelectItem key={paymentMethod.value}>
                {paymentMethod.label}
              </SelectItem>
            ))}
          </Select>
          <div className="flex">
            <FormInput
              size="md"
              className="w-full"
              label="Order Grand Total"
              isRequired
              radius="sm"
              name="orderAmount"
              classNames={{ inputWrapper: "rounded-tl-none rounded-tr-none" }}
              labelPlacement="outside"
              placeholder=" "
            />
            <Select
              name="orderCurrency"
              radius="sm"
              className="max-w-[5rem]"
              classNames={{
                trigger: "rounded-tl-none rounded-tr-none border-l-0",
              }}
              variant="bordered"
              defaultSelectedKeys={["SAR"]}
            >
              {["SAR"].map((currency) => (
                <SelectItem key={currency}>{currency}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </AccordionItem>
      <AccordionItem
        key="2"
        tabIndex={-1}
        className="shadow-none rounded border border-gray-200 px-0"
        classNames={{
          trigger: "bg-backgroundGrey px-4 py-3 !outline-none",
          title: "font-medium",
        }}
        aria-label="Products Details"
        title="Products Details"
      ></AccordionItem>
    </Accordion>
  );
};

const OrderModal = ({ onClose }: OrderModalProps) => {
  const submitButtoRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  const handleClose = (openState: boolean) => {
    if (!openState) onClose();
    onOpenChange();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (active === 0) {
      setActive(1);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      onOpenChange={handleClose}
      className="max-h-[calc(100%_-_4rem)] max-w-6xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center justify-between w-full">
                <span className="whitespace-nowrap">Add Order</span>
                <Stepper
                  active={active}
                  steps={[
                    { title: "Receiver Details", key: "receiverDetails" },
                    { title: "Order Details", key: "orderDetails" },
                  ]}
                />
                <div></div>
              </div>
            </ModalHeader>
            <ModalBody className="px-1">
              <Form onSubmit={onSubmit} validationBehavior="native">
                {active === 0 ? <ReceiverDetailsForm /> : <OrderDetailsForm />}
                <button
                  ref={submitButtoRef}
                  type="submit"
                  className="invisible"
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="light"
                radius="sm"
                onPress={onClose}
              >
                Cancel
              </Button>
              {active > 0 && (
                <Button
                  color="primary"
                  variant="bordered"
                  radius="sm"
                  onPress={() => setActive(0)}
                >
                  Previous
                </Button>
              )}
              <Button
                color="primary"
                radius="sm"
                startContent={
                  active === 1 ? <BsPlus className="h-6 w-6" /> : null
                }
                onPress={() => {
                  if (submitButtoRef.current) submitButtoRef.current.click();
                }}
              >
                {active === 1 ? "Add" : "Next Step"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
