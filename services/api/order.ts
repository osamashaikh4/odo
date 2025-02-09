import axios from "./axios";

export const getOrders = () => axios.get("/orders").then((res) => res.data);
