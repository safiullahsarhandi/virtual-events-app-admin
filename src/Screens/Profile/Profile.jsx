import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { updateAdmin } from "../../Apis";
import Button from "../../Components/Elements/Form/Button";
import ImageSelector from "../../Components/Elements/Form/ImageSelector";
import Input from "../../Components/Elements/Form/Input";
import Error from "../../Components/Elements/Modals/Modal.Error";
import Success from "../../Components/Elements/Modals/Modal.Success";
import { userState } from "../../Recoil";
import AppRoot from "../../Components/AppRoot";
import { Link } from "react-router-dom";

export default function Profile() {
  const [info, setInfo] = useState({
    name: "",
    user_image: "",
  });
  const [is_edit, setIsEdit] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (user?._id)
      setInfo({
        name: user?.name,
        user_image: user?.user_image,
      });
  }, [user?._id]);

  const { mutate: update, isLoading } = useMutation(
    (data) => updateAdmin(data),
    {
      onSuccess: (res) => {
        Success(res?.data?.message);
        const { name, user_image } = res?.data?.admin;
        setUser({
          name,
          user_image,
        });
        setIsEdit(false);
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );

  const handleUpdate = () => {
    const form_data = new FormData();
    form_data.append("name", info.name);
    form_data.append("user_image", info.user_image);
    update(form_data);
  };

  return (
    <AppRoot>
      <div className="row">
        <div className="col-12 px-xl-4 pt-xl-2">
          <div className="card mb-sm-5 mx-2">
            <div className="card-content collapse show">
              <div className="card-dashboard">
                <div className="row">
                  <div className="col-12">
                    <h5 className="main-heading d-inline-block">
                      Admin Profile
                    </h5>
                  </div>
                </div>
                <div className="white-div mt-3 p-3">
                  <div className="white-div-2 py-5 pl-lg-5">
                    <div className="row">
                      <div className="col-lg-9">
                        <ImageSelector
                          value={info?.user_image}
                          className="img-fluid"
                          onChange={(user_image) =>
                            setInfo({ ...info, user_image })
                          }
                          is_edit={is_edit}
                        />
                        <div className="row">
                          <div className="col-lg-3 mt-1">
                            <label htmlFor className="all-label">
                              Full Name:
                            </label>
                          </div>
                          <div className="col-lg-4 mt-1">
                            {is_edit ? (
                              <Input
                                value={info?.name}
                                onChange={(name) => setInfo({ ...info, name })}
                                className="form-control"
                              />
                            ) : (
                              <p className="label-value">{info?.name}</p>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 mt-1">
                            <label htmlFor className="all-label">
                              Email:
                            </label>
                          </div>
                          <div className="col-lg-4 mt-1">
                            <p className="label-value">{user?.auth?.email}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <Button
                            className="site-btn d-inline-block w-50"
                            loading={isLoading}
                            style={{
                              width: 150,
                            }}
                            onClick={() => {
                              if (!is_edit) setIsEdit(true);
                              else handleUpdate();
                            }}
                          >
                            {is_edit
                              ? "Update Profile Information"
                              : "Edit Profile Information"}
                          </Button>
                        </div>
                      </div>
                      <div className="col-lg-3 text-right mt-lg-0 mt-2">
                        <Link
                          to="/profile/change-password"
                          className="site-btn d-inline-block"
                        >
                          Change Password
                        </Link>
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
