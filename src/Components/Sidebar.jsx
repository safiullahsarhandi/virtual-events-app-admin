import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [active, setActive] = useState("");
  const menu = useRef([
    {
      name: "Dashboard",
      image: <i class="fas fa-chart-area"></i>,
      link: "/dashboard",
    },
    {
      name: "Users",
      image: <i class="fas fa-user"></i>,
      link: "/user/logs",
    },
    {
      name: "Properties",
      image: <i class="fas fa-building"></i>,
      link: "/property/logs",
    },
    {
      name: "Category",
      image: <i class="fas fa-comments"></i>,
      link: "/category/logs",
    },
    {
      name: "Payments",
      image: <i class="fas fa-credit-card"></i>,
      link: "/payment/logs",
    },
    {
      name: "Packages",
      image: <i class="fas fa-box"></i>,
      link: "/package/logs",
    },
    {
      name: "Subscription",
      image: <i class="fas fa-user"></i>,
      link: "/subscription/logs",
    },
    {
      name: "Settings",
      image: <i class="fas fa-cog"></i>,
      link: "/settings",
    },
    {
      name: "Feedback",
      image: <i class="far fa-calendar-check"></i>,
      link: "/feedback/logs",
    },
  ]);

  useEffect(() => {
    const pathname = window?.location?.pathname;
    if (pathname?.includes("/dashboard")) setActive("Dashboard");
    else if (pathname?.includes("/player")) setActive("Players Management");
    else if (pathname?.includes("/question-request"))
      setActive("Question Requests");
    else if (pathname?.includes("/game-rules")) setActive("Game Rules");
    else if (pathname?.includes("/question")) setActive("Questions Management");
    else setActive("");
  }, [window?.location?.pathname]);

  return (
    <div
      className="main-menu menu-fixed menu-light menu-accordion"
      data-scroll-to-active="true"
    >
      <div
        className="main-menu-content ps-container ps-theme-dark"
        data-ps-id="a3476805-034f-dce3-137e-fc05f195c4e1"
      >
        <ul
          className="navigation navigation-main"
          id="main-menu-navigation"
          data-menu="menu-navigation"
        >
          {menu?.current?.map((menu) => (
            <li
              className={`nav-item ${menu.name === active ? "active" : ""}`}
              key={menu?.link}
            >
              <Link to={`${menu?.link}`}>
                {menu?.image}
                <span className="menu-title" data-i18n>
                  {menu?.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
