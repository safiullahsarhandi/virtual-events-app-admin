import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Icons/Loading";

export default function TableMenu({
  loading,
  actionFunciton,
  status,
  details_link,
  edit_link,
  enable_edit,
  disable_action,
  disable_view,
}) {
  if (loading) return <Loading disable_center />;

  return (
    <div className="btn-group custom-dropdown ml-2 mb-1">
      <button
        type="button"
        className="btn transparent-btn btn-drop-table btn-sm"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fa fa-ellipsis-v"></i>
      </button>
      <div className="dropdown-menu text-left custom-dropdown">
        {!disable_view && (
          <Link
            to={details_link}
            className="dropdown-item d-flex align-items-center justify-content-start"
          >
            <i className="fas fa-eye"></i>
            View
          </Link>
        )}
        {enable_edit && (
          <Link
            to={edit_link}
            className="dropdown-item d-flex align-items-center justify-content-start"
          >
            <i class="fas fa-pencil-alt"></i>
            Edit
          </Link>
        )}
        {!disable_action && (
          <Link
            to="#"
            onClick={() => actionFunciton()}
            className="dropdown-item d-flex align-items-center justify-content-start"
          >
            {status ? (
              <>
                <i className="fas fa-times"></i>
                Inactive
              </>
            ) : (
              <>
                <i className="fas fa-check"></i>
                Active
              </>
            )}
          </Link>
        )}
      </div>
    </div>
  );
}
