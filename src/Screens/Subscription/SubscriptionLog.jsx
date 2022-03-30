import React from "react";
import { getPackageLogs } from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import useFetchData from "../../Hooks/useFetchData";
import useTableControls from "../../Hooks/useTableControls";

import AddPlanModal from "./AddPlanModal";

import SubscriptionPlanCard from "./Components/SubscriptionPlanCard";

export default function SubscriptionLog() {
  const { perPage } = useTableControls();

  const { isLoading, data } = useFetchData("package_logs", getPackageLogs, [
    perPage,
  ]);

  return (
    <AppRoot loading={isLoading}>
      <div className="row">
        <div className="col-12 px-xl-4 pt-xl-2">
          <div className="card my-sm-5 mx-2">
            <div className="card-content collapse show">
              <div className="card-dashboard">
                <div className="row">
                  <div className="col-lg-6 mt-2">
                    <h5 className="main-heading">Subscription Plans</h5>
                  </div>
                </div>
                <div className="white-div mt-2 py-3">
                  <div className="white-div-2 p-lg-3">
                    <div className="row justify-content-center">
                      <div className="col-lg-11">
                        <div className="row">
                          {data?.data?.logs?.docs?.map((log) => (
                            <div className="col-lg-6 text-center mt-2">
                              <SubscriptionPlanCard data={log} key={log?._id} />
                            </div>
                          ))}
                          <div className="col-12 text-center mt-lg-4">
                            <button
                              type="button"
                              className="site-btn d-inline-block mx-1 mt-2"
                              data-toggle="modal"
                              data-target="#add-plan"
                            >
                              add plan
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddPlanModal />
    </AppRoot>
  );
}
