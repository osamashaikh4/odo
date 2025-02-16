import React, { useMemo, useState } from "react";
import { useGetOrderNumberMutation } from "@/services/queries/order";
import { Accordion, AccordionItem, Button, DatePicker } from "@heroui/react";
import { getLocalTimeZone, now } from "@internationalized/date";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";
import FormTextArea from "../common/FormTextArea";
import Table from "../common/Table";
import { isNumber, PaymentMethods } from "@/helpers";
import QuantityInput from "../common/QuantityInput";
import { BsPlus, BsTrash } from "react-icons/bs";

const OrderDetailsForm = () => {
  const [orderAmount, setOrderAmount] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [rows, setRows] = useState<any[]>([]);

  const totalRowsAmount = useMemo(
    () =>
      rows.reduce((acc, r) => {
        acc += Number(r.orderItemTotal);
        return acc;
      }, 0),
    [rows]
  );

  const getOrderNumber = useGetOrderNumberMutation({
    onSuccess(data) {
      if (data && data.orderNumber) setOrderNumber(data.orderNumber);
    },
  });

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

  const handleChange = (rowID: string, e: any) => {
    const t = [...rows];
    const i = t.findIndex((r) => r.id == rowID);
    if (i >= 0) {
      t[i][e.target.name.replace(rowID, "")] = e.target.value;
    }
    setRows(t);
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
          <div className="flex items-baseline gap-3">
            <FormInput
              size="md"
              className="w-full"
              label="Order Number"
              isRequired
              name="orderNumber"
              labelPlacement="outside"
              placeholder=" "
              minLength={3}
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
            <Button
              color="primary"
              variant="ghost"
              radius="sm"
              className="border-small"
              isLoading={getOrderNumber.isPending}
              onPress={() => getOrderNumber.mutate()}
            >
              Generate
            </Button>
          </div>
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
              onKeyPress={(e) => isNumber(e, true)}
              value={orderAmount}
              onChange={(e) => setOrderAmount(e.target.value)}
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
                    <FormInput
                      name={"orderItemName" + row.id}
                      isRequired
                      onBlur={(e) => handleChange(row.id, e)}
                    />
                  );
                },
              },
              {
                field: "orderItemSku",
                headerName: "SKU",
                render(_, row) {
                  return (
                    <FormInput
                      name={"orderItemSku" + row.id}
                      onBlur={(e) => handleChange(row.id, e)}
                    />
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
                      type="number"
                      min={1}
                      defaultValue="1"
                      isRequired
                      onBlur={(e) => handleChange(row.id, e)}
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
                      onBlur={(e) => handleChange(row.id, e)}
                      onKeyPress={(e) => isNumber(e, true)}
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
                      onBlur={(e) => handleChange(row.id, e)}
                      endContent="SAR"
                      onKeyPress={(e) => isNumber(e, true)}
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
                      onBlur={(e) => handleChange(row.id, e)}
                      endContent="SAR"
                      onKeyPress={(e) => isNumber(e, true)}
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
            <Button
              variant="light"
              isDisabled={totalRowsAmount <= 0}
              color="primary"
              onPress={() => setOrderAmount(totalRowsAmount)}
            >
              Adjust Order Value
            </Button>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default OrderDetailsForm;
