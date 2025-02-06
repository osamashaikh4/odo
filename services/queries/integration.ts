import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getIntegrations } from "../api/integration";

export type Integration = {
  integrationID: string;
  integrationName: string;
  integrationDescription: string;
  integrationSlug: string;
  integrationImage: string;
  createdAt: string;
  updatedAt: string;
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
