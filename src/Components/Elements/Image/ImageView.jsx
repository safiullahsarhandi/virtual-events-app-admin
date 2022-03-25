import React from "react";
import { image_url } from "../../../Util/connection_strings";

export default function ImageView({ src, style }) {
  return (
    <img
      src={`${image_url}${src}`}
      alt={src}
      className="img-fluid"
      style={style}
      crossOrigin="anonymous"
    />
  );
}
