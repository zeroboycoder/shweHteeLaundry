import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthNavigator } from "./AppNavigator";

export default (props) => (
  <NavigationContainer>
    <AuthNavigator />
  </NavigationContainer>
);
