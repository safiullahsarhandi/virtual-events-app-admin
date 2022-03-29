import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const addStoryCategory = (data) =>
  axios({
    url: `${connection_string}/storyCategory/admin/add`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });

export const updateStoryCategory = (data) =>
  axios({
    url: `${connection_string}/storyCategory/admin/edit`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });

export const getStoryCategoryLogs = (
  page,
  perPage,
  search_string,
  status,
  from,
  to
) =>
  axios({
    url: `${connection_string}/storyCategory/admin/logs`,
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

export const changeStoryCategoryStatus = (id) =>
  axios({
    url: `${connection_string}/storyCategory/admin/status/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });

export const getStoryCategory = (id) =>
  axios({
    url: `${connection_string}/storyCategory/admin/get/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });
