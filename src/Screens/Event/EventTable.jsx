import React, { useEffect, useState } from "react";
import { getEventLogs, searchEventCategories } from "../../Apis";
import Table from "../../Components/Elements/Table/Table";
import TableMenu from "../../Components/Elements/Table/TableMenu";
import useFetchData from "../../Hooks/useFetchData";
import useTableControls from "../../Hooks/useTableControls";
import { formatCurrency, format_date } from "../../Util/helpers";
import debounce from "debounce-promise";
import AsyncSelect from "react-select/async";
import Tabs from "../../Components/Elements/Tabs/Tabs";

export default function EventTable({ user, label }) {
  const {
    perPage,
    setPerPage,
    status,
    setStatus,
    search_string,
    setSearchString,
  } = useTableControls();
  const [selected, setSelected] = useState(0); // 0 = UPCOMMING, 1 = PAST EVENTS
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();

  const {
    // INTERNAL EXPORTS
    setPage,
    // REACT QUERY EXPORTS
    isFetching,
    isLoading,
    data,
  } = useFetchData("event_logs", getEventLogs, [
    perPage,
    search_string,
    status,
    category?.value,
    selected,
    user
  ]);

  useEffect(() => handleGetCategories(), []);

  const handleGetCategories = async (inputValue, callback) => {
    const { data } = await searchEventCategories(inputValue);

    if (callback) await callback(data?.categories);
    else setCategories(data?.categories);
  };

  const debounceLoadCategories = (inputValue, callBack) =>
    debounce(handleGetCategories(inputValue, callBack), 500, {
      leading: true,
    });

  return (
    <>
      <div className="row">
        <div className="col-lg-6 mt-2">
          <h5 className="main-heading">{label}</h5>
        </div>
        <div className="col-lg-12 mt-2">
          <Tabs
            tabs={["UPCOMMING EVENTS", "PAST EVENTS"]}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-sm-12 col-md-4">
          <div className="d-flex align-items-center">
            <div className="mr-1 mt-1">
              <p className="fw-600 mb-0">Filter By Category:</p>
            </div>
            <div className="mr-1 mt-1 w-100">
              <AsyncSelect
                loadOptions={(inputValue, callBack) =>
                  debounceLoadCategories(inputValue, callBack)
                }
                onChange={(opt) => {
                  setCategory(opt);
                }}
                defaultOptions={categories}
                value={category}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    cursor: "pointer",
                  }),
                }}
                placeholder=""
                isClearable
              />
            </div>
          </div>
        </div>
      </div>
      <Table
        headings={[
          "USER NAME",
          "EVENT NAME",
          "EVENT TYPE",
          "CATEGORY TYPE",
          "EVENT COST",
          "EVENT DATE",
          "EVENT TIME",
        ]}
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
        status_label="Event Types"
        status_options={[
          {
            label: "Pay Per Event",
            value: "Pay Per Event",
          },
          {
            label: "Subscription",
            value: "Subscription",
          },
        ]}
      >
        <tbody>
          {data?.data?.logs?.docs?.map((log) => (
            <tr>
              <td>{log?.user?.name}</td>
              <td>{log?.name}</td>
              <td>{log?.event_type}</td>
              <td>{log?.event_category?.name}</td>
              <td>{formatCurrency(log?.event_cost)}</td>
              <td>
                {format_date(log?.date)} {log?.time}
              </td>
              <td>
                <TableMenu
                  details_link={`/event/details/${log?._id}`}
                  disable_action
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
