import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [active, setActive] = useState("");
  const menu = useRef([
    {
      name: "Dashboard",
      image: <img src="images/dashboard.png" alt="" class="img-fluid mr-1" />,
      link: "/dashboard",
    },
    {
      name: "Users",
      image: <img src="images/user-nav.png" alt="" class="img-fluid mr-1" />,
      link: "/user/logs",
    },
    {
      name: "Events",
      image: <img src="images/events.png" alt="" class="img-fluid mr-1" />,
      link: "/event/logs",
    },
    {
      name: "Event Categories",
      image: (
        <img src="images/event-categories.png" alt="" class="img-fluid mr-1" />
      ),
      link: "/event-category/logs",
    },
    {
      name: "Event Elements",
      image: <img src="images/elements.png" alt="" class="img-fluid mr-1" />,
      link: "/payment/logs",
    },
    {
      name: "Payment Logs",
      image: <img src="images/payment.png" alt="" class="img-fluid mr-1" />,
      link: "/payment/logs",
    },
    {
      name: "Subscription Plans",
      image: (
        <img src="images/subscription.png" alt="" class="img-fluid mr-1" />
      ),
      link: "/subscription/logs",
    },
    {
      name: "Stories",
      image: <img src="images/stories.png" alt="" class="img-fluid mr-1" />,
      link: "/story/logs",
    },
    {
      name: "Story Categories",
      image: <img src="images/stories.png" alt="" class="img-fluid mr-1" />,
      link: "/story-category/logs",
    },
    {
      name: "Products",
      image: <img src="images/products.png" alt="" class="img-fluid mr-1" />,
      link: "/product/logs",
    },
    {
      name: "Categories",
      image: (
        <img src="images/event-categories.png" alt="" class="img-fluid mr-1" />
      ),
      link: "/category/logs",
    },
    {
      name: "Attributes",
      image: <img src="images/attributes.png" alt="" class="img-fluid mr-1" />,
      link: "/attribute/logs",
    },
    {
      name: "Orders",
      image: <img src="images/orders.png" alt="" class="img-fluid mr-1" />,
      link: "/order/logs",
    },
    {
      name: "Queries",
      image: <img src="images/queries.png" alt="" class="img-fluid mr-1" />,
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
    <div className="main-menu menu-fixed menu-light menu-accordion">
      <div className="main-menu-content ps-container ps-theme-dark">
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
