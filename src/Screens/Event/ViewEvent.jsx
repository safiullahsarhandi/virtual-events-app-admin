import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import { formatCurrency, format_date } from "../../Util/helpers";

export default function ViewEvent() {
  const { id } = useParams();

  const { data, isLoading } = useQuery(["event_details", id], () =>
    getEvent(id)
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
                    <Link to="/event/logs">
                      <i className="fas fa-chevron-left back-arrow mr-1" />
                    </Link>
                    <h5 className="main-heading d-inline-block">View Event</h5>
                  </div>
                </div>
                <div className="white-div mt-3 p-lg-3">
                  <div className="white-div-2 py-lg-5">
                    <div className="row">
                      <div className="col-12 mb-2">
                        <h5 className="filter-heading">View Event</h5>
                      </div>
                      <div className="col-lg-6">
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Event Type:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            <p className="label-value">
                              {data?.data?.event?.event_category?.name}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Event Cost:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            <p className="label-value">
                              {formatCurrency(data?.data?.event?.event_cost)}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Event Name:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            <p className="label-value">
                              {data?.data?.event?.name}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Guest of Honor:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            <p className="label-value">
                              {data?.data?.event?.guest_of_honor}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Event Date:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            <p className="label-value">
                              {format_date(data?.data?.event?.date)}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Event Time:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            <p className="label-value">
                              {data?.data?.event?.time}
                            </p>
                          </div>
                        </div>
                        {/* ADD MEDIA AFTER USER PANEL IS COMPELTED */}
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Audio Media:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            {!data?.data?.event?.media ? (
                              "No Audio Media"
                            ) : (
                              <a href="#_" className="audio-link">
                                <img
                                  src="images/play.png"
                                  alt=""
                                  className="mr-1"
                                />
                                Birthday_Song.mp3
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Repeating Frequency:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            {!data?.data?.event?.media ? (
                              "No Audio Media"
                            ) : (
                              <p className="label-value">
                                1-hour Loop Attendee Uploads Allowed
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Event Link:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            {/* <a href="#_" className="audio-link">
                              <img
                                src="images/link.png"
                                alt=""
                                className="mr-1"
                              />
                              www.eventlink.com
                            </a> */}
                            To Be Implemented
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <img
                          src="images/event-side.png"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12">
                        <h5 className="filter-heading">Invite Details</h5>
                      </div>
                    </div>
                    {/* IMPLEMENT THESE AFTER USER PANEL IS COMPLETED */}
                    <div className="row">
                      <div className="col-lg-3 mt-1">
                        <label htmlFor className="all-label">
                          No Participants Yet!
                        </label>
                      </div>
                    </div>
                    {/* <div className="row">
                      <div className="col-lg-3 mt-1">
                        <label htmlFor className="all-label">
                          Email Addresses:
                        </label>
                      </div>
                      <div className="col-lg-9 mt-1">
                        <p className="label-value">
                          elsa@sample.com, 123elsa@sample.com,
                          456elsa@sample.com, 789elsa@sample.com
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 mt-1">
                        <label htmlFor className="all-label">
                          Shareable Link:
                        </label>
                      </div>
                      <div className="col-lg-9 mt-1">
                        <a href="#_" className="audio-link">
                          <img src="images/link.png" alt="" className="mr-1" />
                          www.eventlink.com{" "}
                          <img src="images/copy.png" className="ml-2" alt="" />
                        </a>
                      </div>
                    </div> */}
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
