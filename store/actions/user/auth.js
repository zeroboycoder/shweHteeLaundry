import axios from "axios";

export const TRIED_LOGIN = "TRIED_LOGIN";
export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";
export const ONBOARDING = "ONBOARDING";

export const onAuth = (userDatas) => async (dispatch) => {
  const uid = userDatas.uid;
  // let isAdmin = uid === "1120167971852948" ? true : false;
  // let isAdmin = uid === "115371379298586176000" ? true : false;
  // userDatas["admin"] = isAdmin;
  try {
    const res = await axios.put(
      `https://shwe-htee-laundry-default-rtdb.asia-southeast1.firebasedatabase.app/users/${uid}.json`,
      userDatas
    );
    if (res.status !== 200) {
      throw new Error("Error in adding user");
    }
    dispatch({
      type: AUTH,
      userDatas: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const onTriedLogin = () => ({ type: TRIED_LOGIN });

export const onLogout = () => (dispatch) => {
  console.log("Reach logout");
  dispatch({ type: LOGOUT });
};

export const onboarding = () => (dispatch) => {
  dispatch({ type: ONBOARDING, value: true });
};
