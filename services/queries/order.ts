import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getOrders } from "../api/order";
import { Filter } from "./types";

export type Order = {
  orderID: string;
  orderNumber: string;
  warehouseID: string;
  orderDate: string;
  orderTimeZone: string;
  paymentMethod: string;
  orderAmount: number;
  orderCurrency: string;
  orderState: string;
  orderStatus: number;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  address: Address;
};

export interface Customer {
  firstName: string;
  lastName: string;
  fullName: string;
}

export interface Address {
  address: string;
  city: string;
}

type GetOrdersResponse = { results: Order[]; count: number };

export const useOrdersQuery = (
  filters: Filter,
  params?: Omit<UseQueryOptions<GetOrdersResponse>, "queryKey">
) =>
  useQuery<GetOrdersResponse>({
    queryKey: ["orders", filters],
    queryFn: () => getOrders(filters),
    ...params,
  });
