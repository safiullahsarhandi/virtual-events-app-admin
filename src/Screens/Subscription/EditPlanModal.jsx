import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../..";
import { editPackage, getPackageDetails } from "../../Apis";
import Button from "../../Components/Elements/Form/Button";
import Input from "../../Components/Elements/Form/Input";
import InputNumber from "../../Components/Elements/Form/InputNumber";
import Error from "../../Components/Elements/Modals/Modal.Error";
import Success from "../../Components/Elements/Modals/Modal.Success";
import { closeModals } from "../../Util/helpers";

export default function EditPlanModal({ id }) {
  const [info, setInfo] = useState({
    id: "",
    name: "",
    amount: "",
    details: "",
    duration: "",
  });

  const { isLoading: loadingDetails } = useQuery(
    ["notification_count", id],
    () => getPackageDetails(id),
    {
      onSuccess: (res) => {
        const package_info = res?.data?.package;
        setInfo({
          id: package_info?._id,
          name: package_info?.name,
          amount: package_info?.amount,
          details: package_info?.details,
          duration: package_info?.duration,
        });
      },
    }
  );

  const { mutate, isLoading } = useMutation((data) => editPackage(data), {
    onSuccess: (res) => {
      queryClient.invalidateQueries("package_logs");
      Success(res?.data?.message);
      closeModals();
    },
    onError: (err) => Error(err?.response?.data?.message),
  });

  return (
    <div
      className="modal fade"
      id={`update-plan${id}`}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content admin-modal">
          <i
            className="fas fa-times close modal-close"
            data-dismiss="modal"
            aria-label="Close"
          />
          <h3 className="modal-heading">Update Plan</h3>
          <div className="mt-5">
            <InputNumber
              type="text"
              className="p-1 dash-input mt-1"
              placeholder="Enter Duration (MONTHS)"
              value={info?.duration}
              onChange={(duration) => setInfo({ ...info, duration })}
              max={2}
            />
            <Input
              className="p-1 dash-input mt-1"
              placeholder="Enter Plan Name"
              value={info?.name}
              onChange={(name) => setInfo({ ...info, name })}
            />
            <InputNumber
              type="text"
              className="p-1 dash-input mt-1"
              placeholder="Enter Plan Cost"
              value={info?.amount}
              onChange={(amount) => setInfo({ ...info, amount })}
            />
            <textarea
              name
              rows={8}
              className="p-1 dash-input mt-1"
              placeholder="Enter Plans Details"
              value={info?.details}
              onChange={(e) => setInfo({ ...info, details: e.target.value })}
            />
            <div className="d-flex align-items-center justify-content-center mt-3">
              <Button
                loading={isLoading || loadingDetails}
                onClick={() => mutate(info)}
                className="px-3 py-1 site-btn mt-1 mr-1"
              >
                UPDATE
              </Button>
              <button
                className="px-3 py-1 site-btn-2 mr-sm-1 mt-1 ml-1"
                data-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
