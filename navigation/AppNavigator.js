import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthStart from "../screen/Auth/AuthStart";
import ChooseAuth from "../screen/Auth/ChooseAuth";
import GetUserInfo from "../screen/Auth/GetUserInfo";

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="AuthStart" component={AuthStart} /> */}
      {/* <Stack.Screen name="ChooseAuth" component={ChooseAuth} /> */}
      <Stack.Screen name="GetUserInfo" component={GetUserInfo} />
    </Stack.Navigator>
  );
};
