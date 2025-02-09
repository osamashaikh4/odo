import React from "react";
import DataGrid from "../common/DataGrid";
import { useOrdersQuery } from "@/services/queries/order";

const OrderList = () => {
  const { data } = useOrdersQuery();
  return <DataGrid />;
};

export default OrderList;
