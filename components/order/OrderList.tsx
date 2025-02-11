"use client";
import React from "react";
import DataGrid from "../common/DataGrid";
import { Order, useOrdersQuery } from "@/services/queries/order";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { OrderStateMap, PaymentMethodsMap } from "@/helpers";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import Image from "next/image";

interface OrderListProps {
  searchParams?: { [key: string]: any };
}

const columns = [
  { field: "orderNumber", headerName: "Order ID", type: "text" },
  {
    field: "orderDate",
    headerName: "Order Date",
    render: (orderDate: string) => (
      <span className="whitespace-nowrap">
        {moment(orderDate).format("DD/MM/YYYY hh:mm")}
      </span>
    ),
    type: "date",
  },
  {
    field: "orderState",
    headerName: "Status",
    type: "dropdown",
    render: (v: string) => (
      <span className="whitespace-nowrap">{OrderStateMap[v] || v}</span>
    ),
  },
  {
    field: "warehouse",
    headerName: "Pickup Location",
    render: (v: any) => (
      <span className="whitespace-nowrap">{v.warehouseName}</span>
    ),
    type: "dropdown",
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    render: (_: string, row: Order) => <>{row.customer.fullName}</>,
    type: "text",
  },
  {
    field: "address",
    headerName: "Customer Address",
    width: 150,
    render: (_: string, row: Order) => (
      <span className="overflow-hidden block text-ellipsis whitespace-nowrap">
        {row.address.address}
      </span>
    ),
    type: "text",
  },
  {
    field: "city",
    headerName: "Destination City",
    render: (_: string, row: Order) => <>{row.address.city}</>,
    type: "dropdown",
  },
  {
    field: "orderAmount",
    headerName: "Order Grand Total",
    render: (_: string, row: Order) => (
      <NumericFormat
        value={row.orderAmount}
        thousandSeparator
        suffix={` ${row.orderCurrency}`}
        displayType="text"
      />
    ),
    type: "number",
  },
  {
    field: "paymentMethod",
    headerName: "Payment Method",
    render: (paymentMethod: string) => (
      <>{PaymentMethodsMap[paymentMethod] || paymentMethod}</>
    ),
    type: "dropdown",
  },
];

const OrderList = ({ searchParams }: OrderListProps) => {
  const router = useRouter();
  const filters = {
    limit: 10,
    offset: 0,
    ...searchParams,
  };

  const { data = { results: [], count: 0 }, isFetching } =
    useOrdersQuery(filters);

  return (
    <DataGrid
      onAction={console.log}
      filters={filters}
      count={data.count}
      rows={data.results}
      isLoading={isFetching}
      options={[
        {
          label: "Create Shipment",
          value: "create-shipment",
          icon: (
            <Image
              src="/assets/icons/truck.svg"
              alt="truck"
              width={22}
              height={22}
            />
          ),
        },
      ]}
      columns={columns}
      entity="orders"
      onFilter={(f) => {
        router.push(
          `/shipments?${queryString.stringify({ ...filters, ...f })}`
        );
      }}
    />
  );
};

export default OrderList;
