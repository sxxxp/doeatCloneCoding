import React from "react";
import "../App.scss";
import { useNavigate } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";
import userObj from "../components/userObj";
import MainShop from "../components/MainShop";
import BannerSlider from "../components/BannerSlider";
import SizeBox from "../components/marginBox";

const MainRouter = ({ userObj }: userObj) => {
  const navigate = useNavigate();
  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    arrows: false,
    slidesToScroll: 5,
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
      <div style={{ textAlign: "center", fontSize: "1rem" }}>
        <h3 onClick={onItemClick}>{props.children}</h3>
      </div>
    );
  };

  return (
    <>
      <MainHeader userObj={userObj}></MainHeader>
      <div style={{ paddingTop: "75px" }}></div>
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
      <SizeBox size={30} />
      <BannerSlider items={["banner1.png", "banner2.png"]} />
      <SizeBox size={50} />

      <MainShop userObj={userObj}></MainShop>
      <MainFooter userObj={userObj}></MainFooter>
    </>
  );
};

export default MainRouter;
