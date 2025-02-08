import axios from "./axios";

export const getWarehouse = () =>
  axios.get("/warehouses").then((res) => res.data);

export const createWarehouse = (data: any) =>
  axios.post("/warehouses", data).then((res) => res.data);

export const updateWarehouse = ({ warehouseID, ...data }: any) =>
  axios.put("/warehouses/" + warehouseID, data).then((res) => res.data);
