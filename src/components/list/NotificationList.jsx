import { FlatList } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import NotificationItem from "../card/NotificationItem";
import axiosInstance from "../../utils/axiosInstance";
import Loading from "../ui/Loading";

export default function NotificationList() {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const { data } = await axiosInstance.get("/user/me/notifications");
      setNotifications(data?.data?.notifications || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const markAllNotificationsAsRead = async () => {
    try {
      await axiosInstance.post("/user/me/notifications/markasread");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadNotifications();
    markAllNotificationsAsRead();
  }, []);

  console.log({ notifications });
  if (loading) return <Loading />;

  return (
    <>
      <FlatList
        data={notifications}
        p="$2"
        keyExtractor={(notice) => notice?._id}
        renderItem={({ item }) => {
          return <NotificationItem notification={item} />;
        }}
        refreshing={loading}
        onRefresh={loadNotifications}
      />
    </>
  );
}
