import React from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { changeEventCategoryStatus, getEventCategoryLogs } from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import Confirmation from "../../Components/Elements/Modals/Modal.Confirmation";
import Error from "../../Components/Elements/Modals/Modal.Error";
import Success from "../../Components/Elements/Modals/Modal.Success";
import Table from "../../Components/Elements/Table/Table";
import TableMenu from "../../Components/Elements/Table/TableMenu";
import useFetchData from "../../Hooks/useFetchData";
import useTableControls from "../../Hooks/useTableControls";

export default function EventCategory() {
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
  } = useFetchData("event_cateogries", getEventCategoryLogs, [
    perPage,
    search_string,
    status,
    from,
    to,
  ]);

  const { mutate, isLoading: loadingStatus } = useMutation(
    (id) => changeEventCategoryStatus(id),
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
                    <h5 className="main-heading">Event Category Management</h5>
                  </div>
                  <div className="col-lg-6 text-right mt-2">
                    <Link
                      to="/event-category/add"
                      className="site-btn d-inline-block mx-1 mt-2"
                    >
                      Add Event Category
                    </Link>
                  </div>
                </div>
                <Table
                  headings={["NAME", "NUMBER OF EVENTS", "STATUS", "ACTION"]}
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
                        <td>{log?.name}</td>
                        <td>{log?.no_events || 0}</td>
                        <td>{log?.status ? "Active" : "Inactive"}</td>
                        <td>
                          <TableMenu
                            disable_view
                            edit_link={`/event-category/edit/${log?._id}`}
                            enable_edit
                            actionFunciton={() => {
                              Confirmation(
                                `Are You Sure You Want To ${
                                  log?.status ? "Block" : "Unblock"
                                } This Category?`,
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
