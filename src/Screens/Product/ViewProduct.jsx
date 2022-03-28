import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

import { getProductDetails, getProductReviews } from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import { formatCurrency } from "../../Util/helpers";
import Carousel from "../../Components/Elements/Carousel/Carousel";

import { Parser } from "html-to-react";
import useTableControls from "../../Hooks/useTableControls";
import useFetchData from "../../Hooks/useFetchData";
import ReviewCard from "./ReviewCard";
import Loading from "../../Components/Elements/Icons/Loading";
import Pagination from "../../Components/Elements/Table/Pagination";
import ReviewAverage from "./ReviewAverage";

const htmlToReactParser = new Parser();

export default function ViewProduct() {
  const { id } = useParams();
  const { perPage } = useTableControls();

  const { data, isLoading } = useQuery(["product", id], () =>
    getProductDetails(id)
  );

  const {
    // INTERNAL EXPORTS
    setPage,
    // REACT QUERY EXPORTS
    isLoading: loadingReviews,
    data: reviewData,
  } = useFetchData("product_reviews", getProductReviews, [perPage, id]);

  return (
    <AppRoot loading={isLoading}>
      <div className="row">
        <div className="col-12 px-xl-4 pt-xl-2">
          <div className="card mb-sm-5 mx-2">
            <div className="card-content collapse show">
              <div className="card-dashboard">
                <div className="row">
                  <div className="col-lg-6 d-flex align-items-center">
                    <a href="products.php">
                      <i className="fas fa-chevron-left back-arrow mr-1" />
                    </a>
                    <h5 className="main-heading d-inline-block">
                      Product Detail
                    </h5>
                  </div>
                  <div className="col-lg-6 text-right mt-lg-0 mt-3 px-3">
                    <a
                      href="edit-product-details.php"
                      className="site-btn d-inline-block"
                    >
                      Edit
                    </a>
                  </div>
                </div>
                <div className="white-div mt-3 p-lg-3">
                  <div className="white-div-2 py-lg-5">
                    <div className="row">
                      <div className="col-lg-6">
                        <Carousel images={data?.data?.product?.images} />
                      </div>
                      <div className="col-lg-6 my-lg" style={{ marginTop: 0 }}>
                        <div className="text-right">
                          <h6 className="statuss">
                            Status{" "}
                            <span className="active-span">
                              {data?.data?.product?.status
                                ? "Active"
                                : "Inactive"}
                            </span>
                          </h6>
                        </div>
                        <h3 className="product-heading mt-lg--5 mt-3">
                          {data?.data?.product?.name}
                        </h3>
                        <div>
                          <StarRatings
                            rating={data?.data?.product.avgRatings}
                            starRatedColor="#EFAA25"
                            starHoverColor="#EFAA25"
                            numberOfStars={5}
                            name="rating"
                            starDimension="18px"
                            starSpacing="0px"
                          />
                          <span className="rating ml-lg-5">
                            {data?.data?.product.avgRatings} Ratings
                          </span>
                        </div>
                        <h5 className="category-abc mt-2">
                          {data?.data?.product?.category?.name}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 my-2">
                      <div className="white-div-2 py-lg-5 mt-3 h-100">
                        <h3 className="product-price-33 mb-2">
                          Product Price:
                        </h3>
                        <p className="sku-color">
                          Base Price:{" "}
                          {formatCurrency(data?.data?.product?.price)}
                        </p>
                        <div className="white-div">
                          <div className="row left-col-border">
                            {data?.data?.product?.attributes?.map((attr) => (
                              <React.Fragment key={attr?._id}>
                                <div
                                  className="col-lg-12"
                                  style={{ textAlign: "center" }}
                                >
                                  <label htmlFor className="all-label">
                                    {attr?.label}:
                                  </label>
                                </div>
                                {attr?.attribute_values?.map((sub_attr) => (
                                  <React.Fragment key={sub_attr?._id}>
                                    <div className="col-lg-6">
                                      <label htmlFor className="all-label">
                                        {sub_attr?.name}:
                                      </label>
                                    </div>
                                    <div className="col-lg-6">
                                      <label htmlFor className="all-label">
                                        {formatCurrency(sub_attr?.price)}
                                      </label>
                                    </div>
                                  </React.Fragment>
                                ))}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 my-2">
                      <div className="white-div-2 py-lg-5 mt-3 h-100">
                        <h3 className="product-price-33 mb-2">Description</h3>
                        {htmlToReactParser.parse(
                          data?.data?.product?.about_product
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="white-div-2 p-lg-3 mt-3 mt-lg-5">
                    <div className="row mx-0">
                      <div className="col-12">
                        <h3 className="product-price-33 mb-2">Attributes:</h3>
                      </div>
                      <div className="col-12">
                        <div className="clearfix" />
                        <div className="maain-tabble table-responsive">
                          <table className="table table-striped table-bordered zero-configuration">
                            <thead>
                              <tr>
                                <th>SKU</th>
                                <th>Arbor Type</th>
                                <th>Diameter</th>
                                <th>Max RPM</th>
                                <th>Pak Size</th>
                                <th>Thickness</th>
                                <th>Type</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>3628</td>
                                <td>7/4</td>
                                <td>7/4</td>
                                <td>13300</td>
                                <td>25</td>
                                <td>0.456 IN</td>
                                <td>01</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 my-2">
                      <div className="white-div-2 py-lg-5 mt-3 h-100">
                        <h3 className="product-price-33 mb-2">
                          Customer Rating:
                        </h3>
                        <div className="row">
                          <ReviewAverage
                            ratings={data?.data?.ratings}
                            avg={data?.data?.product?.avgRatings}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 my-2">
                      <div className="white-div-2 py-lg-5 mt-3 h-100">
                        <h3 className="product-price-33 mb-2">Reviews</h3>
                        <div className="reviews-div">
                          {loadingReviews && (
                            <Loading style={{ fontSize: 32 }} />
                          )}
                          {reviewData?.data?.reviews?.docs?.length === 0 && (
                            <h3>No Reviews Posted Yet!</h3>
                          )}
                          {reviewData?.data?.reviews?.docs?.map((review) => (
                            <ReviewCard review={review} key={review?._id} />
                          ))}
                        </div>
                        <Pagination
                          setPage={setPage}
                          totalPages={reviewData?.data?.reviews?.totalPages}
                        />
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
