import { useMutation } from "@tanstack/react-query";
import { MutationParams } from "./types";
import { uploadImage } from "../api/common";
import { defaultParams } from "./utils";

export const useUploadImageMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: uploadImage,
    ...params,
    ...defaultParams(params),
  });
