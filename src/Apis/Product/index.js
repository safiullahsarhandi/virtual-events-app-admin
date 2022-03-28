import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const addProduct = (data) =>
  axios({
    url: `${connection_string}/product/admin/add`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });

export const editProduct = (data) =>
  axios({
    url: `${connection_string}/product/admin/edit`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });

export const getProductLogs = (
  page,
  perPage,
  search_string,
  status,
  from,
  to
) =>
  axios({
    url: `${connection_string}/product/admin/logs`,
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

export const chagneStatusProduct = (id) =>
  axios({
    url: `${connection_string}/product/admin/status/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });

export const getProductDetails = (id) =>
  axios({
    url: `${connection_string}/product/details/${id}`,
    method: "GET",
  });
