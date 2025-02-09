import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getOrders } from "../api/order";

export type Order = {
  orderID: string;
};

type GetOrdersResponse = { results: Order[]; count: number };

export const useOrdersQuery = (
  params?: Omit<UseQueryOptions<GetOrdersResponse>, "queryKey">
) =>
  useQuery<GetOrdersResponse>({
    queryKey: ["orders"],
    queryFn: getOrders,
    ...params,
  });
