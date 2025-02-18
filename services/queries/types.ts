export type MutationParams = {
  onSuccess?: (data: any) => Promise<unknown> | unknown;
  onError?: (error: any) => Promise<unknown> | unknown;
};

export type Filter = {
  limit: number;
  startDate?: string;
  endDate?: string;
  offset: number;
};
