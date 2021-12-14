import React, { useState } from "react";
import { View, StatusBar } from "react-native";
import "react-native-gesture-handler";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import RootNavigator from "./navigation/RootNavigator";

const fetchFont = () => {
  return Font.loadAsync({
    pyidaungsu: require("./assets/fonts/Pyidaungsu_Regular.ttf"),
    "pyidaungsu-bold": require("./assets/fonts/Pyidaungsu_Bold.ttf"),
  });
};

export default (props) => {
  const [loadFont, setLoadFont] = useState(false);
  if (!loadFont) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setLoadFont(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <RootNavigator />
    </View>
  );
};
