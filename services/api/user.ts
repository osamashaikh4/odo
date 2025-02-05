import axios from "./axios";
import { User } from "../queries/user";

export const register = (data: User) =>
  axios.post("/users/register.php", data).then((res) => res.data);

export const login = (data: User) =>
  axios.post("/users/login.php", data).then((res) => res.data);

export const update = (data: Partial<User>) =>
  axios.post("/users/update.php", data).then((res) => res.data);

export const getUserDetails = (userID: string) =>
  axios.get("/users/details.php?userID=" + userID).then((res) => res.data);
