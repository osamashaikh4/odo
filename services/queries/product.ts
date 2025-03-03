import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Filter, MutationParams } from "./types";
import {
  addProduct,
  exportProducts,
  getProduct,
  getProducts,
  updateProduct,
} from "../api/product";
import { defaultParams } from "./utils";

export type Product = {
  productID: string;
  productName: string;
  productSku: string;
  productPrice: number;
  productTax: number;
  productDescription: string;
  productCurrency: string;
  productBarcode: string;
  productImage: string;
  productCategory: string;
};

type GetProductsResponse = { results: Product[]; count: number };

export const useProductsQuery = (
  filters: Filter,
  params?: Omit<UseQueryOptions<GetProductsResponse>, "queryKey">
) =>
  useQuery<GetProductsResponse>({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    ...params,
  });

export const useProductQuery = (
  productID: string,
  params?: Omit<UseQueryOptions<Product>, "queryKey">
) =>
  useQuery<Product>({
    queryKey: ["product", productID],
    queryFn: () => getProduct(productID),
    ...params,
  });

export const useAddProductMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: addProduct,
    ...params,
    ...defaultParams(params),
  });

export const useUpdateProductMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: updateProduct,
    ...params,
    ...defaultParams(params),
  });

export const useExportProductsMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: exportProducts,
    ...params,
    ...defaultParams(params),
  });
