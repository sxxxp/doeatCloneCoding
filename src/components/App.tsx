import React, { useState, useEffect } from "react";
import { authService } from "../FirebaseInst";
import "../App.css";
import AppRouter from "./Router";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<
    | {
        displayName: string | null;
        uid: string;
        photoURL: string | null;
      }
    | undefined
  >(undefined);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user !== null) {
        let user_info = {
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
        };
        if (!user.displayName) {
          user_info.displayName = user.email!.split("@")[0];
        }
        setUserObj(user_info);
      } else {
        setUserObj(undefined);
      }
    });
    setInit(true);
  }, []);
  return (
    <>{init ? <AppRouter userObj={userObj} /> : <h1>페이지 로딩중...</h1>}</>
  );
}

export default App;
