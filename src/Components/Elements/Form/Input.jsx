import React from "react";

export default function Input({
  value,
  onChange,
  disabled,
  max,
  endIcon,
  placeholder,
  type,
  className,
}) {
  return (
    <>
      <input
        type={type}
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
        }}
      >
        {endIcon ? endIcon : null}
      </button>
    </>
  );
}
