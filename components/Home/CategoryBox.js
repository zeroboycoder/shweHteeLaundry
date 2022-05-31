import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

import Color from "../../constant/Color";

export default function CategoryBox({ name, imgUrl, clicked }) {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" || Platform.Version >= 21)
    TouchableComponent = TouchableNativeFeedback;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={style.container}
      onPress={clicked}
    >
      <View style={style.box}>
        <View style={style.imgContainer}>
          <Image source={imgUrl} alt="Category Logo" style={style.img} />
        </View>
        <Text style={style.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    width: 125,
    height: 125,
    margin: 15,
    borderWidth: 1,
    borderColor: Color.darkBlue,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    width: 75,
    height: 75,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: "pyidaungsu",
    fontSize: 12,
    marginTop: 3,
    textAlign: "center",
  },
});
