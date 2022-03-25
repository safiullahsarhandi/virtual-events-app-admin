import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const getNotificationLogs = (page, perPage) =>
  axios({
    url: `${connection_string}/notification/admin/get`,
    method: "GET",
    params: {
      page,
      perPage,
    },
    headers: getAuthHeader(),
  });

export const getNotificationCount = () =>
  axios({
    url: `${connection_string}/notification/admin/count`,
    method: "GET",
    headers: getAuthHeader(),
  });

export const readNotification = (id) =>
  axios({
    url: `${connection_string}/notification/admin/read/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });
