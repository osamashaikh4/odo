import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  authorizeIntegration,
  getConnections,
  getIntegration,
  getIntegrations,
  removeConnection,
  saveIntegration,
  syncOrders,
  syncProducts,
} from "../api/integration";
import { MutationParams } from "./types";
import { defaultParams } from "./utils";

export type Integration = {
  integrationID: string;
  integrationName: string;
  integrationDescription: string;
  integrationSlug: string;
  integrationImage: string;
  createdAt: string;
  updatedAt: string;
  integrationAbout: string;
  connectionMethod: string;
  connections?: Connection[];
};

export type Connection = {
  connectionID: string;
  createdAt: string;
  storeName: string;
  integration: Integration;
};

type GetIntegrationsResponse = { results: Integration[]; count: number };

export const useIntegrationsQuery = (
  params?: Omit<UseQueryOptions<GetIntegrationsResponse>, "queryKey">
) =>
  useQuery<GetIntegrationsResponse>({
    queryKey: ["integrations"],
    queryFn: getIntegrations,
    ...params,
  });

export const useIntegrationQuery = (
  id: string,
  params?: Omit<UseQueryOptions<Integration>, "queryKey">
) =>
  useQuery<Integration>({
    queryKey: ["integration", id],
    queryFn: () => getIntegration(id),
    ...params,
  });

export const useConnectionsQuery = (
  params?: Omit<UseQueryOptions<Connection[]>, "queryKey">
) =>
  useQuery<Connection[]>({
    queryKey: ["connections"],
    queryFn: getConnections,
    ...params,
  });

export const useAuthorizeIntegrationMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: authorizeIntegration,
    ...params,
    ...defaultParams(params),
  });

export const useSaveIntegrationMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: saveIntegration,
    ...params,
    ...defaultParams(params),
  });

export const useRemoveConnectionMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: removeConnection,
    ...params,
    ...defaultParams(params),
  });

export const useSyncOrdersMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: syncOrders,
    ...params,
    ...defaultParams(params),
  });

export const useSyncProductsMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: syncProducts,
    ...params,
    ...defaultParams(params),
  });
