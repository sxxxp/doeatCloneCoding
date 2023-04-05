import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import PrevPage from "../components/PrevPage";
import { refreshUser } from "../components/userObj";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { authService, dbService } from "../FirebaseInst";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const ProfileEditRouter = ({ userObj, refreshUser }: refreshUser) => {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userObj) {
      const docRef = doc(dbService, "info", userObj.uid);
      await setDoc(docRef, { text: info });
      if (userObj.displayName !== name) {
        await updateProfile(authService.currentUser!, {
          displayName: name,
        });
        refreshUser();
      }
      Swal.fire({
        title: "회원 정보가 변경되었습니다.",
        showConfirmButton: false,
        timer: 2000,
        icon: "success",
      });
      navigate(-1);
    }
  };
  useEffect(() => {
    if (userObj) {
      const docRef = doc(dbService, "info", userObj.uid);
      onSnapshot(docRef, (snapshot) => {
        setInfo(snapshot.data()!.text);
        // if (snapshot.data()!.text) setInfo(snapshot.data()!.text);
      });
      setName(userObj.displayName!);
      setPhoto(userObj.photoURL!);
    }
  }, [userObj]);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <PrevPage color="black" />
        <h1 className="center">프로필 수정</h1>
        <input type="submit" value="완료" className="profile-edit-submit" />
        {userObj?.uid && (
          <Avatar
            userObj={{ displayName: name, photoURL: photo, uid: userObj!.uid }}
            refreshUser={refreshUser}
          />
        )}
        <div className="profile-edit-wrapper">
          <h2 className="profile-edit-head">닉네임</h2>
          <input
            type="text"
            className="profile-edit-nickname"
            maxLength={25}
            required
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          />
          {name && (
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="2x"
              className="profile-edit-delete"
              onClick={(e) => {
                setName("");
              }}
            />
          )}

          <h2 className="profile-edit-head">자기소개</h2>
          <textarea
            className="profile-edit-info"
            placeholder={`${name ? name : "두잇러"}님을 소개해주세요!`}
            value={info}
            onChange={(e) => {
              setInfo(e.currentTarget.value);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileEditRouter;
