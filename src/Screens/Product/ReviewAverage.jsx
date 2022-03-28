import React from "react";
import StarRatings from "react-star-ratings/build/star-ratings";

export default function ReviewAverage({ ratings, avg }) {
  return (
    <>
      <div className="col-lg-6 text-center">
        <h5 className="number-rating">{avg}</h5>
        <div>
          <StarRatings
            rating={avg}
            starRatedColor="#EFAA25"
            starHoverColor="#EFAA25"
            numberOfStars={5}
            name="rating"
            starDimension="18px"
            starSpacing="0px"
          />
        </div>
      </div>
      <div className="col-lg-6">
        {ratings?.map((rating) => (
          <span
            style={{
              display: "flex",
            }}
          >
            <i className="fas fa-star orange-star-2 mr-1" />
            {rating?.rating}
            <div
              className="progress"
              style={{ height: 5, width: "82%", marginTop: 10, marginLeft: 10 }}
            >
              <div
                className="progress-bar bg-warning"
                style={{ width: `${rating?.count}%` }}
              />
            </div>
          </span>
        ))}
      </div>
    </>
  );
}
