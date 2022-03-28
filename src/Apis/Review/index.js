import axios from "axios";
import { getAuthHeader } from "../../Util/authHeader";
import { connection_string } from "../../Util/connection_strings";

export const getProductReviews = (page, perPage, id) =>
  axios({
    url: `${connection_string}/review/admin/product/${id}`,
    method: "GET",
    params: {
      page,
      perPage,
    },
    headers: getAuthHeader(),
  });

export const deleteReview = (id) =>
  axios({
    url: `${connection_string}/review/admin/delete/${id}`,
    method: "DELETE",
    headers: getAuthHeader(),
  });
