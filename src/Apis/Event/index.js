import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const getEventLogs = (
  page,
  perPage,
  search_string,
  status,
  event_category,
  selected,
  user
) =>
  axios({
    url: `${connection_string}/event/admin/logs`,
    method: "GET",
    params: {
      page,
      perPage,
      searchString: search_string,
      status,
      event_category,
      selected,
      user,
    },
    headers: getAuthHeader(),
  });

export const getEvent = (id) =>
  axios({
    url: `${connection_string}/event/admin/get/${id}`,
    method: "GET",
    headers: getAuthHeader(),
  });
