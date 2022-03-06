import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { AuthNavigator, TabNavigator, DrawerNavigator } from "./AppNavigator";
import StartScreen from "../screen/StartScreen";

export default (props) => {
  const id = useSelector((state) => !!state.auth.uid);
  const triedLogin = useSelector((state) => state.auth.triedLogin);

  return (
    <NavigationContainer>
      {/* <TabNavigator /> */}
      {id && <DrawerNavigator />}
      {!id && triedLogin && <AuthNavigator />}
      {!id && !triedLogin && <StartScreen />}
    </NavigationContainer>
  );
};
