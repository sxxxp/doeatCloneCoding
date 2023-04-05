import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "../FirebaseInst";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import userObj from "../components/userObj";
import PrevPage from "../components/PrevPage";
const LoginRouter = ({ userObj }: userObj) => {
  const navigate = useNavigate();
  const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
      await signInWithPopup(authService, provider);
      navigate(-1);
    }
  };

  return (
    <div className="login-wrapper">
      <PrevPage color="white"></PrevPage>
      <h2 className="login-head-wrapper">
        <span className="font-normal">배달비 없는 배달앱, </span>두잇
      </h2>
      <img src="doeat.png" alt="" />
      <p>지금 두잇 시작하고 배달비 무료로 드세요!</p>
      <button onClick={onSocialClick} name="google" className="login-button">
        <h2>
          <FontAwesomeIcon icon={faGoogle} /> 구글 로그인
        </h2>
      </button>
    </div>
  );
};

export default LoginRouter;
