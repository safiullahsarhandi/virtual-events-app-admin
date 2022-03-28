import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const createAttribute = (data) =>
  axios({
    url: `${connection_string}/attribute/admin/create`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });

export const editAttribute = (data) =>
  axios({
    url: `${connection_string}/attribute/admin/edit`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });

export const getAttributeLogs = (
  page,
  perPage,
  search_string,
  status,
  from,
  to
) =>
  axios({
    url: `${connection_string}/attribute/admin/logs`,
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

export const getAttributeDetails = (id) =>
  axios({
    url: `${connection_string}/attribute/admin/details/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });

export const changeStatusAttribute = (id) =>
  axios({
    url: `${connection_string}/attribute/admin/status/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });

export const getMinAttributes = async (searchString) =>
  await axios({
    url: `${connection_string}/attribute/admin/min`,
    method: "GET",
    params: {
      searchString,
    },
    headers: getAuthHeader(),
  });
