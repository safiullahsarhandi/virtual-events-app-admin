import React from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

import { changeUserStatus, getUserDetails } from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import Button from "../../Components/Elements/Form/Button";
import Avatar from "../../Components/Elements/Icons/Avatar";
import Error from "../../Components/Elements/Modals/Modal.Error";
import Success from "../../Components/Elements/Modals/Modal.Success";
import SubscriptionCard from "./Components/SubscriptionCard";
import SubscriptionLogs from "./Components/SubscriptionLogs";

export default function UserDetails() {
  const { id } = useParams();

  const { data, isLoading, refetch } = useQuery(["user", id], () =>
    getUserDetails(id)
  );

  const { mutate, isLoading: loadingStatus } = useMutation(
    (id) => changeUserStatus(id),
    {
      onSuccess: (res) => {
        refetch();
        Success(res?.data?.message);
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );

  return (
    <>
      <AppRoot loading={isLoading}>
        <div className="row">
          <div className="col-12 px-xl-4 pt-xl-2">
            <div className="card mb-sm-5 mx-2">
              <div className="card-content collapse show">
                <div className="card-dashboard">
                  <div className="row">
                    <div className="col-12 d-flex align-items-center">
                      <Link to="/user/logs">
                        <i className="fas fa-chevron-left back-arrow mr-1" />
                      </Link>
                      <h5 className="main-heading d-inline-block">View User</h5>
                    </div>
                  </div>
                  <div className="white-div mt-3 p-lg-3">
                    <div className="white-div-2 py-lg-5">
                      <div className="row">
                        <div className="col-12 mb-2">
                          <h5 className="filter-heading">Profile Details</h5>
                        </div>
                        <div className="col-xl-2 order-xl-1 order-2 mt-xl-0 mt-2">
                          <Avatar
                            className="admin-profile img-fluid"
                            url={data?.data?.user?.user_image}
                          />
                        </div>
                        <div className="col-xl-7 order-xl-2 order-3">
                          <div className="row">
                            <div className="col-lg-6 mt-1">
                              <label htmlFor className="all-label">
                                Full Name:
                              </label>
                            </div>
                            <div className="col-lg-6 mt-1">
                              <p className="label-value">
                                {data?.data?.user?.name}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6 mt-1">
                              <label htmlFor className="all-label">
                                Email:
                              </label>
                            </div>
                            <div className="col-lg-6 mt-1">
                              <p className="label-value">
                                {data?.data?.user?.auth?.email}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6 mt-1">
                              <label htmlFor className="all-label">
                                Phone Number:
                              </label>
                            </div>
                            <div className="col-lg-6 mt-1">
                              <p className="label-value">
                                {data?.data?.user?.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 text-right mt-lg-0 mt-2 order-xl-3 order-1">
                          <h6 className="statuss">
                            Status{" "}
                            <span className="active-span">
                              {data?.data?.user?.status ? "Active" : "Inactive"}
                            </span>
                          </h6>
                          <Button
                            type="button"
                            className="site-btn d-inline-block px-2 mt-2"
                            loading={loadingStatus}
                            onClick={() => mutate(id)}
                          >
                            Mark as Inactive
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="white-div-2 py-lg-5 mt-3">
                      <div className="row">
                        <div className="col-lg-6">
                          <h5 className="filter-heading">
                            Current Subscription
                          </h5>
                        </div>
                        {!data?.data?.user?.is_subscribed && (
                          <div className="col-lg-12">
                            <h3>Currently Not Subscribed</h3>
                          </div>
                        )}
                        {data?.data?.user?.subscription &&
                          data?.data?.user?.is_subscribed && (
                            <>
                              <div className="col-lg-6 mb-2 text-right">
                                <button
                                  type="button"
                                  className="site-btn d-inline-block px-2"
                                >
                                  Cancel Subscription
                                </button>
                              </div>
                              <div className="col-xl-7">
                                <SubscriptionCard
                                  subscription={data?.data?.user?.subscription}
                                />
                              </div>
                            </>
                          )}
                      </div>
                      <div className="row">
                        <div className="col-12 mt-3">
                          <h5 className="filter-heading">
                            Subscription History
                          </h5>
                          <hr />
                        </div>
                      </div>
                      {/* SUBSCRIPTION TABLE HERE */}
                      <SubscriptionLogs user={data?.data?.user?._id} />
                    </div>
                    <div className="white-div-2 mt-3">
                      <div className="row">
                        <div className="col-12">
                          <h5 className="filter-heading">Events</h5>
                        </div>
                        {/* EVENTS TABLE HERE */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppRoot>
    </>
  );
}
