import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const getUserLogs = (
  page,
  perPage,
  search_string,
  status,
  from,
  to,
  selected
) =>
  axios({
    url: `${connection_string}/user/admin/logs`,
    method: "GET",
    params: {
      page,
      perPage,
      searchString: search_string,
      status,
      from,
      to,
      selected,
    },
    headers: getAuthHeader(),
  });

export const changeUserStatus = (id) =>
  axios({
    url: `${connection_string}/user/admin/status/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });

export const getUserDetails = (id) =>
  axios({
    url: `${connection_string}/user/admin/details/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });

export const updateUser = (data) =>
  axios({
    url: `${connection_string}/user/admin/update`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });
