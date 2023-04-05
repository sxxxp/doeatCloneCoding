import React from "react";
import PrevPage from "../components/PrevPage";
import userObj from "../components/userObj";

const AlarmRouter = ({ userObj }: userObj) => {
  return (
    <div>
      <PrevPage color="black" />
      <h1 className="center">알림함</h1>
    </div>
  );
};

export default AlarmRouter;
