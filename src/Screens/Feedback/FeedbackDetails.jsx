import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getFeedbackDetails } from "../../Apis";
import AppRoot from "../../Components/AppRoot";

export default function FeedbackDetails() {
  const { id } = useParams();

  const { data, isLoading } = useQuery(["feedback_details", id], () =>
    getFeedbackDetails(id)
  );

  return (
    <AppRoot loading={isLoading}>
      <div className="row">
        <div className="col-12 px-xl-4 pt-xl-2">
          <div className="card mb-sm-5 mx-2">
            <div className="card-content collapse show">
              <div className="card-dashboard">
                <div className="row">
                  <div className="col-12 d-flex align-items-center">
                    <Link to="/feedback/logs">
                      <i className="fas fa-chevron-left back-arrow mr-1" />
                    </Link>
                    <h5 className="main-heading d-inline-block">
                      Query Details
                    </h5>
                  </div>
                </div>
                <div className="white-div p-3 mt-3">
                  <div className="white-div-2 py-lg-5 py-2 pl-lg-5">
                    <div className="row">
                      <div className="col-lg-4 mt-1">
                        <label htmlFor className="all-label">
                          Name:
                        </label>
                      </div>
                      <div className="col-lg-8 mt-xl-1">
                        <p className="label-value">
                          {data?.data?.feedback?.name}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 mt-1">
                        <label htmlFor className="all-label">
                          Email:
                        </label>
                      </div>
                      <div className="col-lg-8 mt-xl-1">
                        <p className="label-value">
                          {data?.data?.feedback?.email}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 mt-1">
                        <label htmlFor className="all-label">
                          Subject:
                        </label>
                      </div>
                      <div className="col-lg-8 mt-xl-1">
                        <p className="label-value d-inline-block mr-1">
                          {data?.data?.feedback?.subject}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 mt-1">
                        <label htmlFor className="all-label">
                          Message:
                        </label>
                      </div>
                      <div className="col-lg-8 mt-xl-1">
                        <p className="label-value d-inline-block mr-1">
                          {data?.data?.feedback?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppRoot>
  );
}
