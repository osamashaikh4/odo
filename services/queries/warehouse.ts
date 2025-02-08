import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { MutationParams } from "./types";
import { defaultParams } from "./utils";
import {
  createWarehouse,
  getWarehouse,
  updateWarehouse,
} from "../api/warehouse";

export type Warehouse = {
  warehouseID: string;
  userID: string;
  warehouseName: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderCountry: string;
  warehouseAddress: string;
  warehouseCity: string;
  warehouseState: string;
  warehouseDistrict: string;
  warehouseZipCode: number;
  warehouseStreetName: string;
  warehouseBuilding: string;
  warehouseStatus: number;
};

export const useWarehouseQuery = (
  params?: Omit<UseQueryOptions<Warehouse>, "queryKey">
) =>
  useQuery<Warehouse>({
    queryKey: ["warehouse"],
    queryFn: getWarehouse,
    ...params,
  });

export const useCreateWarehouseMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: createWarehouse,
    ...params,
    ...defaultParams(params),
  });

export const useUpdateWarehouseMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: updateWarehouse,
    ...params,
    ...defaultParams(params),
  });
