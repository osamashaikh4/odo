import React, { useMemo, useState } from "react";
import { Order, useGetOrderNumberMutation } from "@/services/queries/order";
import { Accordion, AccordionItem, Button, DatePicker } from "@heroui/react";
import {
  getLocalTimeZone,
  now,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";
import FormTextArea from "../common/FormTextArea";
import Table from "../common/Table";
import { isNumber, PaymentMethods } from "@/helpers";
import { BsPlus, BsTrash } from "react-icons/bs";
import ProductRow from "./ProductRow";

interface OrderDetailsFormProps {
  values?: Order;
  isView?: boolean;
  isEdit?: boolean;
}

const columns = [
  {
    field: "orderItemName",
    headerName: "Product Name",
  },
  {
    field: "orderItemSku",
    headerName: "SKU",
  },
  {
    field: "orderItemQuantity",
    headerName: "Quantity",
  },
  {
    field: "orderItemPrice",
    headerName: "Price",
  },
  {
    field: "orderItemTax",
    headerName: "Tax",
  },
  {
    field: "orderItemTotal",
    headerName: "Total",
  },
];

const OrderDetailsForm = ({
  isView,
  values,
  isEdit,
}: OrderDetailsFormProps) => {
  const [orderAmount, setOrderAmount] = useState(
    (values?.orderAmount as any) ?? ""
  );
  const [orderNumber, setOrderNumber] = useState(values?.orderNumber ?? "");
  const [rows, setRows] = useState<any[]>(
    values?.items ? values.items.map((item, i) => ({ ...item, id: i + 1 })) : []
  );

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
        orderItemQuantity: "1",
        orderItemPrice: "",
        orderItemTax: "",
        orderItemTotal: "",
      },
    ]);
  };

  const handleChange = (rowID: string, total: number) => {
    const t = [...rows];
    const i = t.findIndex((r) => r.id == rowID);
    if (i >= 0) {
      t[i].orderItemTotal = total;
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
          trigger: "bg-backgroundLightGrey px-4 py-3 !outline-none",
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
              isDisabled={isEdit || isView}
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
            {!isEdit && (
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
            )}
          </div>
          <div className="form-date-picker">
            <DatePicker
              hideTimeZone
              selectorButtonPlacement="start"
              className="w-full"
              isDisabled={isView}
              showMonthAndYearPickers
              defaultValue={
                values?.orderDate
                  ? parseAbsoluteToLocal(values.orderDate)
                  : (now(getLocalTimeZone()) as any)
              }
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
            isDisabled={isView}
            variant="bordered"
            defaultSelectedKeys={[values?.paymentMethod ?? "paid"]}
            labelPlacement="outside"
            label="Payment Method"
            options={PaymentMethods}
          />
          <div className="flex items-baseline">
            <FormInput
              className="w-full"
              label="Order Grand Total"
              isRequired
              isDisabled={isView}
              onKeyPress={(e) => isNumber(e, true)}
              value={orderAmount}
              onChange={(e) => setOrderAmount(e.target.value)}
              name="orderAmount"
              classNames={{ inputWrapper: "rounded-br-none rounded-tr-none" }}
              labelPlacement="outside"
              placeholder=" "
            />
            <FormSelect
              isDisabled={isView}
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
          trigger: "bg-backgroundLightGrey px-4 py-3 !outline-none",
          title: "font-medium",
        }}
        aria-label="Products Details"
        title="Products Details"
      >
        <div className="p-4 w-full flex flex-col gap-5">
          <FormTextArea
            label="Item Description"
            labelPlacement="outside"
            isDisabled={isView}
            isRequired={rows.length === 0}
            name="orderDescription"
            defaultValue={values?.orderDescription}
            placeholder="Enter product name, code, color & size"
          />
          <Table
            renderRow={(row, columns) => (
              <ProductRow
                key={row.id}
                {...{
                  row,
                  columns,
                  isView,
                  onChange: handleChange,
                  onRowDelete(row) {
                    setRows(rows.filter((r) => r.id !== row.id));
                  },
                }}
              />
            )}
            columns={columns}
            showEmptyMessage={false}
            limit={10}
            rows={rows}
            filters={{}}
            onAction={console.log}
          />
          {!isView && (
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
                onPress={() => {
                  setOrderAmount(totalRowsAmount);
                }}
              >
                Adjust Order Value
              </Button>
            </div>
          )}
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default OrderDetailsForm;
