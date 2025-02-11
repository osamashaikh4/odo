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
