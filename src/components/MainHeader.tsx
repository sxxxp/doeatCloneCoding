import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSearch,
  faBell,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../FirebaseInst";
import Swal from "sweetalert2";
import {  doc, onSnapshot } from "firebase/firestore";
import "../App.scss";
import userObj from "./userObj";
import { IsLogin } from "./Function";
const MainHeader = ({ userObj }: userObj) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const onAddressClick = () => {
    if (IsLogin(userObj, navigate)) navigate("/address");
  };
  const onSearchClick = () => {
    navigate("/search");
  };
  const onLogoutClick = () => {
    authService.signOut();
    setAddress("");
    Swal.fire({
      title: "로그아웃 되었습니다.",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  useEffect(() => {
    if (userObj) {
      onSnapshot(doc(dbService, "address", userObj.uid), (doc) => {
        if (doc.data()!.address) setAddress(doc.data()!.address);
        // if (snapshot)
        //   snapshot.docs.map((doc) => setAddress(doc.data().address));
      });
    }
  }, [userObj]);
  return (
    <header className="header">
      <h4 onClick={onAddressClick} className="header-address">
        {address ? address : "대표 주소 설정"}{" "}
        <FontAwesomeIcon icon={faChevronDown} />
      </h4>
      <div style={{ display: "inline-block", textAlign: "center" }}>
        {userObj && (
          <div style={{ display: "inline" }} onClick={onLogoutClick}>
            <FontAwesomeIcon
              className="header-icon"
              icon={faRightFromBracket}
              size="xl"
            />
          </div>
        )}
        <div style={{ display: "inline" }} onClick={onSearchClick}>
          <FontAwesomeIcon className="header-icon" icon={faSearch} size="xl" />
        </div>
        <div style={{ display: "inline" }}>
          <FontAwesomeIcon className="header-icon" icon={faBell} size="xl" />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
