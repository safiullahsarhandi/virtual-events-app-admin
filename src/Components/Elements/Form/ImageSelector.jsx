import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { image_url } from "../../../Util/connection_strings";

export default function ImageSelector({
  onChange,
  value,
  className,
  style,
  is_edit,
  accept,
  disable_thumbnail,
  custom_tag,
}) {
  const [defaultImage, setDefaultImage] = useState();
  const imageRef = useRef();

  useEffect(() => {
    setDefaultImage(`${image_url}${value}`);
    if (value && typeof value !== "string") {
      const objectURL = URL.createObjectURL(value);
      setDefaultImage(objectURL);
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [value]);

  const showOpenFileDialog = () => {
    imageRef.current.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    console.log(onChange);
    onChange(file);
  };

  return (
    <div>
      {value ? (
        !disable_thumbnail ? (
          <img
            src={defaultImage}
            alt=""
            className={className ? className : "img-fluid"}
            style={
              style
                ? style
                : {
                    width: 128,
                    height: 128,
                    borderRadius: 60,
                  }
            }
            crossOrigin="anonymous"
          />
        ) : (
          <p>{value?.name ? value?.name : value}</p>
        )
      ) : (
        <div
          style={{
            height: 150,
            width: 150,
            border: "1px solid #E8E8E8",
            background: "#FCF9F9",
            borderRadius: 15,
            padding: 10,
            textAlign: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={is_edit ? showOpenFileDialog : null}
        >
          <i
            className="fa fa-upload"
            style={{
              fontSize: 50,
              color: "#999999",
              marginTop: 28,
            }}
          />
          <p className="mt-1">Upload {custom_tag ? custom_tag : "Image"}</p>
        </div>
      )}
      {is_edit && (
        <div className="input-group my-3" onClick={showOpenFileDialog}>
          <div className="input-group-append m-0">
            <div className="d-flex align-items-center">
              <button className="site-btn">
                <img
                  src="images/upload-icon.png"
                  alt=""
                  className="img-fluid mr-1"
                  style={{ display: "none" }}
                />
                Change {custom_tag ? custom_tag : "Image"}
              </button>
            </div>
          </div>
        </div>
      )}
      <input
        ref={imageRef}
        type="file"
        style={{ display: "none" }}
        accept={accept ? accept : "image/*"}
        onChange={handleChange}
        onClick={(event) => {
          event.target.value = null;
        }}
      />
    </div>
  );
}
