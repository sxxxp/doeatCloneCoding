import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import PrevPage from "../components/PrevPage";
import { refreshUser } from "../components/userObj";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import "../App.scss";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";

const ProfileDetailRouter = ({ userObj, refreshUser }: refreshUser) => {
  const [listItem, setListItem] = useState<JSX.Element>(<h2>함께한 이웃</h2>);
  const naviagte = useNavigate();
  const onListClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const active = document.getElementsByClassName(
      "profile-detail-list-active"
    );
    active[0].className = "profile-detail-list";
    e.currentTarget.className = "profile-detail-list-active";
    setListItem(<h2>{e.currentTarget.id}</h2>);
  };
  return (
    <div>
      <PrevPage color="black" />
      <h1 className="center">프로필</h1>
      <Avatar userObj={userObj} refreshUser={refreshUser} />
      <div className="center">
        <h1>{userObj?.displayName}</h1>
        <span style={{ color: "gray" }}>
          <b>0</b> 내 밥친구 <b>0</b> 서로 밥친구
        </span>
        <div
          className="profile-detail-button"
          onClick={(e) => {
            naviagte("/profile/edit");
          }}
        >
          <h4>프로필 수정</h4>
        </div>
        <div className="profile-detail-money">
          <FontAwesomeIcon
            icon={faWallet}
            size="3x"
            className="profile-detail-money-icon"
          />
          <h4 className="profile-detail-money-wrapper">
            두잇으로 아낀 배달비
            <p className="profile-detail-money-value">0원</p>
          </h4>
        </div>
        <div className="profile-detail-list-wrapper">
          <div
            className="profile-detail-list-active"
            id="함께한 이웃"
            onClick={onListClick}
          >
            <h3>함께한 이웃</h3>
          </div>
          <div
            className="profile-detail-list"
            id="포스트"
            onClick={onListClick}
          >
            <h3>포스트</h3>
          </div>
          <div
            className="profile-detail-list"
            id="냠냠 다이어리"
            onClick={onListClick}
          >
            <h3>냠냠 다이어리</h3>
          </div>
          <div
            className="profile-detail-list"
            id="쩝쩝 어워드"
            onClick={onListClick}
          >
            <h3>쩝쩝 어워드</h3>
          </div>
        </div>
        <div id="list-item">{listItem}</div>
      </div>
    </div>
  );
};

export default ProfileDetailRouter;
