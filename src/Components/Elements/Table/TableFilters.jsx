import React, { useState } from "react";
import TablePagination from "./TablePagination";
import InputDatePicker from "../Form/InputDatePicker";
import Input from "../Form/Input";
import Loading from "../Icons/Loading";
import Search from "../Icons/Search";
import { useDebouncedEffect } from "../../../Hooks/useDebouncedEffect";

export default function TableFilters({
  setSearchString,
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
  const [internal_search, setInternalSearch] = useState("");

  useDebouncedEffect(
    () => setSearchString && setSearchString(internal_search),
    [internal_search],
    500
  );

  return (
    <div>
      <h4 class="text-40">Filters</h4>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-white-rounded p-lg-3 p-1">
            <div className="row">
              {setFrom && setTo && (
                <div className="col-lg-6">
                  <div className="d-lg-flex align-items-center">
                    <div className="mr-1 mt-1">
                      <p className="fw-600 mb-0">Sort By Date:</p>
                    </div>
                    <div className="mr-md-1 mt-1">
                      <InputDatePicker
                        onChange={setFrom}
                        value={from}
                        maxDate={to}
                      />
                    </div>
                    <div className="mr-md-1 mt-1">
                      <InputDatePicker
                        onChange={setTo}
                        value={to}
                        minDate={from}
                      />
                    </div>
                  </div>
                </div>
              )}
              {setSearchString && (
                <div
                  className={`col-lg-4 ${
                    setFrom && setTo ? "offset-lg-2" : ""
                  } mt-1`}
                >
                  <div className="form-group position-relative">
                    <Input
                      value={internal_search}
                      className="form-control input-login black"
                      onChange={(internal_search) =>
                        setInternalSearch(internal_search)
                      }
                      endIcon={
                        isFetching ? (
                          <Loading style={{ marginTop: -10 }} />
                        ) : (
                          <Search />
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="row justify-content-between">
              <TablePagination perPage={perPage} setPerPage={setPerPage} />
              <div className="col-lg-4">
                {status_options?.length > 0 && (
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="mr-1 mt-1">
                      <p className="fw-600 mb-0">{status_label}:</p>
                    </div>
                    <div className="mr-1 mt-1">
                      <select
                        className="form-control input1"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">All</option>
                        {status_options?.map((status) => (
                          <option value={status?.value}>{status?.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
