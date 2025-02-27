import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  createOrder,
  exportOrders,
  getCustomerSuggestion,
  getOrder,
  getOrderNumber,
  getOrders,
  shipOrders,
  updateOrder,
} from "../api/order";
import { Filter, MutationParams } from "./types";
import { defaultParams } from "./utils";

export type Order = {
  orderID: string;
  orderNumber: string;
  warehouseID: string;
  orderDescription: string;
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
  items?: OrderItem[];
};

export interface OrderItem {
  orderItemID: string;
  orderItemName: string;
  orderItemSku: string;
  orderItemQuantity: number;
  orderItemPrice: number;
  orderItemTax: number;
  orderItemTotal: number;
  orderItemCurrency: string;
}

export interface Customer {
  firstName: string;
  lastName: string;
  fullName: string;
  customerID: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  streetName: string;
  building: string;
  district: string;
}

type CustomerSuggestion = Customer & Address;

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

export const useOrderQuery = (
  orderID: string,
  params?: Omit<UseQueryOptions<Order>, "queryKey">
) =>
  useQuery<Order>({
    queryKey: ["order", orderID],
    queryFn: () => getOrder(orderID),
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

export const useCustomerSuggestionQuery = (
  search?: string,
  params?: Omit<UseQueryOptions<CustomerSuggestion[]>, "queryKey">
) =>
  useQuery<CustomerSuggestion[]>({
    queryKey: ["customer-suggestion", search],
    queryFn: () => getCustomerSuggestion(search),
    ...params,
  });

export const useExportOrdersMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: exportOrders,
    ...params,
    ...defaultParams(params),
  });

export const useShipOrdersMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: shipOrders,
    ...params,
    ...defaultParams(params),
  });
