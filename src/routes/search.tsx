import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import PrevPage from "../components/PrevPage";
import { faX, faSearch } from "@fortawesome/free-solid-svg-icons";
import "../App.scss";

const SearchRouter = () => {
  const [search, setSearch] = useState("");
  const items = [
    "한식",
    "일식·회",
    "중식",
    "양식",
    "치킨·버거",
    "아시안",
    "카페·디저트",
    "분식",
    "야식·안주",
  ];
  return (
    <div>
      <div style={{ position: "relative" }}>
        <PrevPage color="black" />
        <input
          type="text"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder="어떤 메뉴, 가게를 찾고 있나요?"
        />
        <FontAwesomeIcon
          icon={faX}
          className="search-icon"
          onClick={(e) => setSearch("")}
        />
      </div>
      {search ? (
        <div style={{ marginLeft: "5%", marginTop: "5%" }}>
          <h2>
            <FontAwesomeIcon icon={faSearch} /> {search}
          </h2>
        </div>
      ) : (
        <div className="search-box-wrapper">
          <div className="search-box">
            <h3>
              <span className="search-box-tip">Tip</span> 두잇에는 이런 음식들이
              있어요!
            </h3>

            <div className="search-box-item-wrapper">
              {items.map((item) => (
                <div className="search-box-item">{item}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchRouter;
