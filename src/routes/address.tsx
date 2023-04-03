import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faSearch,
  faCheck,
  faTrashCan,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { dbService } from "../FirebaseInst";
import Swal from "sweetalert2";
import PrevPage from "../components/PrevPage";
import "../App.scss";
interface MainProps {
  userObj:
    | { displayName: string | null; uid: string; photoURL: string | null }
    | undefined;
}
interface myadd {
  selected: boolean;
  address: string;
  name: string;
  detail: string;
}
const AddressRouter = ({ userObj }: MainProps) => {
  const [address, setAddress] = useState("");
  const [addressList, setAddressList] = useState<Array<string>>([]);

  const [isSearch, setIsSearch] = useState(false);
  const [myAddress, setMyAddress] = useState<Array<myadd>>([]);
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (address === "") {
      setIsSearch(false);
    } else {
      setAddressList([address + " 1", address + " 2", address + " 3"]);
      setIsSearch(true);
    }
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
      onSnapshot(docRef, (snapshot) => {
        const cadd = snapshot.data();
        onSnapshot(subColRef, (snapshot) => {
          let myAddressList: Array<myadd> = [];
          snapshot.docs.map((doc) =>
            myAddressList.push({
              selected:
                doc.data().address === cadd!.address &&
                doc.data().name === cadd!.name,
              address: doc.data().address,
              name: doc.data().name,
              detail: doc.data().detail,
            })
          );
          setMyAddress(myAddressList);
        });
      });
    }
  }, [userObj]);
  return (
    <div>
      <PrevPage color="black"></PrevPage>
      <div style={{ textAlign: "center" }}>
        <h1>주소 검색</h1>
        <form onSubmit={onSubmit}>
          <div>
            <FontAwesomeIcon icon={faSearch} className="address-icon-left" />
            <input
              type="text"
              required
              className="address-search"
              onChange={onChange}
              value={"            " + address}
            />
            {address && (
              <FontAwesomeIcon
                icon={faX}
                onClick={() => setAddress("")}
                className="address-icon-right"
              />
            )}
          </div>
        </form>
        <div className="address-wrapper">
          {!isSearch &&
            myAddress.map(
              ({ selected, address, name, detail }): JSX.Element => {
                return (
                  <div style={{ display: "flex" }}>
                    <div
                      onClick={(e) => {
                        if (!selected) onMyAddressClick(e);
                      }}
                      className="address-info-wrapper"
                      key={name}
                      id={name}
                    >
                      <h2 style={{ marginBottom: "10px" }}>
                        {name} {selected && <FontAwesomeIcon icon={faCheck} />}
                      </h2>
                      <span style={{ color: "black" }}>{address}</span>
                      <p
                        style={{
                          marginTop: 0,
                          color: "gray",
                          fontSize: "13px",
                        }}
                      >
                        {detail}
                      </p>
                    </div>
                    <div>
                      <div>
                        <FontAwesomeIcon
                          icon={faPen}
                          size="2x"
                          style={{
                            marginTop: "50px",
                            position: "absolute",
                            right: "180px",
                          }}
                          onClick={(e) => {
                            navigate("/address/detail", {
                              state: {
                                id: address,
                                userObj: userObj,
                                detail: detail,
                                name: name,
                                isDefault: selected,
                                isFirst: false,
                              },
                            });
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          size="2x"
                          style={{
                            marginTop: "50px",
                            position: "absolute",
                            right: "90px",
                          }}
                          onClick={async (e) => {
                            if (selected) {
                              Swal.fire({
                                title: "기본주소는 삭제할 수 없습니다.",
                                icon: "error",
                                timer: 2000,
                                showConfirmButton: false,
                              });
                            } else {
                              await deleteDoc(
                                doc(
                                  dbService,
                                  "address",
                                  userObj!.uid,
                                  "addresses",
                                  name
                                )
                              );
                              Swal.fire({
                                title: "삭제되었습니다!",
                                icon: "success",
                                timer: 2000,
                                showConfirmButton: false,
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          {isSearch &&
            addressList.map((name) => {
              return (
                <div
                  onClick={onAddressClick}
                  className="address-info-wrapper"
                  id={name}
                >
                  <h2>{name}</h2>
                  <span className="gray-background">
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
