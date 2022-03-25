import React from "react";
import Loading from "../Icons/Loading";

export default function TableBodyHandler({ data, length, isLoading }) {
  return (
    <tbody>
      {isLoading && (
        <tr>
          <td colSpan={length} style={{ textAlign: "center" }}>
            <i
              className="fas fa-circle-notch fa-spin"
              style={{ fontSize: 42 }}
            ></i>
          </td>
        </tr>
      )}
      {data?.length === 0 && (
        <tr>
          <td colSpan={length} style={{ textAlign: "center" }}>
            No Records Found
          </td>
        </tr>
      )}
    </tbody>
  );
}
