import React, { useState, useEffect } from "react";
import {
  Platform,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";

import NewOrderBox from "../../components/History/OwnerNewOrderHistory";

export default function HistoryForOwner() {
  const allOrderHistories = useSelector((store) => store.order.orderHistories);
  const histories = [];

  console.log("All :", allOrderHistories);

  const [isconfirmedBtn, setIsconfirmedBtn] = useState(false);

  // Create a Buttons
  let TouchableCpn = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCpn = TouchableNativeFeedback;
  }

  const changeActiveBtn = (name) => {
    name === "newOrder" ? setIsconfirmedBtn(false) : setIsconfirmedBtn(true);
  };

  // Create a New Order History Boxes
  // const historyBoxes = histories.map((history) => {
  //   console.log(history);
  // });
  console.log("His : ", histories);

  const topButtons = (
    <View style={style.btnContainer}>
      <View
        style={
          isconfirmedBtn
            ? { ...style.btn, ...style.btnLeft }
            : { ...style.btn, ...style.btnLeft, ...style.activeBtn }
        }
      >
        <TouchableCpn onPress={() => changeActiveBtn("newOrder")}>
          <Text
            style={
              isconfirmedBtn
                ? { ...style.text }
                : { ...style.text, ...style.activeText }
            }
          >
            New Orders
          </Text>
        </TouchableCpn>
      </View>
      <View
        style={
          isconfirmedBtn
            ? { ...style.btn, ...style.btnRight, ...style.activeBtn }
            : { ...style.btn, ...style.btnRight }
        }
      >
        <TouchableCpn onPress={() => changeActiveBtn("confirmedOrder")}>
          <Text
            style={
              isconfirmedBtn
                ? { ...style.text, ...style.activeText }
                : { ...style.text }
            }
          >
            Confirmed Orders
          </Text>
        </TouchableCpn>
      </View>
    </View>
  );

  return (
    <View style={style.screen}>
      {/* Top Level Buttons */}
      {topButtons}
      {/* Body */}
      {/* <View style={style.body}>{historyBoxes}</View> */}
    </View>
  );
}

const style = StyleSheet.create({
  screen: {
    alignItems: "center",
    padding: 20,
  },
  btnContainer: {
    flexDirection: "row",
  },
  btn: {
    width: 140,
    borderWidth: 1,
    borderColor: "#000",
  },
  btnLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  btnRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  activeBtn: {
    borderColor: "#ffc600",
    backgroundColor: "#ffc600",
  },
  text: {
    textAlign: "center",
    paddingVertical: 8,
    fontFamily: "pyidaungsu",
    color: "#000",
    width: "100%",
  },
  activeText: {
    color: "#fff",
  },
  body: {
    width: "100%",
    marginTop: 16,
  },
});
