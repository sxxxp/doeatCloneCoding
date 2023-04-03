import React from "react";
import { useNavigate } from "react-router-dom";
import userObj from "./userObj";
import { IsLogin } from "./Function";
const MainShop = ({ userObj }: userObj) => {
  const navigate = useNavigate();
  const onShopClick = (event: React.MouseEvent<HTMLDivElement>) => {
    IsLogin(userObj, navigate);
  };
  return (
    <div className="shop-wrapper">
      <div className="shop-article-wrapper" onClick={onShopClick}>
        <div>
          <span style={{ fontWeight: "bold" }}>
            우리동네 BEST 맛집
            <p style={{ fontSize: "8px", color: "gray" }}>
              이웃들이 좋아하는 우리 동네 맛집!
            </p>
          </span>
        </div>
        <img src="tea.png" alt="이미지1" className="shop-image" />
        <h3 style={{ margin: 0 }}>홍차 맛집 러시아점 본사</h3>
        <h4 style={{ color: "gray", margin: 0 }}>★-4.4 (711) · 무료배달</h4>
        <h5 className="gray-background">배달 30~40시간</h5>
      </div>
    </div>
  );
};

export default MainShop;
