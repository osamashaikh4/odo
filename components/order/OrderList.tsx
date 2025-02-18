"use client";
import React, { useState } from "react";
import DataGrid from "../common/DataGrid";
import {
  Order,
  useExportOrdersMutation,
  useOrdersQuery,
} from "@/services/queries/order";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { OrderStateMap, PaymentMethodsMap } from "@/helpers";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import Image from "next/image";
import RateModal from "../shipments/RateModal";
import SectionHeader from "../shipments/SectionHeader";
import OrderModal from "../shipments/OrderModal";
import { useWarehouseQuery } from "@/services/queries/warehouse";
import { onErrorToast } from "@/helpers/toast";
import OrderDetailsModal from "../shipments/OrderDetailsModal";
import OrderPrintModal from "../shipments/OrderPrintModal";
import { IoCartOutline } from "react-icons/io5";
import OrderItemsModal from "../shipments/OrderItemsModal";
import { SlPrinter } from "react-icons/sl";
import { BiEditAlt } from "react-icons/bi";
import { VscEye } from "react-icons/vsc";
import { Button } from "@heroui/react";

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

const menuOptions = [
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

const OrderList = ({ searchParams }: OrderListProps) => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [orderModal, setOrderModal] = useState<any>(null);
  const [orderItemsModal, setOrderItemsModal] = useState<any>(null);
  const [printModal, setPrintModal] = useState<any>(null);
  const [rateModal, setRateModal] = useState<Order[] | null>(null);
  const filters = {
    limit: 10,
    offset: 0,
    ...searchParams,
  };

  const { data: warehouse } = useWarehouseQuery();

  const { data = { results: [], count: 0 }, isFetching } =
    useOrdersQuery(filters);

  const exportOrders = useExportOrdersMutation({});

  const handleAction = (action: string, data: any) => {
    if (action === "create-shipment") {
      setRateModal([data]);
    } else if (action === "add-order") {
      if (warehouse?.warehouseID) {
        setOrderModal({});
      } else {
        onErrorToast({
          response: { data: { error: "Please add a pickup location first" } },
        });
      }
    } else if (action === "edit-order") {
      setOrderDetails({ orderID: data.orderID });
    } else if (action === "view-order") {
      setOrderDetails({ isView: true, orderID: data.orderID });
    } else if (action === "print-order") {
      setPrintModal({ orderID: data.orderID });
    } else if (action === "order-items") {
      setOrderItemsModal({ orderID: data.orderID });
    }
  };

  return (
    <>
      <SectionHeader onAdd={() => handleAction("add-order", {})} />
      <DataGrid
        toolbar={
          <div className="pb-2 pl-3 pr-1 flex items-center justify-between">
            <div></div>
            <Button
              variant="bordered"
              radius="sm"
              isLoading={exportOrders.isPending}
              className="min-w-10 border-small"
              onPress={() => exportOrders.mutate()}
            >
              Export Data
            </Button>
          </div>
        }
        onAction={handleAction}
        filters={filters}
        count={data.count}
        rows={data.results}
        isLoading={isFetching}
        options={menuOptions}
        columns={columns}
        entity="orders"
        onFilter={(f) => {
          router.push(
            `/shipments?${queryString.stringify({ ...filters, ...f })}`
          );
        }}
      />
      {orderModal && <OrderModal onClose={() => setOrderModal(null)} />}
      {orderDetails && (
        <OrderDetailsModal
          {...orderDetails}
          onClose={() => setOrderDetails(null)}
        />
      )}
      {printModal && (
        <OrderPrintModal {...printModal} onClose={() => setPrintModal(null)} />
      )}
      {rateModal && (
        <RateModal orders={rateModal} onClose={() => setRateModal(null)} />
      )}
      {orderItemsModal && (
        <OrderItemsModal
          {...orderItemsModal}
          onClose={() => setOrderItemsModal(null)}
        />
      )}
    </>
  );
};

export default OrderList;
