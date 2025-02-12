import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  getShippingPartner,
  getShippingPartners,
  testConnection,
} from "../api/shipping-partner";
import { MutationParams } from "./types";
import { defaultParams } from "./utils";

export type ShippingPartner = {
  shippingPartnerID: string;
  shippingPartnerName: string;
  shippingPartnerLogo: string;
  shippingPartnerSlug: string;
  shippingPartnerStatus: number;
};

export const useShippingPartnersQuery = (
  params?: Omit<UseQueryOptions<ShippingPartner[]>, "queryKey">
) =>
  useQuery<ShippingPartner[]>({
    queryKey: ["shipping-partners"],
    queryFn: getShippingPartners,
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
