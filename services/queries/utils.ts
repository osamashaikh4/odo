import { MutationParams } from "./types";
import { onErrorToast, onSuccessToast } from "@/helpers/toast";

export const defaultParams = (params: MutationParams) => ({
  onError(error: any) {
    onErrorToast(error);
    if (params.onError) params.onError(error);
  },
  onSuccess(data: any) {
    if (params.onSuccess) params.onSuccess(data);
    setTimeout(() => {
      onSuccessToast(data);
    }, 500);
  },
});
