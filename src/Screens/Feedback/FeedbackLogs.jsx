import React from "react";
import { getFeedbackLogs } from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import Table from "../../Components/Elements/Table/Table";
import TableMenu from "../../Components/Elements/Table/TableMenu";
import useFetchData from "../../Hooks/useFetchData";
import useLocationTitle from "../../Hooks/useLocationTitle";
import useTableControls from "../../Hooks/useTableControls";
import { format_date } from "../../Util/helpers";

export default function FeedbackLogs() {
  const {
    perPage,
    setPerPage,
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
  } = useFetchData("feedback_logs", getFeedbackLogs, [
    perPage,
    search_string,
    from,
    to,
  ]);

  useLocationTitle("Feedback");

  return (
    <AppRoot>
      <div className="row">
        <div className="col-12">
          <div className="card p-xl-4 p-2">
            <div className="row mb-3">
              <div className="col-lg-6 mt-2">
                <h5 className="main-heading">Feedback</h5>
              </div>
            </div>
            <Table
              headings={["NAME", "DATE", "EMAIL", "ACTION"]}
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
            >
              <tbody>
                {data?.data?.logs?.docs?.map((log) => (
                  <tr>
                    <td>{log?.name}</td>
                    <td>{format_date(log?.createdAt)}</td>
                    <td>{log?.email}</td>
                    <td>
                      <TableMenu
                        details_link={`/feedback/details/${log?._id}`}
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
    </AppRoot>
  );
}
