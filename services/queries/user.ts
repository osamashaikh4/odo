import { useMutation } from "@tanstack/react-query";
import { login, register, update } from "../api/user";
import { MutationParams } from "./types";
import { defaultParams } from "./utils";

export type User = {
  userID: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  password: string;
  contact?: string | null;
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

export const useUpdateUserMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: update,
    ...params,
    ...defaultParams(params),
  });
