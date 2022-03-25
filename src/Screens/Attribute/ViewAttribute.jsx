import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getAttributeDetails } from "../../Apis";
import AppRoot from "../../Components/AppRoot";

export default function ViewAttribute() {
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    ["attribute_details", id],
    () => id && getAttributeDetails(id)
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
                    <Link to="/attribute/logs">
                      <i className="fas fa-chevron-left back-arrow mr-1" />
                    </Link>
                    <h5 className="main-heading d-inline-block">
                      View Attributes
                    </h5>
                  </div>
                </div>
                <div className="white-div p-3 mt-3">
                  <div className="white-div-2 py-5 pl-lg-5">
                    <div className="row">
                      <div className="col-xl-8">
                        <form action="edit-event-categories.php">
                          <div className="row">
                            <div className="col-lg-6 mt-1">
                              <label htmlFor className="all-label">
                                Attribute Name:
                              </label>
                            </div>
                            <div className="col-lg-6 mt-xl-1">
                              <p className="label-value">
                                {data?.data?.attribute?.name}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6 mt-1">
                              <label htmlFor className="all-label">
                                SKU:
                              </label>
                            </div>
                            <div className="col-lg-6 mt-xl-1">
                              <p className="label-value">
                                {data?.data?.attribute?.sku}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6 mt-1">
                              <label htmlFor className="all-label">
                                Enter Attribute Value:
                              </label>
                            </div>
                            <div className="col-lg-6 mt-xl-1">
                              {data?.data?.attribute?.attribute_values?.map(
                                (value) => (
                                  <p
                                    className="label-value d-inline-block mr-1"
                                    key={value?._id}
                                  >
                                    {value?.name}
                                  </p>
                                )
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6 mt-1">
                              <label htmlFor className="all-label">
                                Status:
                              </label>
                            </div>
                            <div className="col-lg-6 mt-xl-1">
                              <p className="label-value">
                                {data?.data?.attribute?.status
                                  ? "Active"
                                  : "Inactive"}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Link
                              to={`/attribute/edit/${id}`}
                              className="site-btn d-inline-block mr-1"
                            >
                              EDIT
                            </Link>
                          </div>
                        </form>
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
