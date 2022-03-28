import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

import { getProductDetails } from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import { formatCurrency } from "../../Util/helpers";
import Carousel from "../../Components/Elements/Carousel/Carousel";

import { Parser } from "html-to-react";

const htmlToReactParser = new Parser();

export default function ViewProduct() {
  const { id } = useParams();

  const { data, isLoading } = useQuery(["product", id], () =>
    getProductDetails(id)
  );

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
                            {data?.data?.product.avgRatings} Ratings &amp;{" "}
                            {data?.data?.product.rating || 0} Reviews
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
                          <div className="row mb-4 mx-0">
                            <div className="col-md-6">
                              <div className="showing-result">
                                Showing 1 to 3 of 3 entries
                              </div>
                            </div>
                            <div className="col-md-6 mt-md-0 mt-3">
                              <nav
                                aria-label="Page navigation example"
                                className="text-right"
                              >
                                <ul className="pagination justify-content-lg-end justify-content-center mt-0">
                                  <li className="page-item">
                                    <a className="page-link" href="#">
                                      Previous
                                    </a>
                                  </li>
                                  <li className="page-item active">
                                    <a className="page-link" href="#">
                                      1
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a className="page-link" href="#">
                                      Next
                                    </a>
                                  </li>
                                </ul>
                              </nav>
                            </div>
                          </div>
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
                          <div className="col-lg-6 text-center">
                            <h5 className="number-rating">4.5</h5>
                            <div>
                              <i className="fas fa-star orange-star-2" />
                              <i className="fas fa-star orange-star-2" />
                              <i className="fas fa-star orange-star-2" />
                              <i className="fas fa-star orange-star-2" />
                              <i className="fas fa-star orange-star-2" />
                            </div>
                            <span className="rating mt-1 d-inline-block">
                              <img
                                src="images/user-icon.png"
                                className="mr-1"
                              />
                              81 All Opinions
                            </span>
                          </div>
                          <div className="col-lg-6">
                            <span className="d-block mt-2">
                              <i className="fas fa-star orange-star-2 mr-1" />1
                              <img
                                src="images/line-1.png"
                                alt=""
                                className="img-fluid ml-1"
                              />
                            </span>
                            <span className="d-block mt-2">
                              <i className="fas fa-star orange-star-2 mr-1" />2
                              <img
                                src="images/line-2.png"
                                alt=""
                                className="img-fluid ml-1"
                              />
                            </span>
                            <span className="d-block mt-2">
                              <i className="fas fa-star orange-star-2 mr-1" />3
                              <img
                                src="images/line-3.png"
                                alt=""
                                className="img-fluid ml-1"
                              />
                            </span>
                            <span className="d-block mt-2">
                              <i className="fas fa-star orange-star-2 mr-1" />4
                              <img
                                src="images/line-4.png"
                                alt=""
                                className="img-fluid ml-1"
                              />
                            </span>
                            <span className="d-block mt-2">
                              <i className="fas fa-star orange-star-2 mr-1" />5
                              <img
                                src="images/line-5.png"
                                alt=""
                                className="img-fluid ml-1"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 my-2">
                      <div className="white-div-2 py-lg-5 mt-3 h-100">
                        <h3 className="product-price-33 mb-2">Reviews</h3>
                        <div className="reviews-div">
                          <div className="d-flex justify-content-between align-items-start mt-2">
                            <div className="d-sm-flex">
                              <img
                                src="images/driver-profile.png"
                                alt=""
                                className="mr-2 review-img"
                              />
                              <div>
                                <h6 className="review-name">John Doe</h6>
                                <div>
                                  <i className="fas fa-star orange-star-2" />
                                  <i className="fas fa-star orange-star-2" />
                                  <i className="fas fa-star orange-star-2" />
                                  <i className="fas fa-star orange-star-2" />
                                  <i className="fas fa-star orange-star-2" />
                                  <span className="rating mt-1 d-inline-block">
                                    4.5
                                  </span>
                                </div>
                                <p className="review-para">
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry.
                                </p>
                              </div>
                            </div>
                            <button
                              className="review-btn"
                              data-toggle="modal"
                              data-target="#delete-review"
                              type="button"
                            >
                              <i className="fas fa-times" />
                            </button>
                          </div>
                          <div className="d-flex justify-content-between align-items-start mt-2">
                            <div className="d-sm-flex">
                              <img
                                src="images/driver-profile.png"
                                alt=""
                                className="mr-2 review-img"
                              />
                              <div>
                                <h6 className="review-name">John Doe</h6>
                                <div>
                                  <i className="fas fa-star orange-star-2" />
                                  <i className="fas fa-star orange-star-2" />
                                  <i className="fas fa-star orange-star-2" />
                                  <i className="fas fa-star orange-star-2" />
                                  <i className="fas fa-star orange-star-2" />
                                  <span className="rating mt-1 d-inline-block">
                                    4.5
                                  </span>
                                </div>
                                <p className="review-para">
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry.
                                </p>
                              </div>
                            </div>
                            <button
                              className="review-btn"
                              data-toggle="modal"
                              data-target="#delete-review"
                              type="button"
                            >
                              <i className="fas fa-times" />
                            </button>
                          </div>
                        </div>
                        <a
                          href="#_"
                          className="d-inline-block site-btn ml-lg-5"
                          data-toggle="modal"
                          data-target="#view-review"
                        >
                          VIEW ALL REVIEWS
                        </a>
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
