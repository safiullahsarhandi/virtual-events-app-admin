import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const addEventCategory = (data) =>
  axios({
    url: `${connection_string}/eventCategory/admin/add`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });

export const updateEventCategory = (data) =>
  axios({
    url: `${connection_string}/eventCategory/admin/edit`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });

export const getEventCategoryLogs = (
  page,
  perPage,
  search_string,
  status,
  from,
  to
) =>
  axios({
    url: `${connection_string}/eventCategory/admin/logs`,
    method: "GET",
    params: {
      page,
      perPage,
      searchString: search_string,
      status,
      from,
      to,
    },
    headers: getAuthHeader(),
  });

export const changeEventCategoryStatus = (id) =>
  axios({
    url: `${connection_string}/eventCategory/admin/status/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });

export const getEventCategory = (id) =>
  axios({
    url: `${connection_string}/eventCategory/admin/get/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });
