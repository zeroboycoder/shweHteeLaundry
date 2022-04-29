import React from "react";
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function CustomBtn(props) {
  let TouchableComponent = TouchableNativeFeedback;
  if (Platform.OS === "ios") {
    TouchableComponent = TouchableOpacity;
  }
  return (
    <View style={{ ...style.container, ...props.style }}>
      <TouchableComponent onPress={props.clicked} style={{ flex: 1 }}>
        <View style={{ ...style.btnContainer }}>{props.children}</View>
      </TouchableComponent>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
