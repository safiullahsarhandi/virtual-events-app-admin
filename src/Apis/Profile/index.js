import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const updateAdmin = (data) =>
  axios({
    url: `${connection_string}/admin/`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });

export const updatePassword = (data) =>
  axios({
    url: `${connection_string}/admin/password`,
    method: "POST",
    data,
    headers: getAuthHeader(),
  });
