import { Checkbox } from "@heroui/react";
import Image from "next/image";
import { BiEditAlt } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { SlPrinter } from "react-icons/sl";
import { VscEye } from "react-icons/vsc";
import { Column } from "../common/Table";
import moment from "moment";
import { OrderStateMap, PaymentMethodsMap } from "@/helpers";
import { NumericFormat } from "react-number-format";

const getPendingOrdersMenuOptions = [
  {
    label: "Edit Order",
    value: "edit-order",
    icon: <BiEditAlt fontSize="1.125rem" className="text-gray-600" />,
  },
  {
    label: "View Order",
    value: "view-order",
    icon: <VscEye fontSize="1.25rem" className="text-gray-600" />,
  },
  {
    label: "Print",
    value: "print-order",
    icon: <SlPrinter fontSize="1rem" className="text-gray-600" />,
  },
  {
    label: "Order Items",
    value: "order-items",
    icon: <IoCartOutline fontSize="1.125rem" className="text-gray-600" />,
  },
  {
    label: "Create Shipment",
    value: "create-shipment",
    icon: (
      <Image src="/assets/icons/truck.svg" alt="truck" width={22} height={22} />
    ),
  },
];

const getPendingOrdersColumns: Column[] = [
  {
    field: "orderID",
    headerName: "",
    type: "checkbox",
    render: ({ selection = [], onSelectionChange, row }) => (
      <Checkbox
        isSelected={selection.includes(row.orderID)}
        onValueChange={() => {
          if (onSelectionChange) {
            onSelectionChange(row);
          }
        }}
      />
    ),
  },
  { field: "orderNumber", headerName: "Order ID", type: "text" },
  {
    field: "orderDate",
    headerName: "Order Date",
    render: ({ value }) => (
      <span className="whitespace-nowrap">
        {moment(value).format("DD/MM/YYYY hh:mm")}
      </span>
    ),
    type: "date",
  },
  {
    field: "orderState",
    headerName: "Status",
    type: "dropdown",
    render: ({ value }) => (
      <span className="whitespace-nowrap">{OrderStateMap[value] || value}</span>
    ),
  },
  {
    field: "warehouse",
    headerName: "Pickup Location",
    render: ({ value }) => (
      <span className="whitespace-nowrap">{value.warehouseName}</span>
    ),
    type: "dropdown",
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    render: ({ row }) => <>{row.customer.fullName}</>,
    type: "text",
  },
  {
    field: "address",
    headerName: "Customer Address",
    width: 150,
    render: ({ row }) => (
      <span className="overflow-hidden block text-ellipsis whitespace-nowrap">
        {row.address.address}
      </span>
    ),
    type: "text",
  },
  {
    field: "city",
    headerName: "Destination City",
    render: ({ row }) => <>{row.address.city}</>,
    type: "dropdown",
  },
  {
    field: "orderAmount",
    headerName: "Order Grand Total",
    render: ({ row }) => (
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
    render: ({ value }) => <>{PaymentMethodsMap[value] || value}</>,
    type: "dropdown",
  },
];

const getAwaitingPickupOrdersMenuOptions = [
  {
    label: "View Order",
    value: "view-order",
    icon: <VscEye fontSize="1.25rem" className="text-gray-600" />,
  },
  {
    label: "Order Items",
    value: "order-items",
    icon: <IoCartOutline fontSize="1.125rem" className="text-gray-600" />,
  },
];

const getAwaitingPickupOrdersColumns: Column[] = [
  {
    field: "orderID",
    headerName: "",
    type: "checkbox",
    render: ({ selection = [], onSelectionChange, row }) => (
      <Checkbox
        isSelected={selection.includes(row.orderID)}
        onValueChange={() => {
          if (onSelectionChange) {
            onSelectionChange(row);
          }
        }}
      />
    ),
  },
  { field: "orderNumber", headerName: "Order ID", type: "text" },
  {
    field: "orderDate",
    headerName: "Order Date",
    render: ({ value }) => (
      <span className="whitespace-nowrap">
        {moment(value).format("DD/MM/YYYY hh:mm")}
      </span>
    ),
    type: "date",
  },
  {
    field: "orderState",
    headerName: "Status",
    type: "dropdown",
    render: ({ value }) => (
      <span className="whitespace-nowrap">{OrderStateMap[value] || value}</span>
    ),
  },
  {
    field: "warehouse",
    headerName: "Pickup Location",
    render: ({ value }) => (
      <span className="whitespace-nowrap">{value.warehouseName}</span>
    ),
    type: "dropdown",
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    render: ({ row }) => <>{row.customer.fullName}</>,
    type: "text",
  },
  {
    field: "address",
    headerName: "Customer Address",
    width: 150,
    render: ({ row }) => (
      <span className="overflow-hidden block text-ellipsis whitespace-nowrap">
        {row.address.address}
      </span>
    ),
    type: "text",
  },
  {
    field: "city",
    headerName: "Destination City",
    render: ({ row }) => <>{row.address.city}</>,
    type: "dropdown",
  },
  {
    field: "shipmentNumber",
    headerName: "Shipment Number",
    render: ({ row }) => <>{row.shipment.shipmentNumber}</>,
    type: "text",
  },
  {
    field: "shippingPartnerName",
    headerName: "Delivery Company",
    type: "dropdown",
    render: ({ row }) => (
      <>{row.shipment.shippingPartner.shippingPartnerName}</>
    ),
  },
  {
    field: "shipmentDate",
    headerName: "Shipment Creation Date",
    render: ({ row }) => (
      <span className="whitespace-nowrap">
        {moment(row.shipment.createdAt).format("DD/MM/YYYY hh:mm")}
      </span>
    ),
    type: "date",
  },
];

export const SelectionMap: {
  [key: string]: { selectedKey: string; columns: Column[]; menuOptions: any[] };
} = {
  getPendingOrders: {
    selectedKey: "pending-orders",
    menuOptions: getPendingOrdersMenuOptions,
    columns: getPendingOrdersColumns,
  },
  getAwaitingPickupOrders: {
    selectedKey: "awaiting-pickup",
    menuOptions: getAwaitingPickupOrdersMenuOptions,
    columns: getAwaitingPickupOrdersColumns,
  },
};
