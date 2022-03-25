import axios from "axios";
import { connection_string } from "../../Util/connection_strings";
import { getAuthHeader } from "../../Util/authHeader";

export const login = (data) =>
  axios({
    url: `${connection_string}/auth/admin/login`,
    method: "POST",
    data,
  });

export const recoverPassword = (data) =>
  axios({
    url: `${connection_string}/auth/recover`,
    method: "POST",
    data,
  });

export const verifyCode = (data) =>
  axios({
    url: `${connection_string}/auth/verify`,
    method: "POST",
    data,
  });

export const resetPassword = (data) =>
  axios({
    url: `${connection_string}/auth/reset`,
    method: "POST",
    data,
  });

export const me = () =>
  axios({
    url: `${connection_string}/admin/`,
    method: "GET",
    headers: getAuthHeader(),
  });
