"use client";
import React from "react";
import DataGrid from "../common/DataGrid";
import { useOrdersQuery } from "@/services/queries/order";

const OrderList = () => {
  const { data, isFetching } = useOrdersQuery();
  return <DataGrid isLoading={isFetching} />;
};

export default OrderList;
