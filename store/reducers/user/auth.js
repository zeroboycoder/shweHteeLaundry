import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH, TRIED_LOGIN, LOGOUT } from "../../actions/user/auth";

const initState = {
  uid: "",
  admin: "",
  uname: "",
  phno: "",
  address: "",
  userPushToken: "",
  triedLogin: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case TRIED_LOGIN: {
      return {
        ...state,
        triedLogin: true,
      };
    }
    case AUTH:
      AsyncStorage.setItem(
        "userDatas",
        JSON.stringify({
          ...action.userDatas,
        })
      );
      return {
        ...state,
        uid: action.userDatas.uid,
        admin: action.userDatas.admin,
        uname: action.userDatas.uname,
        phno: action.userDatas.phno,
        address: action.userDatas.address,
        userPushToken: action.userDatas.token,
      };
    case LOGOUT: {
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("userDatas");
      return initState;
    }
    default:
      return state;
  }
};
