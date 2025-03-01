import React from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import OrderList from "@/components/order/OrderList";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function page({ searchParams }: Props) {
  return (
    <div className="flex h-full">
      <Sidebar active="shipments" />
      <div className="flex flex-col w-0 flex-1">
        <Header />
        <div className="flex flex-col flex-1 relative overflow-auto">
          <div className="flex flex-col h-full overflow-x-hidden overflow-y-auto p-10 bg-backgroundGrey">
            <OrderList
              type="getPendingOrders"
              searchParams={await searchParams}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
