import React from "react";
import AppRoot from "../../Components/AppRoot";

export default function Dashboard() {
  return (
    <AppRoot>
      <div className="row">
        <div className="col-12">
          <div className="card ">
            <div className="card-content collapse show">
              <div className="card-dashboard">
                <div className="row">
                  <div className="col-12">
                    <h2 className="main-heading">Dashboard</h2>
                  </div>
                  <div className="col-12 mt-3">
                    <div className="white-div">
                      <div className="row">
                        <div className="col-lg-4 mt-1">
                          <div className="dash-card mb-0">
                            <h5 className="card-heading">105</h5>
                            <h3 className="card-number">Total Users</h3>
                            <p className="card-percent">
                              10%{" "}
                              <span>
                                <i className="fas fa-arrow-up" />
                              </span>{" "}
                              Since Last Week
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4 mt-1">
                          <div className="dash-card mb-0">
                            <h5 className="card-heading">213</h5>
                            <h3 className="card-number">Total Events Hosted</h3>
                            <p className="card-percent">
                              10%{" "}
                              <span>
                                <i className="fas fa-arrow-up" />
                              </span>{" "}
                              Since Last Week
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4 mt-1">
                          <div className="dash-card mb-0">
                            <h5 className="card-heading">112</h5>
                            <h3 className="card-number">
                              Total Subscriptions Purchased
                            </h3>
                            <p className="card-percent">
                              10%{" "}
                              <span>
                                <i className="fas fa-arrow-up" />
                              </span>{" "}
                              Since Last Week
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="white-div mt-3">
                  <div className="row">
                    <div className="col-12 mt-4">
                      <h3 className="sub-heading">Events Stats</h3>
                    </div>
                    <div className="col-lg-9">
                      <img
                        src="images/graph.png"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-lg-3">
                      <div className="form-field">
                        <select className="select-dropd" name id required>
                          <option value>Year</option>
                          <option value>2019</option>
                          <option value>2018</option>
                        </select>
                        <i
                          className="fa fa-chevron-down right-icon select-drop"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="dash-card mt-3">
                        <h5 className="legend-heading">Legend</h5>
                        <ul className="legend-ul">
                          <li>No. of Events</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="white-div mt-3">
                  <div className="row">
                    <div className="col-12 mt-4">
                      <h3 className="sub-heading">Subscription Stats</h3>
                    </div>
                    <div className="col-lg-9">
                      <img
                        src="images/graph.png"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-lg-3">
                      <div className="form-field">
                        <select className="select-dropd" name id required>
                          <option value>Year</option>
                          <option value>2019</option>
                          <option value>2018</option>
                        </select>
                        <i
                          className="fa fa-chevron-down right-icon select-drop"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="dash-card mt-3">
                        <h5 className="legend-heading">Legend</h5>
                        <ul className="legend-ul">
                          <li>No. of Events</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="white-div mt-3">
                  <div className="row">
                    <div className="col-12 mt-4">
                      <h3 className="sub-heading">Earning Stats</h3>
                    </div>
                    <div className="col-lg-9">
                      <img
                        src="images/graph.png"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-lg-3">
                      <div className="form-field">
                        <select className="select-dropd" name id required>
                          <option value>Year</option>
                          <option value>2019</option>
                          <option value>2018</option>
                        </select>
                        <i
                          className="fa fa-chevron-down right-icon select-drop"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="dash-card mt-3">
                        <h5 className="legend-heading">Legend</h5>
                        <ul className="legend-ul">
                          <li>No. of Events</li>
                        </ul>
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
