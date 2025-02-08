import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { MutationParams } from "./types";
import { getCountries, getStates, uploadImage } from "../api/common";
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
  params?: Omit<UseQueryOptions<City[]>, "queryKey">
) =>
  useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: getStates,
    ...params,
  });

export const useUploadImageMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: uploadImage,
    ...params,
    ...defaultParams(params),
  });
