import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRouter from "../routes/login";
import MainRouter from "../routes/main";
import SearchRouter from "../routes/search";
interface RouterProps {
  userObj: Object | undefined;
}

const AppRouter = ({ userObj }: RouterProps) => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainRouter userObj={userObj} />} />
          <Route path="/search" element={<SearchRouter />} />
          <Route path="/login" element={<LoginRouter userObj={userObj} />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
