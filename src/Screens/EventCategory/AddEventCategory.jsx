import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addEventCategory,
  getEventCategory,
  updateEventCategory,
} from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import Button from "../../Components/Elements/Form/Button";
import Input from "../../Components/Elements/Form/Input";
import InputNumber from "../../Components/Elements/Form/InputNumber";
import Error from "../../Components/Elements/Modals/Modal.Error";
import Success from "../../Components/Elements/Modals/Modal.Success";

export default function AddEventCategory() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [info, setInfo] = useState({
    id: "",
    name: "",
    cost: true,
    onlySubscription: false,
  });

  const { mutate, isLoading } = useMutation(
    (data) => (id ? updateEventCategory(data) : addEventCategory(data)),
    {
      onSuccess: (res) => {
        Success(res?.data?.message);
        navigation("/event-category/logs");
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );

  const { isLoading: loadingCategory } = useQuery(
    ["event_category", id],
    () => id && getEventCategory(id),
    {
      onSuccess: (res) => {
        const category = res?.data?.category;
        setInfo({
          id: category?._id,
          name: category?.name,
          cost: category?.cost,
          onlySubscription: category?.onlySubscription,
        });
      },
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <AppRoot loading={loadingCategory}>
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
                      {id ? "Update" : "Add"} Event Category
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
                                Name<span className="red">*</span>
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
                                Cost<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-xl-4 mt-xl-1">
                              <InputNumber
                                placeholder="Enter Cost"
                                className="p-1 dash-input mt-1"
                                onChange={(cost) => setInfo({ ...info, cost })}
                                value={info?.cost}
                              />
                            </div>
                            <div className="col-xl-5 mt-1">
                              <label htmlFor>
                                Cost Per Event (For Users Without Subscription)
                              </label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 mt-1">
                              <p className="mb-0">
                                <input
                                  type="checkbox"
                                  id="c1"
                                  name="cb"
                                  checked={info?.onlySubscription}
                                  onChange={(e) =>
                                    setInfo({
                                      ...info,
                                      onlySubscription: e.target.checked,
                                    })
                                  }
                                />
                                <label htmlFor="c1">
                                  Include in Subscriptions
                                </label>
                              </p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Button
                              loading={isLoading}
                              onClick={() => mutate(info)}
                              className="site-btn d-inline-block mr-1 mt-1"
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
