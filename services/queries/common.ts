import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { MutationParams } from "./types";
import {
  getCities,
  getCountries,
  getDistricts,
  getEntityFilters,
  getStates,
  uploadImage,
} from "../api/common";
import { defaultParams } from "./utils";

export type Country = {
  countryName: string;
  countryCode: string;
};

export type State = {
  stateName: string;
  stateCode: string;
};

export type City = {
  cityName: string;
};

export const useCountriesQuery = (
  params?: Omit<UseQueryOptions<Country[]>, "queryKey">
) =>
  useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
    ...params,
  });

export const useStatesQuery = (
  params?: Omit<UseQueryOptions<State[]>, "queryKey">
) =>
  useQuery<State[]>({
    queryKey: ["states"],
    queryFn: getStates,
    ...params,
  });

export const useCitiesQuery = (
  state?: string,
  params?: Omit<UseQueryOptions<City[]>, "queryKey">
) =>
  useQuery<City[]>({
    queryKey: ["cities", state],
    queryFn: () => getCities(state),
    ...params,
  });

export const useDistrictsQuery = (
  city?: string,
  params?: Omit<UseQueryOptions<{ name: string }[]>, "queryKey">
) =>
  useQuery<{ name: string }[]>({
    queryKey: ["districts", city],
    queryFn: () => getDistricts(city),
    ...params,
  });

export const useEntityFiltersQuery = (
  { entity, column }: { entity: string; column: string },
  params?: Omit<UseQueryOptions<string[]>, "queryKey">
) =>
  useQuery<string[]>({
    queryKey: ["entity_filters", entity, column],
    queryFn: () => getEntityFilters(entity, column),
    ...params,
  });

export const useUploadImageMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: uploadImage,
    ...params,
    ...defaultParams(params),
  });
