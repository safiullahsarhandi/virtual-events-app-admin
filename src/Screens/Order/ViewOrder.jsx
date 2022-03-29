import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { changeStatusOrder, getOrder } from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import Error from "../../Components/Elements/Modals/Modal.Error";
import Success from "../../Components/Elements/Modals/Modal.Success";
import { formatCurrency, format_date } from "../../Util/helpers";

export default function ViewOrder() {
  const { id } = useParams();
  const [status, setOrderStatus] = useState();

  const { isLoading, data, refetch } = useQuery(
    ["order", id],
    () => getOrder(id),
    {
      onSuccess: (res) => {
        setOrderStatus(res?.data?.order?.order_status);
      },
    }
  );

  const { mutate: handleChangeStatus, isLoading: loadingStatus } = useMutation(
    (data) => changeStatusOrder(data),
    {
      onSuccess: (res) => {
        Success(res?.data?.message);
        refetch();
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );

  return (
    <AppRoot loading={isLoading || loadingStatus}>
      <div className="row">
        <div className="col-12 px-xl-4 pt-xl-2">
          <div className="card mb-sm-5 mx-2">
            <div className="card-content collapse show">
              <div className="card-dashboard">
                <div className="row">
                  <div className="col-12 d-flex align-items-center">
                    <Link to="/order/logs">
                      <i className="fas fa-chevron-left back-arrow mr-1" />
                    </Link>
                    <h5 className="main-heading d-inline-block">
                      Order Details
                    </h5>
                  </div>
                </div>
                <div className="white-div p-3 mt-3">
                  <div className="white-div-2 py-5 pl-lg-5">
                    <div className="row">
                      <div className="col-12">
                        <h6 className="description-hading">
                          Order and Account
                        </h6>
                        <hr />
                      </div>
                      <div className="col-xl-6">
                        <h6 className="order-info mt-1">Order Information</h6>
                        <div className="row align-items-center">
                          <div className="col-xl-6 mt-1">
                            <label htmlFor className="all-label">
                              Order Date:
                            </label>
                          </div>
                          <div className="col-xl-6 mt-1">
                            <p className="label-value">
                              {format_date(data?.data?.order?.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="row align-items-center">
                          <div className="col-xl-6 mt-1">
                            <label htmlFor className="all-label">
                              Status<span className="red">*</span>
                            </label>
                          </div>
                          <div className="col-xl-6 mt-1">
                            {status !== "Refunded" ? (
                              <div className="form-field mb-0">
                                <select
                                  className="select-dropd-2"
                                  onChange={(e) => {
                                    setOrderStatus(e.target.value);
                                    handleChangeStatus({
                                      status: e.target.value,
                                      id: data?.data?.order?._id,
                                    });
                                  }}
                                  value={status}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="In Process">In Process</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Refunded">Refunded</option>
                                </select>
                                <i
                                  className="fa fa-chevron-down right-icon select-drop"
                                  aria-hidden="true"
                                />
                              </div>
                            ) : (
                              <label htmlFor className="all-label">
                                Refunded
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <h6 className="order-info mt-1">Order Information</h6>
                        <div className="row align-items-center">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Customer Name:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            <p className="label-value">
                              {data?.data?.order?.user?.name}
                            </p>
                          </div>
                        </div>
                        <div className="row align-items-center">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Email:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            <p className="label-value">
                              {data?.data?.order?.user?.auth?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="white-div-2 py-5 pl-lg-5 mt-2">
                    <div className="row">
                      <div className="col-12">
                        <h6 className="description-hading">Address</h6>
                        <hr />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <h6 className="order-info mt-1">Billing Address</h6>
                        <div className="white-div description-pp mt-2">
                          <p>
                            <strong>Name: </strong>{" "}
                            {data?.data?.order?.billing_address?.first_name}{" "}
                            {data?.data?.order?.billing_address?.last_name}
                          </p>
                          <p>
                            <strong>Country: </strong>{" "}
                            {data?.data?.order?.billing_address?.country}
                          </p>
                          <p>
                            <strong>State: </strong>{" "}
                            {data?.data?.order?.billing_address?.city}
                          </p>
                          <p>
                            <strong>State: </strong>{" "}
                            {data?.data?.order?.billing_address?.state}
                          </p>
                          <p>
                            <strong>Street Address: </strong>{" "}
                            {data?.data?.order?.billing_address?.street_address}
                          </p>
                          <p>
                            <strong>Zip Code: </strong>{" "}
                            {data?.data?.order?.billing_address?.zip_code}
                          </p>
                          <p>
                            <strong>Email: </strong>{" "}
                            {data?.data?.order?.billing_address?.email}
                          </p>
                          <p>
                            <strong>Phone: </strong>{" "}
                            {data?.data?.order?.billing_address?.country_code} -{" "}
                            {data?.data?.order?.billing_address?.phone}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <h6 className="order-info mt-1">Shipping Address</h6>
                        <div className="white-div description-pp mt-2">
                          <p>
                            <strong>Name: </strong>{" "}
                            {data?.data?.order?.shipping_address?.first_name}{" "}
                            {data?.data?.order?.shipping_address?.last_name}
                          </p>
                          <p>
                            <strong>Country: </strong>{" "}
                            {data?.data?.order?.shipping_address?.country}
                          </p>
                          <p>
                            <strong>State: </strong>{" "}
                            {data?.data?.order?.shipping_address?.city}
                          </p>
                          <p>
                            <strong>State: </strong>{" "}
                            {data?.data?.order?.shipping_address?.state}
                          </p>
                          <p>
                            <strong>Street Address: </strong>{" "}
                            {
                              data?.data?.order?.shipping_address
                                ?.street_address
                            }
                          </p>
                          <p>
                            <strong>Zip Code: </strong>{" "}
                            {data?.data?.order?.shipping_address?.zip_code}
                          </p>
                          <p>
                            <strong>Email: </strong>{" "}
                            {data?.data?.order?.shipping_address?.email}
                          </p>
                          <p>
                            <strong>Phone: </strong>{" "}
                            {data?.data?.order?.shipping_address?.country_code}{" "}
                            - {data?.data?.order?.shipping_address?.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="white-div-2 py-5 pl-lg-5 mt-2">
                    <div className="row">
                      <div className="col-12">
                        <h6 className="description-hading">
                          Order and Account
                        </h6>
                        <hr />
                      </div>
                      <div className="col-xl-6">
                        <h6 className="order-info mt-1">Payment Information</h6>
                        <div className="row align-items-center">
                          <div className="col-xl-6 mt-1">
                            <label htmlFor className="all-label">
                              Payment Method:
                            </label>
                          </div>
                          <div className="col-xl-6 mt-1">
                            <p className="label-value">Card</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <h6 className="order-info mt-1">
                          Shipping Information
                        </h6>
                        <div className="row align-items-center">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Shipping Method:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            <p className="label-value">Flat Rate - Flat Rate</p>
                          </div>
                        </div>
                        <div className="row align-items-center">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Shipping Price:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            <p className="label-value">
                              {formatCurrency(
                                data?.data?.order?.price_info?.shipping_fee
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="white-div-2 p-lg-3 mt-3">
                    <div className="row mx-0">
                      <div className="col-12">
                        <h6 className="description-hading">Products</h6>
                        <hr />
                      </div>
                      <div className="col-12">
                        <div className="clearfix" />
                        <div className="maain-tabble table-responsive">
                          <table className="table table-striped table-bordered zero-configuration">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Product Name</th>
                                <th>Qty</th>
                                <th>Plan</th>
                                <th>Product Price</th>
                                <th>Grand Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.data?.order?.products?.map((product) => (
                                <tr>
                                  <td>{product?.product?._id}</td>
                                  <td>
                                    <p>{product?.product?.name}</p>
                                    <p>
                                      <strong
                                        style={{
                                          color: "black",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {product?.main_attr?.label}:{" "}
                                        <span style={{ fontWeight: "normal" }}>
                                          {product?.sub_attr?.name} (
                                          {formatCurrency(
                                            product?.sub_attr?.price
                                          )}
                                          )
                                        </span>
                                      </strong>
                                    </p>
                                  </td>
                                  <td>{product?.quantity}</td>
                                  <td>Abc</td>
                                  <td>
                                    {formatCurrency(product?.product?.price)}
                                  </td>
                                  <td>
                                    {formatCurrency(
                                      (product?.product?.price +
                                        (product?.sub_attr?.price || 0)) *
                                        product?.quantity
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="offset-xl-5 col-xl-7 mt-3">
                        <div className="white-div">
                          <div className="row left-col-border">
                            <div className="col-lg-6">
                              <label htmlFor className="all-label">
                                Sub Total:
                              </label>
                            </div>
                            <div className="col-lg-6">
                              <p className="label-value">
                                {formatCurrency(
                                  data?.data?.order?.price_info?.sub_total
                                )}
                              </p>
                            </div>
                            <div className="col-lg-6 mt-1">
                              <label htmlFor className="all-label">
                                Sub Total (ABC Plan):
                              </label>
                            </div>
                            <div className="col-lg-6 mt-1">
                              <p className="label-value">
                                {formatCurrency(
                                  data?.data?.order?.price_info?.sub_total
                                )}
                              </p>
                            </div>
                            <div className="col-lg-6 mt-1">
                              <label htmlFor className="all-label">
                                Shipping:
                              </label>
                            </div>
                            <div className="col-lg-6 mt-1">
                              <p className="label-value">
                                {formatCurrency(
                                  data?.data?.order?.price_info?.shipping_fee
                                )}
                              </p>
                            </div>
                            <div className="col-lg-6 mt-1">
                              <label htmlFor className="all-label">
                                Total:
                              </label>
                            </div>
                            <div className="col-lg-6 mt-1">
                              <p className="label-value">
                                {formatCurrency(
                                  data?.data?.order?.price_info?.total
                                )}
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
        </div>
      </div>
    </AppRoot>
  );
}
