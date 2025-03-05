"use client";
import React, { useState } from "react";
import DataGrid from "../common/DataGrid";
import {
  Order,
  useExportOrdersMutation,
  useOrdersQuery,
  useReallocateOrderMutation,
} from "@/services/queries/order";
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
import OrderItemsModal from "../shipments/OrderItemsModal";
import { SlPrinter } from "react-icons/sl";
import { Button } from "@heroui/react";
import Tabs from "../common/Tabs";
import { SelectionMap } from "./OrderListConfig";
import CancelModal from "../shipments/CancelModal";
import { useQueryClient } from "@tanstack/react-query";
import { BsPlus } from "react-icons/bs";

interface OrderListProps {
  type: string;
  searchParams?: { [key: string]: any };
}

const tabs = [
  {
    title: "Pending Orders",
    key: "pending-orders",
    href: "/shipments/pending-orders",
  },
  {
    title: "Awaiting Pickup",
    key: "awaiting-pickup",
    href: "/shipments/awaiting-pickup",
  },
  {
    title: "Currently Shipping",
    key: "currently-shipping",
    href: "/shipments/currently-shipping",
  },
  {
    title: "Delivered",
    key: "delivered-orders",
    href: "/shipments/delivered-orders",
  },
  {
    title: "Returned",
    key: "returned-orders",
    href: "/shipments/returned-orders",
  },
  {
    title: "Canceled Orders",
    key: "canceled-orders",
    href: "/shipments/canceled-orders",
  },
  {
    title: "All Orders",
    key: "all-orders",
    href: "/shipments/all-orders",
  },
];

const OrderList = ({ searchParams, type }: OrderListProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [orderModal, setOrderModal] = useState<any>(null);
  const [orderItemsModal, setOrderItemsModal] = useState<any>(null);
  const [printModal, setPrintModal] = useState<any>(null);
  const [selection, setSelection] = useState<Order[]>([]);
  const [cancelModal, setCancelModal] = useState<Order | null>(null);
  const [rateModal, setRateModal] = useState<Order[] | null>(null);
  const [filters, setFilters] = useState({
    limit: 10,
    offset: 0,
    ...searchParams,
  });

  const { data: warehouse, isLoading: isGettingWarehouse } =
    useWarehouseQuery();

  const reallocateOrder = useReallocateOrderMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const { data = { results: [], count: 0 }, isFetching } = useOrdersQuery({
    ...filters,
    type,
  });

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
      setPrintModal({ orderIDs: [data.orderID] });
    } else if (action === "order-items") {
      setOrderItemsModal({ orderID: data.orderID });
    } else if (action === "cancel-order") {
      setCancelModal(data);
    } else if (action === "reallocate-order") {
      reallocateOrder.mutate({ orderID: data.orderID });
    }
  };

  const handleSelection = (row: Order) => {
    const tmp = [...selection];
    const index = tmp.findIndex((r) => r.orderID == row.orderID);

    if (index >= 0) {
      tmp.splice(index, 1);
    } else {
      tmp.push(row);
    }
    setSelection(tmp);
  };

  const onFilter = (_filters: any) => {
    const tmp = { ...filters, ..._filters };
    setFilters(tmp);
    router.push(
      `/shipments/${SelectionMap[type].selectedKey}?${queryString.stringify(
        tmp
      )}`
    );
  };

  return (
    <>
      <SectionHeader
        title="Shipments"
        icon="shipment"
        rightAction={
          <Button
            isDisabled={isGettingWarehouse}
            radius="sm"
            color="primary"
            onPress={() => handleAction("add-order", {})}
            startContent={<BsPlus className="h-6 w-6" />}
          >
            Add Order
          </Button>
        }
      />
      <Tabs selected={SelectionMap[type].selectedKey} options={tabs} />
      <DataGrid
        onSelectionChange={handleSelection}
        onSelectAll={setSelection}
        selection={selection.map((s) => s.orderID)}
        toolbar={
          <div className="pb-2 pr-1 flex items-center justify-between">
            <div className="flex items-center gap-5">
              {type === "getPendingOrders" && (
                <Button
                  isDisabled={selection.length === 0}
                  radius="sm"
                  color="primary"
                  startContent={
                    <Image
                      src="/assets/icons/truck-white.svg"
                      alt="truck"
                      width={22}
                      height={22}
                    />
                  }
                  onPress={() => {
                    if (selection.length > 0) {
                      setRateModal(selection);
                    }
                  }}
                >
                  Create Shipment
                </Button>
              )}
              <Button
                isDisabled={selection.length === 0}
                variant="light"
                onPress={() => {
                  setPrintModal({ orderIDs: selection.map((s) => s.orderID) });
                }}
                startContent={<SlPrinter size={16} className="text-gray-600" />}
              >
                Print
              </Button>
            </div>
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
        options={SelectionMap[type].menuOptions}
        columns={SelectionMap[type].columns}
        entity="orders"
        onFilter={onFilter}
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
      {cancelModal && (
        <CancelModal {...cancelModal} onClose={() => setCancelModal(null)} />
      )}
      {rateModal && (
        <RateModal
          orders={rateModal}
          onClose={() => setRateModal(null)}
          onFinish={() => setSelection([])}
        />
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
