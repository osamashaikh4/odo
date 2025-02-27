import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  getConnectedShippingPartners,
  getShippingPartner,
  getShippingPartners,
  saveShippingPartnerConnection,
  testConnection,
  removeShippingPartnerConnection,
} from "../api/shipping-partner";
import { MutationParams } from "./types";
import { defaultParams } from "./utils";

export type ShippingPartner = {
  shippingPartnerID: string;
  shippingPartnerName: string;
  shippingPartnerLogo: string;
  shippingPartnerSlug: string;
  shippingPartnerStatus: number;
  shippingPartnerConnection?: {
    createdAt: string;
    shippingPartnerConnectionID: string;
  };
};

export const useShippingPartnersQuery = (
  params?: Omit<UseQueryOptions<ShippingPartner[]>, "queryKey">
) =>
  useQuery<ShippingPartner[]>({
    queryKey: ["shipping-partners"],
    queryFn: getShippingPartners,
    ...params,
  });

export const useConnectedShippingPartnersQuery = (
  params?: Omit<UseQueryOptions<ShippingPartner[]>, "queryKey">
) =>
  useQuery<ShippingPartner[]>({
    queryKey: ["connected-shipping-partners"],
    queryFn: getConnectedShippingPartners,
    ...params,
  });

export const useShippingPartnerQuery = (
  id: string,
  params?: Omit<UseQueryOptions<ShippingPartner>, "queryKey">
) =>
  useQuery<ShippingPartner>({
    queryKey: ["shipping-partners", id],
    queryFn: () => getShippingPartner(id),
    ...params,
  });

export const useTestConnectionMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: testConnection,
    ...params,
    ...defaultParams(params),
  });

export const useSaveShippingPartnerConnectionMutation = (
  params: MutationParams
) =>
  useMutation({
    mutationFn: saveShippingPartnerConnection,
    ...params,
    ...defaultParams(params),
  });

export const useRemoveShippingPartnerConnectionMutation = (
  params: MutationParams
) =>
  useMutation({
    mutationFn: removeShippingPartnerConnection,
    ...params,
    ...defaultParams(params),
  });
