import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import Color from "../../constant/Color";

// Receiving props
// orderId => string
// time => string(time)
// serviceName => string
// status => string
// items => array
// totalQty => number
// totalPrice => number
// fromHistory => bool
export default function CheckoutBox(props) {
  const items = props.items.map((item) => (
    <View key={item.id} style={style.row}>
      <View>
        <Text style={style.text}>{item.name}</Text>
      </View>
      <View>
        <Text style={style.qtyText}>{item.qty}</Text>
      </View>
      <View>
        <Text style={style.text}>{item.totalPrcOfItem} Ks</Text>
      </View>
    </View>
  ));

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
      {/* Top Row */}
      <View style={style.topRow}>
        <View style={style.firstCol}>
          <Text style={style.orderDetail}>Order Detail</Text>
          {props.orderId && (
            <Text style={style.oid}>Order Id : {props.orderId}</Text>
          )}
          {props.time && <Text style={style.date}>{props.time}</Text>}
        </View>
        <View style={style.secondCol}>{props.status && status}</View>
      </View>

      {/* Service Name */}
      <View>
        <Text style={style.serName}>{props.serviceName}</Text>
      </View>

      {/* Item Detail */}
      <View style={style.row}>
        <View>
          <Text style={style.subTitle}>Items</Text>
        </View>
        <View>
          <Text style={{ ...style.qtyText, ...style.subTitle }}>Quentity</Text>
        </View>
        <View>
          <Text style={style.subTitle}>Price</Text>
        </View>
      </View>
      {items}
      <View style={style.brakeLine}></View>

      {/* Total */}
      <View style={style.row}>
        <View>
          <Text style={style.text}>Total</Text>
        </View>
        <View>
          <Text style={style.qtyText}>{props.totalQty}</Text>
        </View>
        <View>
          <Text style={style.text}>{props.totalPrice} Ks</Text>
        </View>
      </View>

      {/* Payment Button */}
      {props.pressed && (
        <View style={style.btnContainer}>
          <TouchableOpacity style={style.btn} onPress={props.pressed}>
            <Text>Payment</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "80%",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Color.darkBlue,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 7,
    elevation: 10,
    margin: 10,
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  firstCol: {
    flex: 0.7,
  },
  orderDetail: {
    fontFamily: "pyidaungsu-bold",
    fontSize: 14,
  },
  oid: {
    fontFamily: "pyidaungsu",
    fontSize: 14,
  },
  date: {
    fontFamily: "pyidaungsu",
    fontSize: 14,
  },
  secondCol: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  delivered: {
    justifyContent: "center",
    alignItems: "center",
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  statusText: {
    fontFamily: "pyidaungsu",
    fontSize: 13,
  },
  serName: {
    fontFamily: "pyidaungsu-bold",
    fontSize: 17,
  },
  subTitle: {
    width: 80,
    fontFamily: "pyidaungsu-bold",
    fontSize: 15,
  },
  text: {
    width: 80,
  },
  qtyText: {
    width: 80,
    textAlign: "center",
  },
  brakeLine: {
    marginVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: 46,
    marginTop: 16,
    marginLeft: "15%",
    borderWidth: 1,
    borderColor: Color.darkBlue,
    borderRadius: 5,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
