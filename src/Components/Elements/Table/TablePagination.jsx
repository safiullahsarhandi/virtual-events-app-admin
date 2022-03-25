import React from "react";

export default function TablePagination({ perPage, setPerPage }) {
  return (
    <div className="col-lg-4">
      <div className="d-flex align-items-center">
        <div className="mr-1 mt-1">
          <p className="fw-600 mb-0">Show</p>
        </div>
        <div className="mr-1 mt-1">
          <select
            value={perPage}
            onChange={(e) => setPerPage(e.target.value)}
            className="form-control input1"
            id
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="mr-1 mt-1">
          <p className="fw-600 mb-0">Entries</p>
        </div>
      </div>
    </div>
  );
}
