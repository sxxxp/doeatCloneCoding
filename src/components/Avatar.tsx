import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { authService, storageService } from "../FirebaseInst";
import { refreshUser } from "./userObj";

const Avatar = ({ userObj, refreshUser }: refreshUser) => {
  const [photo, setPhoto] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    const {
      currentTarget: { files },
    } = e;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = (ev) => {
      if (typeof ev.target?.result === "string") {
        setPhoto(ev.target.result);
        let url = ev.target.result;
        Swal.fire({
          title: "이미지 변경",
          confirmButtonText: "변경",
          confirmButtonColor: "orangered",
        }).then(async (result) => {
          if (result.isConfirmed) {
            console.log(photo);
            const attachmentRef = ref(
              storageService,
              `profileImage/${userObj!.uid}`
            );
            const response = await uploadString(attachmentRef, url, "data_url");
            let photoURL = await getDownloadURL(response.ref);
            await updateProfile(authService.currentUser!, {
              photoURL: photoURL,
            });
            refreshUser();
          }
        });
      }
    };
  };
  useEffect(() => {
    if (userObj?.photoURL) setPhoto(userObj.photoURL);
  }, [userObj]);
  return (
    <div
      style={{ textAlign: "center", position: "relative" }}
      onClick={(e) => {
        inputRef.current?.click();
      }}
    >
      <img
        src={photo ? photo : ""}
        alt=""
        style={{ width: "128px", height: "128px", borderRadius: "64px" }}
      />
      <FontAwesomeIcon icon={faPen} className="avatar-icon" />
      <input
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={onImageChange}
      />
    </div>
  );
};

export default Avatar;
