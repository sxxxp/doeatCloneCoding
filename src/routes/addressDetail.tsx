import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLocationDot,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { setDoc, doc, collection } from "firebase/firestore";
import { dbService } from "../FirebaseInst";
import Swal from "sweetalert2";
const AddressDetailRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [addressDetail, setAddressDetail] = useState("");
  const [name, setName] = useState("");
  const [isDefault, setIsDefault] = useState(true);
  const id = location.state.id;
  const userObj = location.state.userObj;
  const onArrowClick = () => {
    navigate(-1);
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (addressDetail && name) {
      const docs = {
        name: name,
        address: id + " " + addressDetail,
      };
      const docRef = doc(dbService, "address", userObj.uid);
      const colRef = collection(docRef, "addresses");
      await setDoc(doc(colRef, name), docs);
      if (isDefault) {
        setDoc(docRef, {
          name: name,
          address: id + " " + addressDetail,
        });
      }
      Swal.fire({
        title: "주소가 저장되었습니다.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setName("");
      setAddressDetail("");
      navigate("/");
    } else {
      if (!addressDetail) {
        document.getElementById("addressWarn")!.style.opacity = "1";
      }
      if (!name) {
        document.getElementById("nameWarn")!.style.opacity = "1";
      }
    }
  };
  return (
    <div>
      <FontAwesomeIcon
        style={{ float: "left", margin: "1% 0 0 1%" }}
        onClick={onArrowClick}
        icon={faArrowLeft}
        size="2x"
      />
      <h1 style={{ textAlign: "center" }}>상세 정보 입력</h1>
      <div style={{ marginTop: "5%" }}>
        <div style={{ display: "flex", marginLeft: "20px" }}>
          <FontAwesomeIcon
            icon={faLocationDot}
            size="3x"
            style={{
              margin: "25px 20px 0px 0px",
              display: "block",
            }}
          />
          <div>
            <h3 style={{ marginBottom: "0px" }}>{id}</h3>
            <p style={{ color: "gray" }}>
              <span style={{ backgroundColor: "#e9ecef" }}>도로명</span> {id}{" "}
              도로명주소
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div style={{ margin: "30px 0px 30px 20px" }}>
          <div
            id="addressDetail"
            style={{ color: "gray", opacity: "0", fontWeight: "bold" }}
          >
            상세주소
          </div>
          <input
            type="text"
            maxLength={30}
            placeholder="상세주소 (아파트/동/호)"
            value={addressDetail}
            autoComplete="false"
            style={{
              display: "block",
              width: "99%",
              height: "30px",
              border: "0px",
              fontWeight: "bold",
              outline: "none",
              fontSize: "20px",
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.currentTarget.value) {
                const div = document.getElementById("addressDetail");
                div!.style.opacity = "1";
              } else {
                const div = document.getElementById("addressDetail");
                div!.style.opacity = "0";
              }
              setAddressDetail(e.currentTarget.value);
            }}
          />
          <div id="addressWarn" style={{ opacity: "0", color: "red" }}>
            상세 주소를 입력해주세요.
          </div>
        </div>
        {addressDetail && (
          <FontAwesomeIcon
            icon={faX}
            onClick={() => {
              const div = document.getElementById("addressDetail");
              div!.style.opacity = "0";
              setAddressDetail("");
            }}
            style={{ position: "absolute", right: "80px", top: "298px" }}
          />
        )}
        <div style={{ margin: "30px 0px 30px 20px" }}>
          <div
            id="name"
            style={{ color: "gray", opacity: "0", fontWeight: "bold" }}
          >
            주소이름
          </div>
          <input
            type="text"
            placeholder="주소이름 (예: 우리집)"
            maxLength={30}
            autoComplete="flase"
            style={{
              display: "block",
              width: "99%",
              height: "30px",
              border: "0px",
              fontWeight: "bold",
              outline: "none",
              fontSize: "20px",
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.currentTarget.value) {
                const div = document.getElementById("name");
                div!.style.opacity = "1";
              } else {
                const div = document.getElementById("name");
                div!.style.opacity = "0";
              }
              setName(e.currentTarget.value);
            }}
            value={name}
          />
          <div id="nameWarn" style={{ opacity: "0", color: "red" }}>
            주소 이름을 입력해주세요.
          </div>
          {name && (
            <FontAwesomeIcon
              icon={faX}
              onClick={() => {
                const div = document.getElementById("name");
                div!.style.opacity = "0";
                setName("");
              }}
              style={{ position: "absolute", right: "80px", top: "402px" }}
            />
          )}
        </div>
        <div
          style={{
            width: "32px",
            height: "32px",
            float: "left",
            border: "3px solid orange",
            backgroundColor: "orange",
            borderRadius: "4px",
            textAlign: "center",
            fontSize: "20px",
            color: "white",
            marginLeft: "20px",
          }}
          onClick={(event) => {
            if (!isDefault) {
              event.currentTarget.style.border = "3px solid orange";
              event.currentTarget.style.backgroundColor = "orange";
            } else {
              event.currentTarget.style.border = "3px solid black";
              event.currentTarget.style.backgroundColor = "transparent";
            }
            setIsDefault((prev) => !prev);
          }}
        >
          ✔
        </div>
        <div style={{ lineHeight: "32px", marginLeft: "70px", color: "gray" }}>
          기본 주소로 설정하기
        </div>
        <input
          type="submit"
          value="완료"
          style={{
            display: "block",
            marginTop: "50px",
            width: "100%",
            padding: "15px",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#e78111",
            border: "0px",
            borderRadius: "16px",
            fontSize: "20px",
          }}
        />
      </form>
    </div>
  );
};

export default AddressDetailRouter;
