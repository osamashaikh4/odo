"use client";
import React from "react";
import DataGrid from "../common/DataGrid";
import { Order, useOrdersQuery } from "@/services/queries/order";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { PaymentMethodsMap } from "@/helpers";

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
  { field: "orderState", headerName: "Status", type: "dropdown" },
  {
    field: "warehouse",
    headerName: "Pickup Location",
    render: () => <span className="whitespace-nowrap">Default Warehouse</span>,
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

const OrderList = () => {
  const { data = { results: [] }, isFetching } = useOrdersQuery();
  return (
    <DataGrid
      onAction={console.log}
      limit={10}
      rows={data.results}
      isLoading={isFetching}
      columns={columns}
      entity="order"
    />
  );
};

export default OrderList;
