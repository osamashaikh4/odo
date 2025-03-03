import { useMutation } from "@tanstack/react-query";
import { MutationParams } from "./types";
import { uploadAsset } from "../api/asset";
import { defaultParams } from "./utils";

export const useUploadAssetMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: uploadAsset,
    ...params,
    ...defaultParams(params),
  });
