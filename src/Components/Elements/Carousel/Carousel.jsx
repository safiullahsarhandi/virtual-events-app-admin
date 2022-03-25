// App.js
import React, { useState, useEffect } from "react";
import "./styles.css";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageViewer from "../Form/ImageViewer";

function Carousel({ images }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [selected_image, setSelectedImage] = useState("");

  console.log("images: ", images);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, []);

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
  };

  const settingsThumbs = {
    slidesToShow: 5,
    slidesToScroll: 5,
    asNavFor: ".slider-for",
    dots: true,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: "10px",
    infinite: images?.length < 5 ? false : true,
  };

  return (
    <>
      <div className="App">
        <div className="slider-wrapper">
          <Slider
            {...settingsMain}
            asNavFor={nav2}
            ref={(slider) => setSlider1(slider)}
            infinite
          >
            {images?.map((slide) => (
              <div
                className="slick-slide"
                data-toggle="modal"
                data-target="#lightbox"
                onClick={() => setSelectedImage(slide)}
              >
                <div class="parent">
                  <ImageViewer className="image1" src={slide} />
                </div>
              </div>
            ))}
          </Slider>
          <div className="thumbnail-slider-wrap mb-5">
            <Slider
              {...settingsThumbs}
              asNavFor={nav1}
              ref={(slider) => setSlider2(slider)}
            >
              {images?.map((slide) => (
                <div className="slick-slide slick-current">
                  <ImageViewer
                    className="img-fluid"
                    src={slide}
                    style={{
                      width: "77px",
                      objectFit: "contain",
                      height: "122px",
                      margin: "0px auto",
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div
        className="modal fade bd-example-modal-lg"
        id="lightbox"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="lightboxLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <ImageViewer
              className="lightbox-img image2-lightbox"
              src={selected_image}
              alt="some"
              crossOrigin="anonymous"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Carousel;
