import React from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { chagneStatusProduct, orderLogs } from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import Confirmation from "../../Components/Elements/Modals/Modal.Confirmation";
import Error from "../../Components/Elements/Modals/Modal.Error";
import Success from "../../Components/Elements/Modals/Modal.Success";
import Table from "../../Components/Elements/Table/Table";
import TableMenu from "../../Components/Elements/Table/TableMenu";
import useFetchData from "../../Hooks/useFetchData";
import useTableControls from "../../Hooks/useTableControls";
import { formatCurrency, format_date } from "../../Util/helpers";

export default function OrderLog() {
  const {
    perPage,
    setPerPage,
    status,
    setStatus,
    search_string,
    setSearchString,
    from,
    setFrom,
    to,
    setTo,
  } = useTableControls();

  const {
    // INTERNAL EXPORTS
    setPage,
    // REACT QUERY EXPORTS
    isFetching,
    isLoading,
    data,
  } = useFetchData("order_logs", orderLogs, [
    perPage,
    search_string,
    status,
    from,
    to,
  ]);

  return (
    <AppRoot>
      <div className="row">
        <div className="col-12 px-xl-4 pt-xl-2">
          <div className="card my-sm-5 mx-2">
            <div className="card-content collapse show">
              <div className="card-dashboard">
                <div className="row">
                  <div className="col-lg-6 mt-2">
                    <h5 className="main-heading">Order Management</h5>
                  </div>
                </div>
                <Table
                  headings={[
                    "ORDER ID",
                    "TOTAL",
                    "BILLED TO",
                    "STATUS",
                    "DATE",
                    "ACTION",
                  ]}
                  perPage={perPage}
                  setPerPage={setPerPage}
                  setSearchString={setSearchString}
                  totalPages={data?.data?.logs?.totalPages}
                  setPage={setPage}
                  data={data?.data?.logs?.docs}
                  isFetching={isFetching}
                  isLoading={isLoading}
                  from={from}
                  setFrom={setFrom}
                  to={to}
                  setTo={setTo}
                  status={status}
                  setStatus={setStatus}
                  status_label="Status"
                  status_options={[
                    {
                      label: "Pending",
                      value: "Pending",
                    },
                    {
                      label: "In Process",
                      value: "In Process",
                    },
                    {
                      label: "Delivered",
                      value: "Delivered",
                    },
                    {
                      label: "Refunded",
                      value: "Refunded",
                    },
                  ]}
                >
                  <tbody>
                    {data?.data?.logs?.docs?.map((log) => (
                      <tr>
                        <td>{log?._id}</td>
                        <td>{formatCurrency(log?.price_info?.total)}</td>
                        <td>
                          {log?.billing_address?.first_name}{" "}
                          {log?.billing_address?.last_name}
                        </td>
                        <td>{log?.order_status}</td>
                        <td>{format_date(log?.createdAt)}</td>
                        <td>
                          <TableMenu
                            details_link={`/order/details/${log?._id}`}
                            disable_action
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppRoot>
  );
}
