import axios from "./axios";

export const getShippingPartners = () =>
  axios.get("/shipping-partners").then((res) => res.data);

export const getShippingPartner = (id: string) =>
  axios.get("/shipping-partners/" + id).then((res) => res.data);

export const testConnection = (data: any) =>
  axios
    .post("/shipping-partners/test-connection", data)
    .then((res) => res.data);
