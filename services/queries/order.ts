import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  createOrder,
  getOrderNumber,
  getOrders,
  updateOrder,
} from "../api/order";
import { Filter, MutationParams } from "./types";
import { defaultParams } from "./utils";

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

export const useGetOrderNumberMutation = (params: MutationParams) =>
  useMutation<{ orderNumber: string }>({
    mutationFn: getOrderNumber,
    ...params,
    ...defaultParams(params),
  });

export const useCreateOrderMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: createOrder,
    ...params,
    ...defaultParams(params),
  });

export const useUpdateOrderMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: updateOrder,
    ...params,
    ...defaultParams(params),
  });
