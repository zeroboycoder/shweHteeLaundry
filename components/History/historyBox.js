import React from "react";
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
} from "react-native";

import Color from "../../constant/Color";

// Needed props
// id, date, number of clothes, price, status (pending or delivered)
export default function historyBox(props) {
  // choose the touchable component with the based OS
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  // check the status condition
  let status = (
    <View style={style.delivered}>
      <Text style={style.statusText}>Delivered</Text>
    </View>
  );
  if (props.status === "pending") {
    status = (
      <View style={style.pending}>
        <Text style={style.statusText}>Pending</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <TouchableComponent onPress={props.pressed}>
        <View style={style.box}>
          <View style={style.firstCol}>
            <Text style={style.orderId}>Order id : {props.orderId}</Text>
            <Text style={style.date}>{props.time}</Text>
            <View style={style.qtyContainer}>
              <Text>{props.totalQty} clothes</Text>
              <Text>{props.totalPrice} Ks</Text>
            </View>
          </View>
          <View style={style.secondCol}>{status}</View>
        </View>
      </TouchableComponent>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
  },
  box: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Color.gray,
    borderRadius: 18,
  },
  firstCol: {
    flex: 0.7,
    justifyContent: "space-around",
  },
  orderId: {
    fontFamily: "pyidaungsu",
    fontSize: 14,
  },
  date: {
    fontFamily: "pyidaungsu",
    fontSize: 12,
    color: "#837676",
    marginVertical: 5,
  },
  qtyContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondCol: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  delivered: {
    padding: 3,
    borderWidth: 1,
    borderColor: Color.darkBlue,
  },
  pending: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    minHeight: 80,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: Color.yellow,
    borderRadius: 70,
  },
  statusText: {
    fontFamily: "pyidaungsu",
    fontSize: 13,
  },
});
