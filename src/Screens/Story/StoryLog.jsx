import React from "react";
import AppRoot from "../../Components/AppRoot";
import StoryTable from "./StoryTable";

export default function StoryLog() {
  return (
    <AppRoot>
      <div className="row">
        <div className="col-12 px-xl-4 pt-xl-2">
          <div className="card my-sm-5 mx-2">
            <div className="card-content collapse show">
              <div className="card-dashboard">
                <div className="row">
                  <div className="col-lg-6 mt-2">
                    <h5 className="main-heading">Story Management</h5>
                  </div>
                </div>
                <StoryTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppRoot>
  );
}
