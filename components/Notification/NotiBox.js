import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

const dummyDatas = {
  onTheWay: require("../../assets/image/noti/ontheway.png"),
  prepared: require("../../assets/image/noti/prepared.png"),
};

export default function NotiBox() {
  return (
    <View style={style.container}>
      <View style={style.firstCol}>
        <Text style={style.date}>21 December 2021 at 5:00 PM</Text>
        <View style={style.imgContainer}>
          <Image
            source={dummyDatas.prepared}
            alt="On the way"
            style={style.img}
          />
        </View>
      </View>
      <View style={style.secondCol}>
        <Text style={style.text}>Order Id : 1234</Text>
        <Text style={style.text}>Your order is received & being prepared.</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 13,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 7,
  },
  firstCol: {
    flex: 0.5,
  },
  date: {
    fontFamily: "pyidaungsu",
    fontSize: 12,
    color: "#837676",
  },
  imgContainer: {
    width: 97,
    height: 48,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  secondCol: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontFamily: "pyidaungsu",
    fontSize: 13,
  },
});
