import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PrevPage from "../components/PrevPage";
import userObj from "../components/userObj";
import { faPen, faWallet } from "@fortawesome/free-solid-svg-icons";

const ProfileDetailRouter = ({ userObj }: userObj) => {
  return (
    <div>
      <PrevPage color="black" />
      <h1 style={{ textAlign: "center" }}>프로필</h1>
      <div style={{ textAlign: "center", position: "relative" }}>
        <img
          src={userObj?.photoURL ? userObj.photoURL : ""}
          alt=""
          style={{ width: "128px", height: "128px", borderRadius: "64px" }}
        />
        <FontAwesomeIcon
          icon={faPen}
          style={{
            position: "absolute",
            left: "52%",
            marginTop: "85px",
            backgroundColor: "#F54920",
            color: "white",
            padding: "10px",
            borderRadius: "20px",
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <h1>{userObj?.displayName}</h1>
        <span style={{ color: "gray" }}>
          <b style={{ color: "black" }}>0</b> 내 밥친구{" "}
          <b style={{ color: "black" }}>0</b> 서로 밥친구
        </span>
        <div
          style={{
            width: "300px",
            border: "2px solid orange",
            margin: "0 auto",
            color: "orangered",
            marginTop: "30px",
            borderRadius: "8px",
          }}
        >
          <h4>프로필 수정</h4>
        </div>
        <div
          style={{
            width: "600px",
            margin: "0 auto",
            border: "2px solid #e9ecef",
            marginTop: "30px",
            position: "relative",
            textAlign: "left",
          }}
        >
          <FontAwesomeIcon
            icon={faWallet}
            size="3x"
            style={{ position: "absolute", left: "30px", top: "25%" }}
          />
          <h4 style={{ marginLeft: "100px" }}>
            두잇으로 아낀 배달비
            <p style={{ fontSize: "25px", margin: "0", color: "orangered" }}>
              0원
            </p>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailRouter;
