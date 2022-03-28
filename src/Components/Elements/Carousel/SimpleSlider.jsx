import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Button from "../Form/Button";
import ImageViewer from "../Form/ImageViewer";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };

    return (
      <Slider {...settings}>
        {this.props.images?.map((img, index) => (
          <div key={index}>
            <ImageViewer src={img} className="img-fluid w-100 product-main" />
            <div style={{ textAlign: "center" }}>
              {this.props.enable_delete && (
                <Button
                  onClick={() => this.props.handleDeleteImage(index)}
                  className="site-btn pur-border px-5"
                  style={{ margin: 10 }}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))}
      </Slider>
    );
  }
}
