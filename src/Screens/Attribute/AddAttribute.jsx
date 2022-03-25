import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createAttribute,
  editAttribute,
  getAttributeDetails,
} from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import Button from "../../Components/Elements/Form/Button";
import Input from "../../Components/Elements/Form/Input";
import Error from "../../Components/Elements/Modals/Modal.Error";
import Success from "../../Components/Elements/Modals/Modal.Success";

export default function AddAttribute() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [info, setInfo] = useState({
    id: "",
    name: "",
    sku: "",
    attribute_values: [
      {
        name: "",
      },
    ],
    status: true,
  });

  const { mutate, isLoading } = useMutation(
    (data) => (info?.id ? editAttribute(data) : createAttribute(data)),
    {
      onSuccess: (res) => {
        Success(res?.data?.message);
        navigation("/attribute/logs");
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );

  const { data, isLoading: loadingAttribute } = useQuery(
    ["attribute_details", id],
    () => id && getAttributeDetails(id)
  );

  useEffect(() => {
    if (data?.data?.attribute) {
      const attribute = data?.data?.attribute;
      setInfo({
        id: attribute?._id,
        sku: attribute?.sku,
        name: attribute?.name,
        attribute_values: attribute?.attribute_values,
        status: attribute?.status,
      });
    }
  }, [data?.data?.attribute]);

  const handleSubmit = () => {
    mutate(info);
  };

  return (
    <AppRoot loading={loadingAttribute}>
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
                      {id ? "Update" : "Add"} Attributes
                    </h5>
                  </div>
                </div>
                <div className="white-div p-3 mt-3">
                  <div className="white-div-2 py-5 pl-lg-5">
                    <div className="row">
                      <div className="col-xl-9">
                        <form action>
                          <div className="row align-items-center">
                            <div className="col-xl-3 mt-1">
                              <label htmlFor className="all-label">
                                Attribute<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-4 mt-xl-1">
                              <Input
                                type="text"
                                className="p-1 dash-input mt-1"
                                placeholder="Enter Name"
                                value={info?.name}
                                onChange={(name) => setInfo({ ...info, name })}
                              />
                            </div>
                          </div>
                          <div className="row align-items-center">
                            <div className="col-xl-3 mt-1">
                              <label htmlFor className="all-label">
                                SKU<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-4 mt-xl-1">
                              <Input
                                type="text"
                                className="p-1 dash-input mt-1"
                                placeholder="Enter SKU"
                                value={info?.sku}
                                onChange={(sku) => setInfo({ ...info, sku })}
                              />
                            </div>
                          </div>
                          <div className="row align-items-center">
                            <div className="col-xl-3 mt-1">
                              <label htmlFor className="all-label">
                                Enter Attribute Value
                                <span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-4 mt-xl-1">
                              {info?.attribute_values?.map(
                                (attribute_value, index) => (
                                  <Input
                                    type="text"
                                    className={`form-control inpu1 ${
                                      index > 0 && "mt-1"
                                    }`}
                                    placeholder="Enter Attribute Values"
                                    value={attribute_value.name}
                                    key={index}
                                    onChange={(attribute_value) => {
                                      const temp = [...info.attribute_values];
                                      temp[index].name = attribute_value;
                                      setInfo({
                                        ...info,
                                        attribute_values: temp,
                                      });
                                    }}
                                    endIcon={
                                      <i
                                        className={`fa fa-plus right-icon black`}
                                        onClick={() => {
                                          if (
                                            info.attribute_values.length === 1
                                          ) {
                                            return;
                                          }
                                          const temp = [
                                            ...info.attribute_values,
                                          ];
                                          temp.splice(index, 1);
                                          setInfo({
                                            ...info,
                                            attribute_values: temp,
                                          });
                                        }}
                                        style={{
                                          cursor:
                                            info.attribute_values.length === 1
                                              ? "not-allowed"
                                              : "pointer",
                                        }}
                                      ></i>
                                    }
                                  />
                                )
                              )}
                            </div>
                          </div>
                          <div className="row my-1">
                            <div className="col-lg-6"></div>
                            <div className="col-lg-3">
                              <Button
                                className="site-btn"
                                onClick={() => {
                                  const temp = [...info.attribute_values];
                                  temp.push({
                                    name: "",
                                  });
                                  setInfo({ ...info, attribute_values: temp });
                                }}
                              >
                                <i className="fas fa-plus-circle" /> Add New
                              </Button>
                            </div>
                          </div>
                          <div className="row align-items-center">
                            <div className="col-xl-3 mt-1">
                              <label htmlFor className="all-label">
                                Status<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-4 mt-xl-1">
                              <div className="form-field mb-0">
                                <select
                                  value={info?.status}
                                  onChange={(e) =>
                                    setInfo({ ...info, status: e.target.value })
                                  }
                                  className="select-dropd-2"
                                >
                                  <option value={true}>Active</option>
                                  <option value={false}>Inactive</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Button
                              className="site-btn d-inline-block mr-1 mt-1"
                              loading={isLoading}
                              onClick={handleSubmit}
                            >
                              {id ? "UPDATE" : "ADD"}
                            </Button>
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
