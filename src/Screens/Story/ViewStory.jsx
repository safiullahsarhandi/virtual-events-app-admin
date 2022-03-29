import React from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { changeStatusStory, getStory } from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import AudioPlayer from "../../Components/Elements/Form/AudioPlayer";
import Button from "../../Components/Elements/Form/Button";
import ImageViewer from "../../Components/Elements/Form/ImageViewer";
import Avatar from "../../Components/Elements/Icons/Avatar";
import Error from "../../Components/Elements/Modals/Modal.Error";
import Success from "../../Components/Elements/Modals/Modal.Success";
import { image_url } from "../../Util/connection_strings";

export default function ViewStory() {
  const { id } = useParams();

  const { data, isLoading, refetch } = useQuery(["story_details", id], () =>
    getStory(id)
  );

  const { mutate, isLoading: loadingStatus } = useMutation(
    (id) => changeStatusStory(id),
    {
      onSuccess: (res) => {
        refetch();
        Success(res?.data?.message);
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
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
                    <Link to="/story/logs">
                      <i className="fas fa-chevron-left back-arrow mr-1" />
                    </Link>
                    <h5 className="main-heading d-inline-block">Stories</h5>
                  </div>
                </div>
                <div className="white-div mt-3 p-lg-3">
                  <div className="white-div-2 py-lg-5">
                    <div className="row">
                      <div className="col-12 mb-2">
                        <h5 className="filter-heading">Profile Details</h5>
                      </div>
                      <div className="col-xl-2 order-xl-1 order-2 mt-xl-0 mt-2">
                        <Avatar
                          url={data?.data?.story?.user?.user_image}
                          className="admin-profile img-fluid"
                        />
                      </div>
                      <div className="col-xl-7 order-xl-2 order-3">
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Full Name:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            <p className="label-value">
                              {data?.data?.story?.user?.name}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Email:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            <p className="label-value">
                              {data?.data?.story?.user?.auth?.email}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <label htmlFor className="all-label">
                              Phone Number:
                            </label>
                          </div>
                          <div className="col-lg-6 mt-1">
                            <p className="label-value">
                              {data?.data?.story?.user?.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 text-right mt-lg-0 mt-2 order-xl-3 order-1">
                        <h6 className="statuss">
                          Status{" "}
                          <span className="active-span">
                            {" "}
                            {data?.data?.story?.status ? "Active" : "Inactive"}
                          </span>
                        </h6>
                        <Button
                          loading={loadingStatus}
                          onClick={() => mutate(id)}
                          className="site-btn d-inline-block px-2 mt-2"
                        >
                          Mark as{" "}
                          {data?.data?.story?.status ? "Inactive" : "Active"}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="white-div-2 py-lg-5 mt-3">
                    <div className="row">
                      <div className="col-12">
                        <ImageViewer
                          src={data?.data?.story?.cover_image}
                          className="img-fluid w-100 stories-banner"
                        />
                        <div className="stories-content">
                          <h5>{data?.data?.story?.title}</h5>
                          <p>{data?.data?.story?.sub_title}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-xl-8">
                        <p
                          className="label-value"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {data?.data?.story?.description}
                        </p>
                      </div>
                      {data?.data?.story?.story_type === "Video" && (
                        <div className="col-xl-4">
                          <video
                            className="w-100 video-poster"
                            controls
                            crossOrigin="anonymous"
                          >
                            <source
                              src={`${image_url}${data?.data?.story?.media}`}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      )}
                      {data?.data?.story?.story_type === "Audio" && (
                        <div className="col-xl-4">
                          <AudioPlayer src={data?.data?.story?.media} />
                        </div>
                      )}
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
