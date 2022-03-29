import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const paymentLogs = (page, perPage, type) =>
  axios({
    url: `${connection_string}/payment/admin/logs`,
    method: "GET",
    params: {
      page,
      perPage,
      type,
    },
    headers: getAuthHeader(),
  });
