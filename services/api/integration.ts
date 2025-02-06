import axios from "./axios";

export const getIntegrations = () =>
  axios.get("/integrations").then((res) => res.data);
