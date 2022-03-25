import React from "react";
import { guidGenerator } from "../../../Util/helpers";

const id = guidGenerator();

export default function Checkbox({ label, value, onChange }) {
  return (
    <div className="form-group form-check pl-0">
      <input
        id={id}
        checked={value}
        type="checkbox"
        className="form-check-input"
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className="form-check-label fc-lpurple" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
