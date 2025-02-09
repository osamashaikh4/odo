import axios from "./axios";

export const getIntegrations = () =>
  axios.get("/integrations").then((res) => res.data);

export const getIntegration = (id: string) =>
  axios.get("/integrations/" + id).then((res) => res.data);

export const getConnections = () =>
  axios.get("/integrations/connections").then((res) => res.data);

export const authorizeIntegration = (data: { integrationID: string }) =>
  axios.post("/integrations/authorize", data).then((res) => res.data);

export const saveIntegration = (data: {
  integrationID: string;
  authorizationCode: string;
}) => axios.post("/integrations/save", data).then((res) => res.data);

export const removeConnection = (id: string) =>
  axios.delete("/integrations/connections/" + id).then((res) => res.data);

export const syncOrders = (data: any) =>
  axios.post("/integrations/sync-orders", data).then((res) => res.data);
