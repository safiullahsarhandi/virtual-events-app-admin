import React from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { chagneStatusProduct, getProductLogs } from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import Confirmation from "../../Components/Elements/Modals/Modal.Confirmation";
import Error from "../../Components/Elements/Modals/Modal.Error";
import Success from "../../Components/Elements/Modals/Modal.Success";
import Table from "../../Components/Elements/Table/Table";
import TableMenu from "../../Components/Elements/Table/TableMenu";
import useFetchData from "../../Hooks/useFetchData";
import useTableControls from "../../Hooks/useTableControls";
import { format_date } from "../../Util/helpers";

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
    refetch,
  } = useFetchData("product_logs", getProductLogs, [
    perPage,
    search_string,
    status,
    from,
    to,
  ]);

  const { mutate, isLoading: loadingStatus } = useMutation(
    (id) => chagneStatusProduct(id),
    {
      onSuccess: (res) => {
        refetch();
        Success(res?.data?.message);
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );

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
                    "ID",
                    "NAME",
                    "CATEGORY",
                    "DATE",
                    "STATUS",
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
                      label: "Active",
                      value: true,
                    },
                    {
                      label: "Inactive",
                      value: false,
                    },
                  ]}
                >
                  <tbody>
                    {data?.data?.logs?.docs?.map((log) => (
                      <tr>
                        <td>{log?._id}</td>
                        <td>{log?.name}</td>
                        <td>{log?.category?.name}</td>
                        <td>{format_date(log?.createdAt)}</td>
                        <td>{log?.status ? "Active" : "Inactive"}</td>
                        <td>
                          <TableMenu
                            details_link={`/product/details/${log?._id}`}
                            edit_link={`/product/edit/${log?._id}`}
                            enable_edit
                            actionFunciton={() => {
                              Confirmation(
                                `Are You Sure You Want To ${
                                  log?.status ? "Block" : "Unblock"
                                } This Product?`,
                                "Yes",
                                () => mutate(log?._id)
                              );
                            }}
                            loading={loadingStatus}
                            status={log?.status}
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
