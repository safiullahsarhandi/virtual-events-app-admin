import React from "react";

export default function SubscriptionCard({ subscription }) {
  return (
    <div className="white-div">
      <div className="row left-col-border">
        <div className="col-lg-6">
          <label htmlFor className="all-label">
            Package Type:
          </label>
        </div>
        <div className="col-lg-6">
          <p className="label-value">Silver</p>
        </div>
        <div className="col-lg-6 mt-1">
          <label htmlFor className="all-label">
            Subscribed On:
          </label>
        </div>
        <div className="col-lg-6 mt-1">
          <p className="label-value">Sept 27, 2021</p>
        </div>
        <div className="col-lg-6 mt-1">
          <label htmlFor className="all-label">
            Expires On:
          </label>
        </div>
        <div className="col-lg-6 mt-1">
          <p className="label-value">Sept 26, 2022</p>
        </div>
        <div className="col-lg-6 mt-1">
          <label htmlFor className="all-label">
            Amount Paid:
          </label>
        </div>
        <div className="col-lg-6 mt-1">
          <p className="label-value">$200</p>
        </div>
      </div>
    </div>
  );
}
