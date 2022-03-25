import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const getPackageLogs = (page, perPage, search_string, from, to) =>
  axios({
    url: `${connection_string}/package/admin/logs`,
    method: "GET",
    params: {
      page,
      perPage,
      searchString: search_string,
      from,
      to,
    },
    headers: getAuthHeader(),
  });

export const getPackageDetails = (id) =>
  axios({
    url: `${connection_string}/package/admin/details/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });

export const editPackage = (data) =>
  axios({
    url: `${connection_string}/package/admin/edit`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });

export const addPackage = (data) =>
  axios({
    url: `${connection_string}/package/admin/add`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });

export const changePackageStatus = (id) =>
  axios({
    url: `${connection_string}/package/admin/status/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });
