import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getNotificationCount } from "../Apis";
import { userState } from "../Recoil";
import Avatar from "./Elements/Icons/Avatar";

export default function Header() {
  const user = useRecoilValue(userState);

  const { data: notification_count, isLoading } = useQuery(
    ["notification_count", user?._id, window?.location?.pathname],
    () => getNotificationCount()
  );

  return (
    <nav className="header-navbar navbar-expand-md navbar navbar-with-menu fixed-top navbar-light navbar-border headerBg">
      <div className="navbar-wrapper">
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mobile-menu d-md-none mr-auto">
              <a
                className="nav-link nav-menu-main menu-toggle hidden-xs is-active"
                href
              >
                <i className="ft-menu font-large-1" />
              </a>
            </li>
            <li className="nav-item">
              <Link
                className="navbar-brand site-logo mt-lg-0 mt-0"
                to="/dashboard"
              >
                <img
                  className="brand-logo img-fluid"
                  alt="stack admin logo"
                  src="images/logo.png"
                />
              </Link>
            </li>
            <li className="nav-item d-md-none">
              <a
                className="nav-link open-navbar-container"
                data-toggle="collapse"
                data-target="#navbar-mobile"
                href
              >
                <i className="fa fa-ellipsis-v" />
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-container content">
          <div className="collapse navbar-collapse" id="navbar-mobile">
            <ul className="nav navbar-nav mr-auto float-left"></ul>
            <ul className="nav navbar-nav float-right align-items-center">
              <li className="dropdown dropdown-notification nav-item two-bell-icons">
                <Link className="nav-link nav-link-label" to="/notifications">
                  <img
                    src="images/bell-icon.png"
                    alt=""
                    className="img-fluid"
                  />
                  <span className="badge badge-pill badge-default badge-accent badge-default badge-up">
                    {isLoading ? "" : notification_count?.data?.count}
                  </span>
                </Link>
              </li>

              <li className="dropdown dropdown-user nav-item">
                <a
                  className="dropdown-toggle nav-link dropdown-user-link"
                  href
                  data-toggle="dropdown"
                >
                  <span className="avatar avatar-online">
                    <Avatar url={user?.user_image} />
                  </span>
                  <span className="user-name">
                    {user?.name} <br />
                    Admin
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <Link className="dropdown-item" to="/profile">
                    <i className="far fa-user" />
                    Profile
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/"
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    <img src="images/logout-icn.png" alt="" /> Logout
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
