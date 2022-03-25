import React from "react";
import Pagination from "./Pagination";
import TableFilters from "./TableFilters";
import TableHeader from "./TableHeader";
import TableBodyHandler from "./TableBodyHandler";

export default function Table({
  headings,
  setSearchString,
  totalPages,
  setPage,
  data,
  children,
  isLoading,
  status_options,
  status_label,
  status,
  setStatus,
  perPage,
  setPerPage,
  from,
  setFrom,
  to,
  setTo,
  isFetching,
}) {
  return (
    <div className="dashCard mt-2 py-3">
      <section id="configuration" className="user-page">
        <div className="row">
          <div className="col-12">
            <TableFilters
              setSearchString={setSearchString}
              status_options={status_options}
              status_label={status_label}
              status={status}
              setStatus={setStatus}
              perPage={perPage}
              setPerPage={setPerPage}
              from={from}
              setFrom={setFrom}
              to={to}
              setTo={setTo}
              isFetching={isFetching}
            />
            <div className="shadow-none">
              <div className>
                <div className="row mt-1">
                  <div className="dataTables_wrapper">
                    <div className="maain-tabble table-responsive">
                      <table className="table table-borderless dataTable">
                        <TableHeader headings={headings} />
                        <TableBodyHandler
                          data={data}
                          length={headings?.length}
                          isLoading={isLoading}
                        />
                        {children}
                      </table>
                    </div>
                    <Pagination totalPages={totalPages} setPage={setPage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
