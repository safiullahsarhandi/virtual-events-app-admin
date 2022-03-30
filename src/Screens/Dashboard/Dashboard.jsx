import React, { useState } from "react";
import { useQuery } from "react-query";
import { getDashboardData } from "../../Apis/Dashboard";
import AppRoot from "../../Components/AppRoot";
import { format_number } from "../../Util/helpers";

import Graph from "./Graph";

export default function Dashboard() {
  const [year, setYear] = useState(new Date().getFullYear());

  const { isLoading, data } = useQuery(["data", year], () =>
    getDashboardData(year)
  );

  return (
    <AppRoot loading={isLoading}>
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
                            <h5 className="card-heading">
                              {format_number(data?.data?.total_users)}
                            </h5>
                            <h3 className="card-number">Total Users</h3>
                          </div>
                        </div>
                        <div className="col-lg-4 mt-1">
                          <div className="dash-card mb-0">
                            <h5 className="card-heading">
                              {format_number(data?.data?.events_hosted)}
                            </h5>
                            <h3 className="card-number">Total Events Hosted</h3>
                          </div>
                        </div>
                        <div className="col-lg-4 mt-1">
                          <div className="dash-card mb-0">
                            <h5 className="card-heading">
                              {format_number(
                                data?.data?.subscriptions_purchased
                              )}
                            </h5>
                            <h3 className="card-number">
                              Total Subscriptions Purchased
                            </h3>
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
                      <Graph
                        graph_data={data?.data?.event_stats}
                        label="Events"
                      />
                    </div>
                    <div className="col-lg-3">
                      <div className="form-field">
                        <select
                          className="select-dropd"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        >
                          {[22, 23, 24, 25, 26, 27, 28, 29, 30].map((year) => (
                            <option value={`20${year}`}>20{year}</option>
                          ))}
                        </select>
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
                      <Graph
                        graph_data={data?.data?.subscription_data}
                        label="No. Of Subscriptions"
                      />
                    </div>
                    <div className="col-lg-3">
                      <div className="form-field">
                        <select
                          className="select-dropd"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        >
                          {[22, 23, 24, 25, 26, 27, 28, 29, 30].map((year) => (
                            <option value={`20${year}`}>20{year}</option>
                          ))}
                        </select>
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
                      <Graph
                        graph_data={data?.data?.earning_stats}
                        label="GBP"
                      />
                    </div>
                    <div className="col-lg-3">
                      <div className="form-field">
                        <select
                          className="select-dropd"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        >
                          {[22, 23, 24, 25, 26, 27, 28, 29, 30].map((year) => (
                            <option value={`20${year}`}>20{year}</option>
                          ))}
                        </select>
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
