import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getNotifications } from "../api/notification";
import { Filter } from "./types";

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
