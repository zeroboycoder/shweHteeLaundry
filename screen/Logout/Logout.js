import React, { useEffect } from "react";
import { Alert, Text, View } from "react-native";
import { useDispatch } from "react-redux";

import { onLogout } from "../../store/actions/user/auth";

export default function Logout() {
  const dispatch = useDispatch();

  const logoutFun = () => {
    dispatch(onLogout());
  };

  useEffect(() => {
    Alert.alert("Logout?", "App ကနေ ထွက်မှာသေချာလား?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: logoutFun,
      },
    ]);
  }, [dispatch]);

  return <></>;
}
