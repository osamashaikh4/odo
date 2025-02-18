import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getNotifications } from "../api/notification";

export interface Notification {
  notificationID: string;
  userID: string;
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
  params?: Omit<UseQueryOptions<Notification[]>, "queryKey">
) =>
  useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    ...params,
  });
