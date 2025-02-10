import axios from "./axios";
import queryString from "query-string";
import { Filter } from "../queries/types";

export const getOrders = (filters: Filter) =>
  axios
    .get("/orders?" + queryString.stringify(filters))
    .then((res) => res.data);
