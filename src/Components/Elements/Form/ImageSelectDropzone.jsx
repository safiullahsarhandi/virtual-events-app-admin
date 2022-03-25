// components/simple-dropzone.component.js
import React, { useState } from "react";

import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

const ImageSelectDropzone = ({ files, setFiles, accept, maxFiles }) => {
  //

  const handleChangeStatus = ({ meta, file }, status) => {
    const temp_arr = [...files];
    if (status === "done") {
      temp_arr.push(file);
    }
    if (status === "removed") {
      const index = temp_arr.findIndex(
        (arr_file) => file.lastModified === arr_file.lastModified
      );
      if (index !== -1) temp_arr.splice(index, 1);
    }
    setFiles(temp_arr);
  };

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      accept={accept}
      maxFiles={maxFiles}
    />
  );
};

export default ImageSelectDropzone;
