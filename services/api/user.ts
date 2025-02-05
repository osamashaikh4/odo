import axios from "./axios";
import { User } from "../queries/user";

export const register = (data: User) =>
  axios.post("/users/register", data).then((res) => res.data);

export const login = (data: User) =>
  axios.post("/users/login", data).then((res) => res.data);

export const emailCheck = async (data: { email: string }) =>
  await axios.post("/users/email-check", data);
