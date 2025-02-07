import axios from "./axios";

export const getIntegrations = () =>
  axios.get("/integrations").then((res) => res.data);

export const getIntegration = (id: string) =>
  axios.get("/integrations/" + id).then((res) => res.data);

export const authorizeIntegration = (data: { integrationID: string }) =>
  axios.post("/integrations/authorize", data).then((res) => res.data);

export const saveIntegration = (data: {
  integrationID: string;
  authorizationCode: string;
}) => axios.post("/integrations/save", data).then((res) => res.data);
