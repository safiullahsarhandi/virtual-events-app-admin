import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const getFeedbackLogs = (page, perPage, search_string, from, to) =>
  axios({
    url: `${connection_string}/feedback/admin/logs`,
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

export const getFeedbackDetails = (id) =>
  axios({
    url: `${connection_string}/feedback/admin/details/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });
