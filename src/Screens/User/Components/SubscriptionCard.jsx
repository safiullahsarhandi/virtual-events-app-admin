import React from "react";
import { formatCurrency, format_date } from "../../../Util/helpers";

export default function SubscriptionCard({ subscription }) {
  return (
    <div className="white-div">
      <div className="row left-col-border">
        <div className="col-lg-6">
          <label htmlFor className="all-label">
            Package Name:
          </label>
        </div>
        <div className="col-lg-6">
          <p className="label-value">{subscription?.package?.name}</p>
        </div>
        <div className="col-lg-6 mt-1">
          <label htmlFor className="all-label">
            Subscribed On:
          </label>
        </div>
        <div className="col-lg-6 mt-1">
          <p className="label-value">
            {format_date(subscription?.current_subscription_date)}
          </p>
        </div>
        <div className="col-lg-6 mt-1">
          <label htmlFor className="all-label">
            Expires On:
          </label>
        </div>
        <div className="col-lg-6 mt-1">
          <p className="label-value">
            {format_date(subscription?.renewal_date)}
          </p>
        </div>
        <div className="col-lg-6 mt-1">
          <label htmlFor className="all-label">
            Amount Paid:
          </label>
        </div>
        <div className="col-lg-6 mt-1">
          <p className="label-value">
            {formatCurrency(subscription?.subscription_price)}
          </p>
        </div>
      </div>
    </div>
  );
}
