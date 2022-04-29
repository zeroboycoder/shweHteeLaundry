import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SeriveBox({ name, imgUrl, clicked }) {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} onPress={clicked}>
        <View style={style.box}>
          <View style={style.imgContainer}>
            <Image source={imgUrl} alt="Service Logo" style={style.img} />
          </View>
          <Text style={style.text}>{name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  box: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 100,
    height: 100,
    margin: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  imgContainer: {
    width: 60,
    height: 60,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 13,
    textAlign: "center",
  },
});
