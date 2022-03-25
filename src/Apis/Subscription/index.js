import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const getSubscriptionLogs = (page, perPage, search_string, from, to) =>
  axios({
    url: `${connection_string}/subscription/admin/logs`,
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
