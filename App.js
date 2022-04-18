import React, { useState } from "react";
import { View, StatusBar } from "react-native";
import "react-native-gesture-handler";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import FlashMessage from "react-native-flash-message";

import RootNavigator from "./navigation/RootNavigator";
import authReducer from "./store/reducers/user/auth";
import itemReducer from "./store/reducers/service/item";
import orderReducer from "./store/reducers/service/order";

// Create a root reducer and store, and apply middleware(thunk)
const rootReduer = combineReducers({
  auth: authReducer,
  item: itemReducer,
  order: orderReducer,
});

const store = createStore(rootReduer, applyMiddleware(thunk));

// Fetch the font from local file
const fetchFont = () => {
  return Font.loadAsync({
    pyidaungsu: require("./assets/fonts/Pyidaungsu_Regular.ttf"),
    "pyidaungsu-bold": require("./assets/fonts/Pyidaungsu_Bold.ttf"),
  });
};

export default (props) => {
  // load font
  const [loadFont, setLoadFont] = useState(false);
  if (!loadFont) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setLoadFont(true)}
        onError={(err) => console.log("Err : ", err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <View
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight,
        }}
      >
        <RootNavigator />
        <FlashMessage position="top" />
      </View>
    </Provider>
  );
};
