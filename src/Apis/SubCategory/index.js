import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const addSubCategory = (data) =>
  axios({
    url: `${connection_string}/subCategory/admin/add`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });

export const updateSubCategory = (data) =>
  axios({
    url: `${connection_string}/subCategory/admin/update`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });

export const searchSubCategories = (searchString,params = {}) =>
  axios({
    url: `${connection_string}/subCategory/admin/search`,
    method: "GET",
    params: {
      searchString,
      ...params,
    },
    headers: getAuthHeader(),
  });
