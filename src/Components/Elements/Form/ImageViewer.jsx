import React from "react";
import { image_url } from "../../../Util/connection_strings";

export default function ImageViewer({ src, className, style }) {
  return (
    <img
      src={`${image_url}${src}`}
      className={className}
      alt=""
      crossOrigin="anonymous"
      style={style}
    />
  );
}
