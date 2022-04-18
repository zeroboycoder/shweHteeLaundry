import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";

import { onLogout } from "../../store/actions/user/auth";

export default function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onLogout());
  }, [dispatch]);

  return <View></View>;
}
