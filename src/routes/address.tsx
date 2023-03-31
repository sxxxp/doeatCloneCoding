import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faX,
  faSearch,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { dbService } from "../FirebaseInst";
import Swal from "sweetalert2";
interface MainProps {
  userObj:
    | { displayName: string | null; uid: string; photoURL: string | null }
    | undefined;
}
interface myadd {
  selected: boolean;
  address: string;
  name: string;
}
const AddressRouter = ({ userObj }: MainProps) => {
  const [address, setAddress] = useState("");
  const [addressList, setAddressList] = useState<Array<string>>([]);
  const [currentAddress, setCurrentAddress] = useState<{
    address: string;
    name: string;
  }>();
  const [isSearch, setIsSearch] = useState(false);
  const [myAddress, setMyAddress] = useState<Array<myadd>>([]);
  const navigate = useNavigate();
  const onArrowClick = () => {
    navigate(-1);
  };
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setAddressList([address + "1", address + "2", address + "3"]);
    setIsSearch(true);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAddress(event.currentTarget.value.slice(12));
  };
  const onAddressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event.currentTarget.id);
    navigate("/address/detail", {
      state: {
        id: event.currentTarget.id,
        userObj: userObj,
      },
    });
  };
  const onMyAddressClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event.currentTarget.id);
    const name = event.currentTarget.id;
    if (userObj) {
      const docRef = doc(dbService, "address", userObj.uid);
      const addRef = doc(docRef, "addresses", name);
      const docs = await getDoc(addRef);
      await setDoc(docRef, docs.data());
      Swal.fire({
        title: "주소가 변경되었습니다.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    }
  };
  useEffect(() => {
    if (userObj) {
      const docRef = doc(dbService, "address", userObj.uid);
      const subColRef = collection(docRef, "addresses");

      onSnapshot(subColRef, (snapshot) => {
        let myAddressList: Array<myadd> = [];
        onSnapshot(docRef, (snapshot) => {
          if (snapshot.data()) {
            const add = {
              name: snapshot.data()!.name,
              address: snapshot.data()!.address,
            };
            console.log(snapshot.data());
            setCurrentAddress(add);
          }
        });
        snapshot.docs.map(
          (doc) => (
            myAddressList.push({
              selected: doc.data() === currentAddress,
              address: doc.data().address,
              name: doc.data().name,
            }),
            console.log(currentAddress)
          )
        );
        setMyAddress(myAddressList);
      });
    }
  }, [userObj]);
  return (
    <div>
      <FontAwesomeIcon
        style={{ float: "left", margin: "1% 0 0 1%" }}
        onClick={onArrowClick}
        icon={faArrowLeft}
        size="2x"
      />
      <div style={{ textAlign: "center" }}>
        <h1>주소 검색</h1>
        <form onSubmit={onSubmit}>
          <div>
            <FontAwesomeIcon
              icon={faSearch}
              style={{ position: "absolute", left: "90px", top: "155px" }}
            />
            <input
              type="text"
              required
              style={{
                marginTop: "50px",
                width: "90%",
                padding: "20px 10px",
                border: "0px",
                backgroundColor: "#e9ecef",
                fontWeight: "bold",
                outline: "none",
              }}
              onChange={onChange}
              value={"            " + address}
            />
            {address && (
              <FontAwesomeIcon
                icon={faX}
                onClick={() => setAddress("")}
                style={{ position: "absolute", right: "90px", top: "155px" }}
              />
            )}
          </div>
        </form>
        <div
          style={{ marginTop: "30px", marginLeft: "60px", textAlign: "left" }}
        >
          {!isSearch &&
            myAddress.map(({ selected, address, name }): JSX.Element => {
              console.log(selected, address, name);
              return (
                <div
                  onClick={onMyAddressClick}
                  style={{ marginLeft: "15px" }}
                  key={name}
                  id={name}
                >
                  {selected && <FontAwesomeIcon icon={faCheck} size="2x" />}{" "}
                  <h2>{name}</h2>
                  <span
                    style={{
                      backgroundColor: "#e9ecef",
                      color: "gray",
                      fontWeight: "bold",
                    }}
                  >
                    도로명
                    <span style={{ backgroundColor: "white" }}>
                      {" "}
                      {address} 도로명 주소
                    </span>
                  </span>
                </div>
              );
            })}
          {addressList.map((name) => {
            return (
              <div
                onClick={onAddressClick}
                style={{ marginLeft: "15px" }}
                id={name}
              >
                <h2>{name}</h2>
                <span
                  style={{
                    backgroundColor: "#e9ecef",
                    color: "gray",
                    fontWeight: "bold",
                  }}
                >
                  도로명
                  <span style={{ backgroundColor: "white" }}>
                    {" "}
                    {name} 도로명 주소
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddressRouter;
