import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const PrevPage = ({ color }: { color: string }) => {
  const navigate = useNavigate();
  const onArrowClick = () => {
    navigate(-1);
  };
  return (
    <FontAwesomeIcon
      style={{ float: "left", margin: "1% 0 0 1%", color: color }}
      onClick={onArrowClick}
      icon={faArrowLeft}
      size="2x"
    />
  );
};

export default PrevPage;
