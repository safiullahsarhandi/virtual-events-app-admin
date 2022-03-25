import React, { useState } from "react";

export default function InputPassword({
  value,
  onChange,
  disabled,
  max,
  placeholder,
  className,
}) {
  const [show_password, setShowPassword] = useState(false);

  return (
    <fieldset className={`form-group position-relative mb-0`}>
      <input
        type={show_password ? "text" : "password"}
        className={className}
        id="basicInput"
        value={value}
        onChange={(e) => {
          if (max ? e.target.value.length <= max : true)
            onChange && onChange(e.target.value);
        }}
        disabled={disabled}
        placeholder={placeholder}
      />
      <button
        className="btn view-btn position-absolute"
        onClick={(e) => {
          e.preventDefault();
          setShowPassword(!show_password);
        }}
        style={{ boxShadow: "none" }}
      >
        {show_password ? (
          <i className="fa fa-eye enter-icon right-icon" aria-hidden="true"></i>
        ) : (
          <i className="far fa-eye-slash enter-icon right-icon"></i>
        )}
      </button>
    </fieldset>
  );
}
