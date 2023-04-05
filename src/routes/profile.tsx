import {
  faBell,
  faChevronRight,
  faHome,
  faCreditCard,
  faTag,
  faBullhorn,
  faCircleInfo,
  faRightFromBracket,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BannerSlider from "../components/BannerSlider";
import MainFooter from "../components/MainFooter";
import SizeBox from "../components/marginBox";
import userObj from "../components/userObj";
import { authService } from "../FirebaseInst";

const ProfileRouter = ({ userObj }: userObj) => {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    authService.signOut();
    Swal.fire({
      title: "로그아웃 되었습니다.",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  return (
    <div style={{ marginBottom: "100px" }}>
      <div>
        <h2 className="center">마이두잇</h2>
        <FontAwesomeIcon
          icon={faBell}
          size="xl"
          className="profile-header-icon"
          onClick={(e) => {
            navigate("/alarm");
          }}
        />
      </div>
      <div
        className="profile-wrapper"
        onClick={(e) => {
          navigate("/profile/detail");
        }}
      >
        <img
          src={userObj?.photoURL ? userObj.photoURL : ""}
          alt=""
          className="profile-image"
        />
        <span className="profile-name">{userObj?.displayName}</span>
        <FontAwesomeIcon
          icon={faChevronRight}
          size="2x"
          className="profile-icon"
        />
      </div>
      <SizeBox size={30} />
      <BannerSlider items={["banner1.jpg", "banner2.jpg"]} />
      <div className="profile-menu-wrapper">
        <h2
          onClick={(e) => {
            navigate("/address");
          }}
        >
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
      <div className="gray-bar"></div>
      <div className="profile-menu-wrapper">
        <h2>
          <FontAwesomeIcon icon={faCircleInfo} /> 약관 및 정책
        </h2>
        <h2>
          <FontAwesomeIcon icon={faBullhorn} /> 고객문의
        </h2>
        <h2 onClick={onLogoutClick}>
          <FontAwesomeIcon icon={faRightFromBracket} /> 로그아웃
        </h2>
        <h2>
          <FontAwesomeIcon icon={faCircleXmark} /> 회원탈퇴
        </h2>
      </div>
      <MainFooter userObj={userObj} />
    </div>
  );
};

export default ProfileRouter;
