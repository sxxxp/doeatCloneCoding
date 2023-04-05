import React from "react";
import Slider, { Settings } from "react-slick";

const BannerSlider = ({ items }: { items: string[] }) => {
  const setting: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: false,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <Slider {...setting}>
      {items.map((item) => (
        <div key={item}>
          <img src={item} alt="" style={{ width: "100%", height: "150px" }} />
        </div>
      ))}
    </Slider>
  );
};
export default BannerSlider;
