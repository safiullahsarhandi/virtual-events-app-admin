import React from "react";
import { getSubscriptionLogs } from "../../../Apis";
import Table from "../../../Components/Elements/Table/Table";
import useFetchData from "../../../Hooks/useFetchData";
import useTableControls from "../../../Hooks/useTableControls";
import { formatCurrency, format_date } from "../../../Util/helpers";

export default function SubscriptionLogs() {
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
  } = useFetchData("payment_logs_subscription", getSubscriptionLogs, [
    perPage,
    search_string,
    from,
    to,
  ]);

  return (
    <Table
      headings={["PLAN NAME", "SUBSCRIBED ON", "EXPIRY DATE", "AMOUNT PAID"]}
      perPage={perPage}
      setPerPage={setPerPage}
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
            <td>{log?.package?.name}</td>
            <td>{formatCurrency(log?.subscription_price)}</td>
            <td>{format_date(log?.renewal_date)}</td>
            <td>{format_date(log?.current_subscription_date)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
