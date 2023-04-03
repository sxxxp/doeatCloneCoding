import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.scss";
import { IsLogin } from "./Function";
import userObj from "./userObj";
const MainFooter = ({ userObj }: userObj) => {
  const navigate = useNavigate();

  const onFooterClick = (event: React.MouseEvent) => {
    if (IsLogin(userObj, navigate)) {
    } else {
      event.preventDefault();
    }
  };
  return (
    <footer className="footer-wrapper">
      <div style={{ display: "flex" }}>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isActive ? "footer-nav-active" : "footer-nav"
          }
        >
          <h2>홈</h2>
        </NavLink>
        <NavLink
          to="/favorite"
          onClick={onFooterClick}
          className={({ isActive, isPending }) =>
            isActive ? "footer-nav-active" : "footer-nav"
          }
        >
          <h2>찜</h2>
        </NavLink>
        <NavLink
          to="/log"
          onClick={onFooterClick}
          className={({ isActive, isPending }) =>
            isActive ? "footer-nav-active" : "footer-nav"
          }
        >
          <h2>주문내역</h2>
        </NavLink>
        <NavLink
          to="/nomination"
          onClick={onFooterClick}
          className={({ isActive, isPending }) =>
            isActive ? "footer-nav-active" : "footer-nav"
          }
        >
          <h2>맛집추천</h2>
        </NavLink>
        <NavLink
          to="/profile"
          onClick={onFooterClick}
          className={({ isActive, isPending }) =>
            isActive ? "footer-nav-active" : "footer-nav"
          }
        >
          <h2>마이두잇</h2>
        </NavLink>
      </div>
    </footer>
  );
};
export default MainFooter;
