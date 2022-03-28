import React from "react";
import AppRoot from "../../Components/AppRoot";

export default function NotFound() {
  return (
    <AppRoot>
      <div className="row">
        <div className="col-12 px-xl-4 pt-xl-2">
          <div className="card my-sm-5 mx-2">
            <div className="card-content collapse show">
              <div className="card-dashboard">
                <div className="white-div mt-2 py-3">
                  <div className="white-div-2 p-lg-3 text-center">
                    <img src="images/error.png" alt="" className="img-fluid" />
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
