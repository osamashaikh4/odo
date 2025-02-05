export type MutationParams = {
  onSuccess?: (data: any) => Promise<unknown> | unknown;
  onError?: (error: any) => Promise<unknown> | unknown;
};
