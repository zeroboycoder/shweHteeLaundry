import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import React from "react";

export default function PaymentOptionsBtn(props) {
  let TouchableCpn = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCpn = TouchableNativeFeedback;
  }

  return (
    <View style={style.box}>
      <TouchableCpn onPress={() => props.pressed(props.name)}>
        <View style={{ ...style.container, ...style.active }}>
          {props.active ? (
            <View style={{ ...style.circle, ...style.activeCircle }}></View>
          ) : (
            <View style={style.circle}></View>
          )}
          {props.active ? (
            <Text style={{ ...style.text, ...style.textActive }}>
              {props.name}
            </Text>
          ) : (
            <Text style={style.text}>{props.name}</Text>
          )}
          <View style={style.imgContainer}>
            <Image source={props.imgUrl} alt="Logo" style={style.img} />
          </View>
        </View>
      </TouchableCpn>
      <View style={style.breakLine}></View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#aaa",
  },
  activeCircle: {
    borderColor: "#072ac8",
  },
  imgContainer: {
    width: 40,
    height: 40,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
  text: {
    fontFamily: "pyidaungsu",
    fontSize: 16,
    color: "#aaa",
  },
  textActive: {
    color: "#072ac8",
  },
  breakLine: {
    width: "100%",
    marginVertical: 5,
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
  },
});
