import React from "react";
import { image_url } from "../../../Util/connection_strings";

export default function AudioPlayer({ src }) {
  return (
    <audio controls crossOrigin="anonymous">
      <source
        src={`${image_url}${src}`}
        type="audio/mp3"
        crossOrigin="anonymous"
      />
      Your browser does not support the audio element.
    </audio>
  );
}
