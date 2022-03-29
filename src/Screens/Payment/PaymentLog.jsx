import React, { useState } from "react";
import { paymentLogs } from "../../Apis";
import AppRoot from "../../Components/AppRoot";
import Table from "../../Components/Elements/Table/Table";
import Tabs from "../../Components/Elements/Tabs/Tabs";
import useFetchData from "../../Hooks/useFetchData";
import useTableControls from "../../Hooks/useTableControls";
import { formatCurrency, format_date } from "../../Util/helpers";

export default function PaymentLog() {
  const [selected, setSelected] = useState(0); // 0 = SUBSCRIPTIONS, 1 = ORDER, 2 = EVENTS
  const { perPage, setPerPage } = useTableControls();

  const {
    // INTERNAL EXPORTS
    setPage,
    // REACT QUERY EXPORTS
    isFetching,
    isLoading,
    data,
  } = useFetchData("payment_logs", paymentLogs, [perPage, selected]);

  return (
    <AppRoot>
      <div className="row">
        <div className="col-12 px-xl-4 pt-xl-2">
          <div className="card my-sm-5 mx-2">
            <div className="card-content collapse show">
              <div className="card-dashboard">
                <div className="row">
                  <div className="col-lg-6 mt-2">
                    <h5 className="main-heading">Payment Logs</h5>
                  </div>
                  <div className="col-lg-12 mt-2">
                    <Tabs
                      tabs={["SUBSCRIPTION", "ORDER", "EVENT - PAY PER CLICK"]}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </div>
                </div>
                <Table
                  headings={
                    selected === 0
                      ? [
                          "SUBSCRIPTION PLAN",
                          "EXPIRATION DATE",
                          "AMOUNT",
                          "PAYMENT STATUS",
                          "USER ID",
                          "USER NAME",
                        ]
                      : selected === 1
                      ? ["ORDER ID", "ORDER STATUS", "USER ID", "USER NAME"]
                      : []
                  }
                  perPage={perPage}
                  setPerPage={setPerPage}
                  totalPages={data?.data?.logs?.totalPages}
                  setPage={setPage}
                  data={data?.data?.logs?.docs}
                  isFetching={isFetching}
                  isLoading={isLoading}
                >
                  <tbody>
                    {data?.data?.logs?.docs?.map((log) =>
                      selected === 0 ? (
                        <tr>
                          <td>{log?.subscription?.package?.name}</td>
                          <td>
                            {format_date(log?.subscription?.renewal_date)}
                          </td>
                          <td>{formatCurrency(log?.amount)}</td>
                          <td>{log?.payment_status}</td>
                          <td>{log?.user?._id}</td>
                          <td>{log?.user?.name}</td>
                        </tr>
                      ) : selected === 1 ? (
                        <tr>
                          <td>{log?.order?._id}</td>
                          <td>{log?.order?.order_status}</td>
                          <td>{log?.user?._id}</td>
                          <td>{log?.user?.name}</td>
                        </tr>
                      ) : (
                        <></>
                      )
                    )}
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
