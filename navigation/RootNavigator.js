import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import {
  AuthNavigator,
  OnboardingNavigator,
  DrawerNavigator,
} from "./AppNavigator";
import StartScreen from "../screen/StartScreen";
import { onboarding as onboardingAction } from "../store/actions/user/auth";

export default (props) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => !!state.auth.uid);
  const triedLogin = useSelector((state) => state.auth.triedLogin);
  const onboarding = useSelector((state) => state.auth.onboarding);

  useEffect(async () => {
    const onboardingJsonStr = await AsyncStorage.getItem("onboarding"); // null or value
    console.log(onboardingJsonStr);
    if (onboardingJsonStr !== null) {
      console.log("Onboarding is not null");
      dispatch(onboardingAction());
    }
  }, []);

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
