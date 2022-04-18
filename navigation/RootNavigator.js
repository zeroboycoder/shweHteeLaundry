import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  AuthNavigator,
  OnboardingNavigator,
  DrawerNavigator,
} from "./AppNavigator";
import StartScreen from "../screen/StartScreen";

export default (props) => {
  const id = useSelector((state) => !!state.auth.uid);
  const triedLogin = useSelector((state) => state.auth.triedLogin);
  const onboarding = AsyncStorage.getItem("onboarding");

  return (
    <NavigationContainer>
      {/* App Navigator */}
      {id && onboarding === true && <DrawerNavigator />}
      {id && onboarding !== true && <OnboardingNavigator />}
      {!id && triedLogin && <AuthNavigator />}
      {!id && !triedLogin && <StartScreen />}
    </NavigationContainer>
  );
};
