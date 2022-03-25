import React from "react";
import { image_url } from "../../../Util/connection_strings";

export default function Avatar({ url, className, style }) {
  return (
    <img
      src={
        url
          ? `${image_url}${url}`
          : "app-assets/images/portrait/small/avatar-s-1.png"
      }
      alt="some_image"
      className={className}
      style={style}
      // IF IMAGES ARE BEING BROKEN UNCOMMENT THIS
      crossOrigin="anonymous"
    />
  );
}
