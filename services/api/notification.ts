import axios from "./axios";

export const getNotifications = () =>
  axios.get("/notifications").then((res) => res.data);
