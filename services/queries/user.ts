import { useMutation } from "@tanstack/react-query";
import { login, register } from "../api/user";
import { MutationParams } from "./types";
import { defaultParams } from "./utils";

export type User = {
  userID: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string | null;
};

export type UserCollection = { [key: string]: string[] };

export const useRegisterUserMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: register,
    ...params,
  });

export const useLoginUserMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: login,
    ...params,
  });
