import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const getStoryLogs = (page, perPage, search_string, status, user) =>
  axios({
    url: `${connection_string}/story/admin/logs`,
    method: "GET",
    params: {
      page,
      perPage,
      searchString: search_string,
      status,
      user,
    },
    headers: getAuthHeader(),
  });

export const changeStatusStory = (id) =>
  axios({
    url: `${connection_string}/story/admin/status/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });

export const getStory = (id) =>
  axios({
    url: `${connection_string}/story/admin/story/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });
