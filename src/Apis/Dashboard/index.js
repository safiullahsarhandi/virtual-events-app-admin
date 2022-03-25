import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const getDashboardData = (year) =>
  axios({
    url: `${connection_string}/dashboard/admin/`,
    method: "GET",
    params: {
      year,
    },
    headers: getAuthHeader(),
  });
