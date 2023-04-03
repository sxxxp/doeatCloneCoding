import {
  faBell,
  faChevronRight,
  faHome,
  faCreditCard,
  faTag,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import BannerSlider from "../components/BannerSlider";
import MainFooter from "../components/MainFooter";
import userObj from "../components/userObj";

const ProfileRouter = ({ userObj }: userObj) => {
  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>마이두잇</h2>
        <FontAwesomeIcon
          className="header-icon"
          icon={faBell}
          size="xl"
          style={{ position: "absolute", right: "10px", top: "10px" }}
        />
      </div>
      <div
        style={{ marginLeft: "200px", marginTop: "50px", position: "relative" }}
      >
        <img
          src={userObj?.photoURL ? userObj.photoURL : ""}
          alt=""
          style={{ width: "64px", height: "64px", borderRadius: "32px" }}
        />
        <span
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            display: "inline-block",
            position: "absolute",
            marginBottom: "30px",
            marginLeft: "20px",
          }}
        >
          {userObj?.displayName}
        </span>
        <FontAwesomeIcon
          icon={faChevronRight}
          size="2x"
          style={{ position: "absolute", right: "10%", marginTop: "20px" }}
        />
      </div>
      <div style={{ margin: "30px" }}></div>
      <BannerSlider items={["banner1.png", "banner2.png"]} />
      <div style={{ marginLeft: "10%" }}>
        <h2>
          <FontAwesomeIcon icon={faHome} /> 주소 관리
        </h2>
        <h2>
          <FontAwesomeIcon icon={faCreditCard} /> 간편결제 관리
        </h2>
        <h2>
          <FontAwesomeIcon icon={faTag} /> 할인쿠폰
        </h2>
        <h2>
          <FontAwesomeIcon icon={faBullhorn} /> 알림 설정
        </h2>
      </div>
      <MainFooter userObj={userObj} />
    </>
  );
};

export default ProfileRouter;
