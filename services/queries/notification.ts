import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getNotifications, readNotification } from "../api/notification";
import { Filter, MutationParams } from "./types";

export interface Notification {
  notificationID: string;
  userID: string;
  notificationTitle: string;
  entityID: any;
  entity: string;
  notificationText: string;
  notificationStatus: number;
  link: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useNotificationsQuery = (
  filters: Filter,
  params?: Omit<UseQueryOptions<Notification[]>, "queryKey">
) =>
  useQuery<Notification[]>({
    queryKey: ["notifications", filters],
    queryFn: () => getNotifications(filters),
    ...params,
  });

export const useReadNotificationMutation = (params: MutationParams) =>
  useMutation({
    mutationFn: readNotification,
    ...params,
  });
