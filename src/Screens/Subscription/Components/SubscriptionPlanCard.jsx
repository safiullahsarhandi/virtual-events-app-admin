import React from "react";
import { useMutation } from "react-query";
import { queryClient } from "../../..";
import { changePackageStatus } from "../../../Apis";
import Button from "../../../Components/Elements/Form/Button";
import Confirmation from "../../../Components/Elements/Modals/Modal.Confirmation";
import Error from "../../../Components/Elements/Modals/Modal.Error";
import Success from "../../../Components/Elements/Modals/Modal.Success";
import { formatCurrency } from "../../../Util/helpers";
import EditPlanModal from "../EditPlanModal";

export default function SubscriptionPlanCard({ data }) {
  const { mutate, isLoading } = useMutation((id) => changePackageStatus(id), {
    onSuccess: (res) => {
      queryClient.invalidateQueries("package_logs");
      Success(res?.data?.message);
    },
    onError: (err) => Error(err?.response?.data?.message),
  });

  return (
    <div className="virtual-room">
      <div className={data?.status ? "border-orange-div" : "border-grey-div"}>
        <h3 className="virtual-heading">{data?.name}</h3>
        <h3 className="virtual-heading" style={{ fontSize: 18 }}>
          {data?.duration} Months
        </h3>
        <h5 className="virtual-price">{formatCurrency(data?.amount)}</h5>
        <div className="virtual-points">
          <p
            className="virtual-point"
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {data?.details}
          </p>
        </div>
        <Button
          type="button"
          loading={isLoading}
          onClick={() =>
            Confirmation(
              `Are You Sure You Want To ${
                data?.status ? "Disable" : "Enable"
              } This Package?`,
              "Yes",
              () => mutate(data?._id)
            )
          }
          className={
            data?.status
              ? "site-btn d-inline-block mx-1 mt-2"
              : "site-btn-3 d-inline-block mx-1 mt-2"
          }
        >
          {data?.status ? "DISABLE" : "ENABLE"}
        </Button>
        <button
          type="button"
          className="site-btn-2 d-inline-block mx-1 mt-2"
          data-toggle="modal"
          data-target={`#update-plan${data?._id}`}
        >
          edit plan
        </button>
        <EditPlanModal id={data?._id} />
      </div>
    </div>
  );
}
