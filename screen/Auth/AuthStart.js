import React from "react";
import {
  Image,
  Platform,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import Color from "../../constant/Color";

export default function AuthStart(props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <View style={style.container}>
        <View style={style.imgContainer}>
          <Image
            source={require("../../assets/image/logo.jpg")}
            alt="Logo"
            style={style.img}
          />
        </View>
        <Text style={style.title}>Shwe Htee</Text>
        <Text style={style.desc}>
          We wash your clothes with clean & tidy. Build Our relations with
          trust.{" "}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={style.btnContainer}
          onPress={() => props.navigation.navigate("ChooseAuth")}
        >
          <View style={style.btn}>
            <Text style={style.btnText}>အကောင့်ဝင်ပါ</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  imgContainer: {
    width: 120,
    height: 120,
    borderColor: "#333",
    borderWidth: 1,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontFamily: "pyidaungsu-bold",
    fontSize: 24,
  },
  desc: {
    fontFamily: "pyidaungsu",
    fontSize: 14,
    width: "75%",
    textAlign: "center",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: Color.blue,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  btnText: {
    color: "#fff",
    fontFamily: "pyidaungsu",
  },
});
