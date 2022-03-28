import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const orderLogs = (
  page,
  perPage,
  search_string,
  status,
  from,
  to,
  user
) =>
  axios({
    url: `${connection_string}/order/admin/logs`,
    method: "GET",
    params: {
      page,
      perPage,
      searchString: search_string,
      status,
      from,
      to,
      user,
    },
    headers: getAuthHeader(),
  });

export const getOrder = (id) =>
  axios({
    url: `${connection_string}/order/admin/view/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });

export const changeStatusOrder = (data) =>
  axios({
    url: `${connection_string}/order/admin/change-status`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });
