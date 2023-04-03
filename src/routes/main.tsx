import React from "react";
import "../App.scss";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";
import userObj from "../components/userObj";
import MainShop from "../components/MainShop";

const MainRouter = ({ userObj }: userObj) => {
  const navigate = useNavigate();
  const settings = {
    className: "center",
    centerMode: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    arrows: false,
    slidesToScroll: 5,
    style: { textAlign: "center" },
  };
  const setting = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  const onItemClick = (event: React.MouseEvent<HTMLHeadingElement>) => {
    navigate(`/order/${event.currentTarget.innerText}`);
  };

  const Item = (
    props: React.DetailedHTMLProps<
      React.HtmlHTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  ) => {
    return (
      <div>
        <h3 onClick={onItemClick}>{props.children}</h3>
      </div>
    );
  };

  return (
    <>
      <MainHeader userObj={userObj}></MainHeader>
      <Slider {...settings}>
        <Item>한식</Item>
        <Item>일식·회</Item>
        <Item>중식</Item>
        <Item>양식</Item>
        <Item>치킨·버거</Item>
        <Item>아시안</Item>
        <Item>분식</Item>
        <Item>카페·디저트</Item>
        <Item>야식·안주</Item>
      </Slider>
      <div style={{ margin: "30px" }}></div>
      <Slider {...setting}>
        <div>
          <h1>배너 이미지1</h1>
        </div>
        <div>
          <h1>배너 이미지2</h1>
        </div>
      </Slider>

      <MainShop userObj={userObj}></MainShop>
      <MainFooter userObj={userObj}></MainFooter>
    </>
  );
};

export default MainRouter;
