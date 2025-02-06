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

export const useIntegrationsQuery = (
  params?: Omit<UseQueryOptions<Integration[]>, "queryKey">
) =>
  useQuery<Integration[]>({
    queryKey: ["integrations"],
    queryFn: () => getIntegrations(),
    ...params,
  });
