import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { addSubCategory } from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import Button from "../../Components/Elements/Form/Button";
import Input from "../../Components/Elements/Form/Input";
import Error from "../../Components/Elements/Modals/Modal.Error";
import Success from "../../Components/Elements/Modals/Modal.Success";

export default function AddSubCategory() {
  const navigation = useNavigate();
  const [info, setInfo] = useState({
    name: "",
    status: true,
  });

  const { mutate, isLoading } = useMutation((data) => addSubCategory(data), {
    onSuccess: (res) => {
      Success(res?.data?.message);
      navigation("/category/logs");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });

  return (
    <AppRoot>
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
                      Add Sub-Category
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
                                Sub-Category Title<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-4 mt-xl-1">
                              <Input
                                type="text"
                                className="p-1 dash-input mt-1"
                                placeholder="Enter Name"
                                onChange={(name) => setInfo({ ...info, name })}
                                value={info?.name}
                              />
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
                                  className="select-dropd-2"
                                  onChange={(e) =>
                                    setInfo({ ...info, status: e.target.value })
                                  }
                                  value={info?.status}
                                >
                                  <option value={true}>Active</option>
                                  <option value={false}>Inactive</option>
                                </select>
                                <i
                                  className="fa fa-chevron-down right-icon select-drop"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Button
                              loading={isLoading}
                              onClick={() => mutate(info)}
                              className="site-btn d-inline-block mr-1 mt-1"
                            >
                              ADD
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
