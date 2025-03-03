import axios from "./axios";
import queryString from "query-string";
import { Filter } from "../queries/types";

export const getOrders = ({ type, ...filters }: Filter) =>
  axios
    .get(
      `/orders/${type}?` +
        queryString.stringify(filters, {
          skipEmptyString: true,
          skipNull: true,
        })
    )
    .then((res) => res.data);

export const getOrder = (orderID: string) =>
  axios.get(`/orders/${orderID}`).then((res) => res.data);

export const getOrdersDetail = (orderIDs: string[]) =>
  axios
    .get(`/orders/getOrdersDetail?${queryString.stringify({ orderIDs })}`)
    .then((res) => res.data);

export const getOrderNumber = () =>
  axios.get("/orders/getOrderNumber").then((res) => res.data);

export const createOrder = (data: any) =>
  axios.post("/orders", data).then((res) => res.data);

export const updateOrder = ({ orderID, ...data }: any) =>
  axios.put("/orders/" + orderID, data).then((res) => res.data);

export const getCustomerSuggestion = (search?: string) =>
  axios
    .get(`/orders/getCustomerSuggestion${search ? `?search=${search}` : ""}`)
    .then((res) => res.data);

export const getProductsAutoComplete = (search?: string) =>
  axios
    .get(`/orders/getProductsAutoComplete${search ? `?search=${search}` : ""}`)
    .then((res) => res.data);

export const exportOrders = () =>
  axios.post("/orders/export").then((res) => res.data);

export const shipOrders = (data: any) =>
  axios.post("/orders/shipment", data).then((res) => res.data);

export const cancelOrder = ({ orderID, ...data }: any) =>
  axios.post(`/orders/${orderID}/cancel`, data).then((res) => res.data);

export const reallocateOrder = ({ orderID, ...data }: any) =>
  axios.post(`/orders/${orderID}/reallocate`, data).then((res) => res.data);
