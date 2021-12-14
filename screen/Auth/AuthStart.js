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

import CustomBtn from "../../components/CustomBtn";
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
        <CustomBtn
          style={style.btn}
          clicked={() => props.navigation.navigate("ChooseAuth")}
        >
          <Text style={style.btnText}>အကောင့်ဝင်ပါ</Text>
        </CustomBtn>
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
  btn: {
    backgroundColor: Color.blue,
    width: "70%",
  },
  btnText: {
    color: "#fff",
    fontFamily: "pyidaungsu",
  },
});
