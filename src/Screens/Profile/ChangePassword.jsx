import React, { useState } from "react";
import InputPassword from "../../Components/Elements/Form/InputPassword";
import Button from "../../Components/Elements/Form/Button";
import { useMutation } from "react-query";
import { updatePassword } from "../../Apis";
import Success from "../../Components/Elements/Modals/Modal.Success";
import Error from "../../Components/Elements/Modals/Modal.Error";
import AppRoot from "../../Components/AppRoot";
import { Link, useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation((data) => updatePassword(data), {
    onSuccess: (res) => {
      Success(res?.data?.message);
      navigate("/profile");
    },
    onError: (err) => {
      console.log(err);
      Error(err?.response?.data?.message);
    },
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
                    <a href="profile.php">
                      <i className="fas fa-chevron-left back-arrow mr-1" />
                    </a>
                    <h5 className="main-heading d-inline-block">Profile</h5>
                  </div>
                </div>
                <div className="white-div mt-3 py-3">
                  <div className="white-div-2 py-5 pl-lg-5">
                    <form action="profile.php">
                      <div className="row">
                        <div className="col-lg-9">
                          <div className="row">
                            <div className="col-lg-3 mt-1">
                              <label htmlFor className="all-label">
                                Current Password<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-lg-4 mt-1">
                              <div className="form-field site-field mb-0">
                                <InputPassword
                                  value={password}
                                  onChange={(password) => setPassword(password)}
                                  className="dash-input p-1 pr-3 right-icon confirm-input"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-3 mt-1">
                              <label htmlFor className="all-label">
                                New Password<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-lg-4 mt-1">
                              <div className="form-field site-field mb-0">
                                <InputPassword
                                  value={newPassword}
                                  onChange={(newPassword) =>
                                    setNewPassword(newPassword)
                                  }
                                  className="dash-input p-1 pr-3 right-icon enter-input"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-3 mt-1">
                              <label htmlFor className="all-label">
                                Confirm Password<span className="red">*</span>
                              </label>
                            </div>
                            <div className="col-lg-4 mt-1">
                              <div className="form-field site-field mb-0">
                                <InputPassword
                                  value={confirmPassword}
                                  onChange={(confirmPassword) =>
                                    setConfirmPassword(confirmPassword)
                                  }
                                  className="dash-input p-1 pr-3 right-icon enter-input-2"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Button
                              className="site-btn d-inline-block mr-1 mt-1"
                              style={{
                                width: 150,
                              }}
                              loading={isLoading}
                              onClick={() =>
                                mutate({
                                  password,
                                  newPassword,
                                  confirmPassword,
                                })
                              }
                            >
                              Update
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
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
