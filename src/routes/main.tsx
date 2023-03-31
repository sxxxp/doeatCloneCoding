import React, { useEffect, useState } from "react";
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
import { authService, dbService } from "../FirebaseInst";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { collection, onSnapshot } from "firebase/firestore";
interface MainProps {
  userObj:
    | {
        displayName: string | null;
        uid: string;
        photoURL: string | null;
      }
    | undefined;
}

const MainRouter = ({ userObj }: MainProps) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const settings = {
    className: "center",
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
  const isLogin = (userObj: Object | undefined) => {
    if (typeof userObj === "undefined") {
      Swal.fire({
        title: "로그인이 필요한 서비스입니다.",
        confirmButtonText: "로그인하기",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
        return false;
      });
    } else {
      return true;
    }
  };
  const onAddressClick = () => {
    if (isLogin(userObj)) navigate("/address");
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
  const onShopClick = (event: React.MouseEvent<HTMLDivElement>) => {
    isLogin(userObj);
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
  useEffect(() => {
    if (userObj) {
      onSnapshot(collection(dbService, "address"), (snapshot) => {
        snapshot.docs.map((doc) => setAddress(doc.data().address));
      });
    }
  }, [userObj]);
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
        <h4 onClick={onAddressClick} style={{ margin: 0, padding: "2% 0%" }}>
          {address ? address : "대표 주소 설정"}{" "}
          <FontAwesomeIcon icon={faChevronDown} />
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
          <h1>배너 이미지1</h1>
        </div>
        <div>
          <h1>배너 이미지2</h1>
        </div>
      </Slider>
      <div style={{ marginLeft: "10px" }}>
        <span style={{ fontWeight: "bold" }}>우리동네 BEST 맛집</span>
        <p style={{ fontWeight: "bold", fontSize: "8px", color: "gray" }}>
          이웃들이 좋아하는 우리 동네 맛집!
        </p>
      </div>
      <div
        style={{
          justifyContent: "center",
          marginBottom: "100px",
        }}
      >
        <div style={{ width: "400px", margin: "0 auto" }} onClick={onShopClick}>
          <img
            src="cyka.jpg"
            alt="이미지1"
            style={{ width: "400px", height: "250px" }}
          />
          <h3 style={{ margin: 0 }}>홍차 맛집 러시아점 본사</h3>
          <h4 style={{ color: "gray", margin: 0 }}>★-4.4 (711) · 무료배달</h4>
          <h5
            style={{
              backgroundColor: "#e9ecef",
              display: "inline",
              color: "gray",
            }}
          >
            배달 30~40시간
          </h5>
        </div>
      </div>

      <footer
        style={{
          position: "fixed",
          width: "100%",
          backgroundColor: "white",
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
