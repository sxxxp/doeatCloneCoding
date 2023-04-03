import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userObj from "./userObj";
import { IsLogin } from "./Function";
interface shop {
  name: string;
  star: string;
  time: string;
  thumbnail: string;
}
const MainShop = ({ userObj }: userObj) => {
  const navigate = useNavigate();
  const [shops, setShops] = useState<shop[]>([]);
  const onShopClick = (event: React.MouseEvent<HTMLDivElement>) => {
    IsLogin(userObj, navigate);
  };
  useEffect(() => {
    setShops([
      {
        name: "홍차 맛집 러시아점 본사",
        star: "-4.4 (711)",
        time: "30~40시간",
        thumbnail: "tea.png",
      },
      {
        name: "홍차 맛집 안산점",
        star: "4.4 (514)",
        time: "30~40분",
        thumbnail: "tea.png",
      },
    ]);
  }, []);
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
        {shops.map((shop) => (
          <div style={{ marginBottom: "50px" }} key={shop.name}>
            <img src={shop.thumbnail} alt="이미지1" className="shop-image" />
            <h3 style={{ margin: 0 }}>{shop.name}</h3>
            <h4 style={{ color: "gray", margin: 0 }}>
              ★{shop.star} · 무료배달
            </h4>
            <h5 className="gray-background">배달 {shop.time}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainShop;
