import axios from "./axios";
import queryString from "query-string";
import { Filter } from "../queries/types";

export const getNotifications = (filters: Filter) =>
  axios
    .get(`/notifications?${queryString.stringify(filters)}`)
    .then((res) => res.data);

export const readNotification = (data: any) =>
  axios.put(`/notifications/read`, data).then((res) => res.data);
