import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddressRouter from "../routes/address";
import AddressDetailRouter from "../routes/addressDetail";
import LoginRouter from "../routes/login";
import MainRouter from "../routes/main";
import ProfileRouter from "../routes/profile";
import ProfileDetailRouter from "../routes/profileDetail";
import SearchRouter from "../routes/search";
import userObj from "./userObj";

const AppRouter = ({ userObj }: userObj) => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainRouter userObj={userObj} />} />
          <Route path="/search" element={<SearchRouter />} />
          <Route path="/login" element={<LoginRouter userObj={userObj} />} />
          <Route
            path="/address"
            element={<AddressRouter userObj={userObj} />}
          />
          <Route path="/address/detail" element={<AddressDetailRouter />} />
          <Route
            path="/profile"
            element={<ProfileRouter userObj={userObj} />}
          />
          <Route
            path="/profile/detail"
            element={<ProfileDetailRouter userObj={userObj} />}
          />
          <Route path="/*" element={<>error 404</>} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
