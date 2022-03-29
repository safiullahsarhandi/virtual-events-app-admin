import React from "react";
import { useMutation } from "react-query";
import { changeStatusStory, getStoryLogs } from "../../Apis";
import Confirmation from "../../Components/Elements/Modals/Modal.Confirmation";
import Error from "../../Components/Elements/Modals/Modal.Error";
import Success from "../../Components/Elements/Modals/Modal.Success";
import Table from "../../Components/Elements/Table/Table";
import TableMenu from "../../Components/Elements/Table/TableMenu";
import useFetchData from "../../Hooks/useFetchData";
import useTableControls from "../../Hooks/useTableControls";

export default function StoryTable({ user }) {
  const {
    perPage,
    setPerPage,
    status,
    setStatus,
    search_string,
    setSearchString,
  } = useTableControls();

  const {
    // INTERNAL EXPORTS
    setPage,
    // REACT QUERY EXPORTS
    isFetching,
    isLoading,
    data,
    refetch,
  } = useFetchData("story_logs", getStoryLogs, [
    perPage,
    search_string,
    status,
    user,
  ]);

  const { mutate, isLoading: loadingStatus } = useMutation(
    (id) => changeStatusStory(id),
    {
      onSuccess: (res) => {
        refetch();
        Success(res?.data?.message);
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );

  return (
    <Table
      headings={["TITLE", "STORY TYPE", "CATEGORY", "STATUS", "ACTION"]}
      perPage={perPage}
      setPerPage={setPerPage}
      setSearchString={setSearchString}
      totalPages={data?.data?.logs?.totalPages}
      setPage={setPage}
      data={data?.data?.logs?.docs}
      isFetching={isFetching}
      isLoading={isLoading}
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
            <td>{log?.title}</td>
            <td>{log?.story_type}</td>
            <td>{log?.category?.name}</td>
            <td>{log?.status ? "Active" : "Inactive"}</td>
            <td>
              <TableMenu
                details_link={`/story/details/${log?._id}`}
                actionFunciton={() => {
                  Confirmation(
                    `Are You Sure You Want To ${
                      log?.status ? "Block" : "Unblock"
                    } This Story?`,
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
  );
}
