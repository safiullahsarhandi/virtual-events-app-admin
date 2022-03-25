import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getCategory } from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import Avatar from "../../Components/Elements/Icons/Avatar";

export default function ViewCategory() {
  const { id } = useParams();

  const { data, isLoading } = useQuery(["category", id], () => getCategory(id));

  return (
    <AppRoot loading={isLoading}>
      <div className="row">
        <div className="col-12 px-xl-4 pt-xl-2">
          <div className="card mb-sm-5 mx-2">
            <div className="card-content collapse show">
              <div className="card-dashboard">
                <div className="row">
                  <div className="col-12 d-flex align-items-center">
                    <Link to="/category/logs">
                      <i className="fas fa-chevron-left back-arrow mr-1" />
                    </Link>
                    <h5 className="main-heading d-inline-block">
                      View Category
                    </h5>
                  </div>
                </div>
                <div className="white-div p-3 mt-3">
                  <div className="white-div-2 py-lg-5 py-2 pl-lg-5">
                    <div className="row">
                      <div className="col-xl-8">
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Category Title:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-xl-1">
                            <p className="label-value">
                              {data?.data?.category?.name}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Sub Categories Title:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-xl-1">
                            {data?.data?.category?.sub_categories?.map(
                              (sub_category) => (
                                <p className="label-value">
                                  {sub_category?.name}
                                </p>
                              )
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Number of Products:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-xl-1">
                            <p className="label-value d-inline-block mr-1">
                              {data?.data?.category?.no_products || 0}
                            </p>
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
                              {data?.data?.category?.status
                                ? "Active"
                                : "Inactive"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="white-div-2 py-lg-5 py-2 pl-lg-5 mt-3">
                    <div className="row">
                      <div className="col-12">
                        <h6 className="description-hading">
                          Description And Image
                        </h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 mt-3">
                        <Avatar
                          className="img-fluid description-img"
                          url={data?.data?.category?.category_image}
                        />
                      </div>
                      <div className="col-lg-6 mt-3">
                        <div className="white-div description-pp">
                          <p style={{ whiteSpace: "pre-line" }}>
                            {data?.data?.category?.description}
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
      </div>
    </AppRoot>
  );
}
