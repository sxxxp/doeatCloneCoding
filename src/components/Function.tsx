import { NavigateFunction } from "react-router-dom";
import Swal from "sweetalert2";
const IsLogin = (userObj: Object | undefined, navigate: NavigateFunction) => {
  if (typeof userObj === "undefined") {
    Swal.fire({
      title: "로그인이 필요한 서비스입니다.",
      confirmButtonText: "로그인하기",
      confirmButtonColor: "#F54920",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
      return false;
    });
  } else {
    return true;
  }
};
export { IsLogin };
