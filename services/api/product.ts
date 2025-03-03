import axios from "./axios";
import queryString from "query-string";
import { Filter } from "../queries/types";

export const getProducts = ({ type, ...filters }: Filter) =>
  axios
    .get(
      `/products?` +
        queryString.stringify(filters, {
          skipEmptyString: true,
          skipNull: true,
        })
    )
    .then((res) => res.data);

export const getProduct = (productID: string) =>
  axios.get(`/products/${productID}`).then((res) => res.data);

export const addProduct = (data: any) =>
  axios.post("/products", data).then((res) => res.data);

export const updateProduct = ({ productID, ...data }: any) =>
  axios.put(`/products/${productID}`, data).then((res) => res.data);

export const exportProducts = () =>
  axios.post("/products/export").then((res) => res.data);
