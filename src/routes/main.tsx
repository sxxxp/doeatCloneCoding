import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSearch,
  faBell,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { authService } from "../FirebaseInst";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface MainProps {
  userObj: Object | undefined;
}

const MainRouter = ({ userObj }: MainProps) => {
  const navigate = useNavigate();
  const settings = {
    className: "center",
    dots: true,
    infinite: false,
    speed: 500,

    slidesToShow: 7,
    slidesToScroll: 5,
    style: { textAlign: "center" },
  };
  const setting = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  const onAdressClick = () => {
    if (typeof userObj === "undefined") {
      Swal.fire({
        title: "로그인이 필요한 서비스입니다.",
        confirmButtonText: "로그인하기",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
        console.log(result);
      });
    } else {
    }
    return <></>;
  };
  const onSearchClick = () => {
    navigate("/search");
  };
  const onLogoutClick = () => {
    authService.signOut();
    Swal.fire({
      title: "로그아웃 되었습니다.",
      showConfirmButton: false,
      timer: 1500,
    });
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
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#e9ecef",
        }}
      >
        <h4 onClick={onAdressClick} style={{ margin: 0, padding: "2% 0%" }}>
          대표 주소 설정 <FontAwesomeIcon icon={faChevronDown} />
        </h4>
        <div style={{ display: "inline-block", textAlign: "center" }}>
          {userObj && (
            <div style={{ display: "inline" }} onClick={onLogoutClick}>
              <FontAwesomeIcon
                style={{ margin: "16px 30px 16px 0" }}
                icon={faRightFromBracket}
                size="xl"
              />
            </div>
          )}
          <div style={{ display: "inline" }} onClick={onSearchClick}>
            <FontAwesomeIcon
              icon={faSearch}
              style={{ margin: "16px 30px 16px 0" }}
              size="xl"
            />
          </div>
          <div style={{ display: "inline" }}>
            <FontAwesomeIcon
              style={{ margin: "16px 30px 16px 0" }}
              icon={faBell}
              size="xl"
            />
          </div>
        </div>
      </header>
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
          <h1>이미지1</h1>
        </div>
        <div>
          <h1>이미지2</h1>
        </div>
      </Slider>
      <footer
        style={{
          position: "fixed",
          width: "100%",
          bottom: 0,
        }}
      >
        <div style={{ display: "flex" }}>
          <h2 style={{ flexGrow: 1, textAlign: "center" }}>홈</h2>
          <h2 style={{ flexGrow: 1, textAlign: "center" }}>찜</h2>
          <h2 style={{ flexGrow: 1, textAlign: "center" }}>주문내역</h2>
          <h2 style={{ flexGrow: 1, textAlign: "center" }}>맛집추천</h2>
          <h2 style={{ flexGrow: 1, textAlign: "center" }}>데이두잇</h2>
        </div>
      </footer>
    </>
  );
};

export default MainRouter;
