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
  DatePicker,
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
import { BsPlus, BsTrash } from "react-icons/bs";
import { isNumber, PaymentMethods } from "@/helpers";
import FormSelect from "../common/FormSelect";
import FormAutoComplete from "../common/FormAutoComplete";
import { now, getLocalTimeZone } from "@internationalized/date";
import Table from "../common/Table";
import FormTextArea from "../common/FormTextArea";
import QuantityInput from "../common/QuantityInput";
import { RxCross2 } from "react-icons/rx";
import { FaPen } from "react-icons/fa";

interface OrderModalProps {
  onClose: () => void;
}

const ReceiverDetailsForm = ({ values }: any) => {
  const [customerPhone, setCustomerPhone] = useState(
    values.customerPhone ?? ""
  );
  const [state, setState] = useState(values.state ?? "");
  const [city, setCity] = useState(values.city ?? "");
  const [country, setCountry] = useState(values.country ?? "SA");
  const [district, setDistrict] = useState(values.district ?? "");
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
            defaultValue={values.customerFirstName}
            name="customerFirstName"
            labelPlacement="outside"
            placeholder=" "
          />
          <FormInput
            size="md"
            className="w-full"
            label="Last Name"
            defaultValue={values.customerLastName}
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
              className="intl-phone-input px-3 py-1.5 border-small border-default-200 rounded-[5px]"
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
            className="w-full"
            label="Email"
            type="email"
            defaultValue={values.customerEmail}
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
            defaultValue={values.address}
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
              name="streetName"
              defaultValue={values.streetName}
              labelPlacement="outside"
              placeholder=" "
            />
            <FormInput
              size="md"
              className="w-full"
              label="Building No/Name"
              defaultValue={values.building}
              name="building"
              labelPlacement="outside"
              placeholder=" "
            />
            <FormInput
              size="md"
              className="w-full"
              label="ZIP Code"
              defaultValue={values.zipCode}
              name="zipCode"
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

const OrderDetailsForm = () => {
  const [rows, setRows] = useState<any[]>([]);

  const onAddNewRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        productName: "",
        orderItemSku: "",
        orderItemQuantity: "",
        orderItemPrice: "",
        orderItemTax: "",
        orderItemTotal: "",
      },
    ]);
  };

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
            name="orderNumber"
            labelPlacement="outside"
            placeholder=" "
          />
          <div className="form-date-picker">
            <DatePicker
              hideTimeZone
              selectorButtonPlacement="start"
              className="w-full"
              showMonthAndYearPickers
              defaultValue={now(getLocalTimeZone()) as any}
              label="Order Date"
              labelPlacement="outside"
              variant="bordered"
              classNames={{ inputWrapper: "hidden" }}
              isRequired
              radius="sm"
              name="orderDate"
              size="md"
            />
          </div>
          <FormSelect
            name="paymentMethod"
            className="w-full"
            variant="bordered"
            defaultSelectedKeys={["paid"]}
            labelPlacement="outside"
            label="Payment Method"
            options={PaymentMethods}
          />

          <div className="flex items-baseline">
            <FormInput
              className="w-full"
              label="Order Grand Total"
              isRequired
              onKeyPress={(e) => {
                if (!/([0-9])/g.test(e.key)) {
                  e.preventDefault();
                }
              }}
              name="orderAmount"
              classNames={{ inputWrapper: "rounded-br-none rounded-tr-none" }}
              labelPlacement="outside"
              placeholder=" "
            />
            <FormSelect
              name="orderCurrency"
              className="max-w-[5rem]"
              classNames={{
                trigger:
                  "rounded-tl-none rounded-bl-none border-l-0 shadow-none",
              }}
              options={["SAR"].map((c) => ({ label: c, value: c }))}
              variant="bordered"
              defaultSelectedKeys={["SAR"]}
            />
          </div>
        </div>
      </AccordionItem>
      <AccordionItem
        key="2"
        className="shadow-none rounded border border-gray-200 px-0"
        classNames={{
          trigger: "bg-backgroundGrey px-4 py-3 !outline-none",
          title: "font-medium",
        }}
        aria-label="Products Details"
        title="Products Details"
      >
        <div className="p-4 w-full flex flex-col gap-5">
          <FormTextArea
            label="Item Description"
            labelPlacement="outside"
            isRequired={rows.length === 0}
            name="orderDescription"
            placeholder="Enter product name, code, color & size"
          />
          <Table
            columns={[
              {
                field: "orderItemName",
                headerName: "Product Name",
                render(_, row) {
                  return (
                    <FormInput name={"orderItemName" + row.id} isRequired />
                  );
                },
              },
              {
                field: "orderItemSku",
                headerName: "SKU",
                render(_, row) {
                  return (
                    <FormInput name={"orderItemSku" + row.id} isRequired />
                  );
                },
              },
              {
                field: "orderItemQuantity",
                headerName: "Quantity",
                render(_, row) {
                  return (
                    <QuantityInput
                      name={"orderItemQuantity" + row.id}
                      isRequired
                    />
                  );
                },
              },
              {
                field: "orderItemPrice",
                headerName: "Price",
                render(_, row) {
                  return (
                    <FormInput
                      name={"orderItemPrice" + row.id}
                      endContent="SAR"
                      isRequired
                      onKeyPress={(e) => {
                        if (!/([0-9])/g.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  );
                },
              },
              {
                field: "orderItemTax",
                headerName: "Tax",
                render(_, row) {
                  return (
                    <FormInput
                      name={"orderItemTax" + row.id}
                      isRequired
                      endContent="SAR"
                      onKeyPress={(e) => {
                        if (!/([0-9])/g.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  );
                },
              },
              {
                field: "orderItemTotal",
                headerName: "Total",
                render(_, row) {
                  return (
                    <FormInput
                      name={"orderItemTotal" + row.id}
                      isRequired
                      endContent="SAR"
                      onKeyPress={(e) => {
                        if (!/([0-9])/g.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  );
                },
              },
            ]}
            showEmptyMessage={false}
            limit={10}
            rows={rows}
            filters={{}}
            onAction={console.log}
            outerAction={(row) => (
              <Button
                variant="bordered"
                color="danger"
                radius="sm"
                className="border-small min-w-4 px-3"
                onPress={() => setRows(rows.filter((r) => r.id !== row.id))}
              >
                <BsTrash fontSize="1.125rem" />
              </Button>
            )}
          />
          <div className="flex items-center gap-2">
            <Button
              className="border-small"
              variant="bordered"
              radius="sm"
              color="primary"
              onPress={onAddNewRow}
              startContent={<BsPlus className="h-6 w-6" />}
            >
              Add New Row
            </Button>
            <Button variant="light" color="primary">
              Adjust Order Value
            </Button>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

const OrderModal = ({ onClose }: OrderModalProps) => {
  const submitButtoRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [values, setValues] = useState({});

  useEffect(() => {
    onOpen();
  }, []);

  const handleClose = (openState: boolean) => {
    if (!openState) onClose();
    onOpenChange();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: any = Object.fromEntries(
      new FormData(e.currentTarget as any)
    );
    if (active === 0) {
      setValues(formData);
      setActive(1);
    } else {
      const allData = { ...values, ...formData };

      const fin = {
        orderNumber: allData.orderNumber,
        orderDate: allData.orderDate,
        orderTimeZone: allData.orderTimeZone,
        paymentMethod: allData.paymentMethod,
        orderAmount: allData.orderAmount,
        orderCurrency: allData.orderCurrency,
        orderDescription: allData.orderDescription,
        customer: {
          customerFirstName: allData.customerFirstName,
          customerLastName: allData.customerLastName,
          customerEmail: allData.customerEmail,
          customerPhone: allData.customerPhone,
        },
        address: {
          address: allData.address,
          city: allData.city,
          state: allData.state,
          country: allData.country,
          district: allData.district,
          zipCode: allData.zipCode,
          streetName: allData.streetName,
          building: allData.building,
        },
        items: Object.keys(allData)
          .filter((key) => key.startsWith("orderItemName"))
          .map((key) => {
            const index = key.replace("orderItemName", "");
            return {
              orderItemName: allData[`orderItemName${index}`],
              orderItemSku: allData[`orderItemSku${index}`],
              orderItemQuantity: allData[`orderItemQuantity${index}`],
              orderItemPrice: allData[`orderItemPrice${index}`],
              orderItemTax: allData[`orderItemTax${index}`],
              orderItemTotal: allData[`orderItemTotal${index}`],
              orderItemCurrency: "SAR",
            };
          }),
      };
      console.log(fin);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      shouldBlockScroll
      radius="sm"
      shouldCloseOnInteractOutside={() => false}
      onOpenChange={handleClose}
      closeButton={<RxCross2 fontSize="2.5rem" color="#171717" />}
      className="max-h-[calc(100%_-_4rem)] max-w-[90%]"
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
            <ModalBody className="px-1 overflow-auto">
              <Form onSubmit={onSubmit} validationBehavior="native">
                {active === 0 ? (
                  <ReceiverDetailsForm values={values} />
                ) : (
                  <OrderDetailsForm />
                )}
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
                  className="border-small"
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
