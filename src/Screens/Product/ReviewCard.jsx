import React from "react";
import { useMutation } from "react-query";
import StarRatings from "react-star-ratings/build/star-ratings";
import { queryClient } from "../..";
import { deleteReview } from "../../Apis";
import Button from "../../Components/Elements/Form/Button";
import Avatar from "../../Components/Elements/Icons/Avatar";
import Confirmation from "../../Components/Elements/Modals/Modal.Confirmation";
import Error from "../../Components/Elements/Modals/Modal.Error";
import Success from "../../Components/Elements/Modals/Modal.Success";

export default function ReviewCard({ review }) {
  const { mutate, isLoading } = useMutation((data) => deleteReview(data), {
    onSuccess: (res) => {
      Success(res?.data?.message);
      queryClient.invalidateQueries("product_reviews");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });

  return (
    <div className="d-flex justify-content-between align-items-start mt-2">
      <div className="d-sm-flex">
        <Avatar url={review?.user?.user_image} className="mr-2 review-img" />
        <div>
          <h6 className="review-name">{review?.user?.name}</h6>
          <div>
            <StarRatings
              rating={review?.rating}
              starRatedColor="#EFAA25"
              starHoverColor="#EFAA25"
              numberOfStars={5}
              name="rating"
              starDimension="18px"
              starSpacing="0px"
            />
            <span className="rating mt-1 d-inline-block ml-1">
              {review?.rating}
            </span>
          </div>
          <p className="review-para">{review?.review}</p>
        </div>
      </div>
      <Button
        className="review-btn"
        loading={isLoading}
        onClick={() =>
          Confirmation(
            "Are You Sure You Want To Delete This Review?",
            "Yes",
            () => mutate(review?._id)
          )
        }
      >
        <i className="fas fa-times" />
      </Button>
    </div>
  );
}
