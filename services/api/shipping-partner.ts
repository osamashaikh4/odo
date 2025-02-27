import axios from "./axios";

export const getShippingPartners = () =>
  axios.get("/shipping-partners").then((res) => res.data);

export const getConnectedShippingPartners = () =>
  axios.get("/shipping-partners/connected").then((res) => res.data);

export const getShippingPartner = ({
  id,
  connectionID,
}: {
  id: string;
  connectionID?: string;
}) =>
  axios
    .get(
      connectionID
        ? `/shipping-partners/connected/${connectionID}`
        : `/shipping-partners/${id}`
    )
    .then((res) => res.data);

export const testConnection = (data: any) =>
  axios
    .post("/shipping-partners/test-connection", data)
    .then((res) => res.data);

export const saveShippingPartnerConnection = (data: any) =>
  axios.post("/shipping-partners/save", data).then((res) => res.data);

export const updateShippingPartnerConnection = ({ id, ...data }: any) =>
  axios.put(`/shipping-partners/connected/${id}`, data).then((res) => res.data);

export const removeShippingPartnerConnection = (id: string) =>
  axios.delete("/shipping-partners/connected/" + id).then((res) => res.data);
