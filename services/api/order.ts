import axios from "./axios";
import queryString from "query-string";
import { Filter } from "../queries/types";

export const getOrders = (filters: Filter) =>
  axios
    .get(
      "/orders?" +
        queryString.stringify(filters, {
          skipEmptyString: true,
          skipNull: true,
        })
    )
    .then((res) => res.data);

export const getOrderNumber = () =>
  axios.get("/orders/getOrderNumber").then((res) => res.data);

export const createOrder = (data: any) =>
  axios.post("/orders", data).then((res) => res.data);

export const updateOrder = ({ orderID, ...data }: any) =>
  axios.put("/orders/" + orderID, data).then((res) => res.data);
