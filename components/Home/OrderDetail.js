import React from "react";
import { Alert, TouchableOpacity, View, Text, StyleSheet } from "react-native";

import Color from "../../constant/Color";

// Receiving props
// orderId => string
// time => string(time)
// serviceName => string
// status => string
// items => array
// totalQty => number
// totalPrice => number
// fromNoti => bool
export default function CheckoutBox(props) {
  // Payment Confirm Handler
  const confirmedHandler = () => {
    Alert.alert("Are you sure?", "Are you sure payment confirm?", [
      { text: "Cancel", style: "destructive" },
      {
        text: "Confirm",
        style: "default",
        onPress: props.confirmedHandler,
      },
    ]);
  };

  // Order Finish Handler
  const finishedHandler = () => {
    Alert.alert("Are you sure?", "Are you sure this order is finished?", [
      { text: "Cancel", style: "destructive" },
      {
        text: "Finish",
        style: "default",
        onPress: props.finishedHandler,
      },
    ]);
  };

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
  let status;
  if (props.status === "pending") {
    status = (
      <View style={style.pending}>
        <Text style={style.statusText}>Pending</Text>
      </View>
    );
  }
  if (props.status === "confirmed") {
    status = (
      <View style={style.confirmed}>
        <Text style={style.statusText}>Confirmed</Text>
      </View>
    );
  }
  if (props.status === "finished") {
    status = (
      <View style={style.finished}>
        <Text style={style.statusText}>Finished</Text>
      </View>
    );
  }

  return (
    <View style={style.screen}>
      <View style={style.container}>
        {/* Top Row */}
        <View style={style.topRow}>
          <View style={style.firstCol}>
            <Text style={style.orderDetail}>Order Detail</Text>
            {props.orderId && (
              <Text style={style.oid}>Order Id : {props.orderId}</Text>
            )}
            {props.time && <Text style={style.date}>{props.time}</Text>}
            {props.paymentType && (
              <Text style={style.date}>Payment : {props.paymentType}</Text>
            )}
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
            <Text style={{ ...style.qtyText, ...style.subTitle }}>
              Quentity
            </Text>
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
        {props.pressed && !props.fromNoti && (
          <View style={style.btnContainer}>
            <TouchableOpacity style={style.btn} onPress={props.pressed}>
              <Text style={style.btnText}>Payment</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* Payment Confirmed && To Press Finish Order */}
      {props.status === "pending" && (
        <View style={{ ...style.finishedBtn }}>
          <TouchableOpacity style={style.btn} onPress={confirmedHandler}>
            <Text style={style.btnText}>Payment Confirm</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Payment Confirmed && To Press Finish Order */}
      {props.status === "confirmed" && (
        <View style={{ ...style.finishedBtn }}>
          <TouchableOpacity style={style.btn} onPress={finishedHandler}>
            <Text style={style.btnText}>Finish Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
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
  confirmed: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Color.orange,
  },
  finished: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#357C3C",
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
    height: 46,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Color.darkBlue,
    borderRadius: 5,
  },
  finishedBtn: {
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
    height: 46,
    marginTop: 16,
    marginHorizontal: "10%",
    borderWidth: 1,
    borderColor: Color.darkBlue,
    borderRadius: 5,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  btnText: {
    fontFamily: "pyidaungsu-bold",
  },
});
