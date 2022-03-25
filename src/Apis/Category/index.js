import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const addCategory = (data) =>
  axios({
    url: `${connection_string}/category/admin/add`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });

export const editCateogry = (data) =>
  axios({
    url: `${connection_string}/category/admin/edit`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });

export const getCategoryLogs = (
  page,
  perPage,
  search_string,
  status,
  from,
  to
) =>
  axios({
    url: `${connection_string}/category/admin/logs`,
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

export const changeCategoryStatus = (id) =>
  axios({
    url: `${connection_string}/category/admin/status/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });

export const getCategory = (id) =>
  axios({
    url: `${connection_string}/category/admin/get/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });
