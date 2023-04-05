import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddressRouter from "../routes/address";
import AddressDetailRouter from "../routes/addressDetail";
import AlarmRouter from "../routes/alarm";
import LoginRouter from "../routes/login";
import MainRouter from "../routes/main";
import ProfileRouter from "../routes/profile";
import ProfileDetailRouter from "../routes/profileDetail";
import ProfileEditRouter from "../routes/profileEdit";
import SearchRouter from "../routes/search";
import { refreshUser } from "./userObj";

const AppRouter = ({ userObj, refreshUser }: refreshUser) => {
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
            element={
              <ProfileDetailRouter
                userObj={userObj}
                refreshUser={refreshUser}
              />
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProfileEditRouter userObj={userObj} refreshUser={refreshUser} />
            }
          />
          <Route path="/alarm" element={<AlarmRouter userObj={userObj} />} />
          <Route path="/*" element={<>error 404</>} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
