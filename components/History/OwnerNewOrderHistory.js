import React from "react";
import {
  Alert,
  View,
  Platform,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

export default function OwnerNewOrderHistory(props) {
  const dispatch = useDispatch();
  // Get Datas from props
  const datas = props[0];
  const oid = datas.oid;
  const orderId = oid.substring(oid.length - 5, oid.length);
  const status = datas.status;
  // Change timestamp to date & time
  const timestamp = datas.timestamp;
  const dateString = String(new Date(timestamp).toDateString()); // 'Thu Jan 20 2022'
  const timeString = String(new Date(timestamp).toLocaleTimeString()); // '4:29:17 AM'
  const time = dateString + " at " + timeString;

  let TouchableCpn = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCpn = TouchableNativeFeedback;
  }

  const deleteOrderHandler = () => {
    Alert.alert(
      "Are you sure?",
      "Are you sure to delete Pyae Sone Khant's order?",
      [
        { text: "Cancle", style: "cancel" },
        {
          text: "Confirm",
          style: "default",
          onPress: () => props.deleted(oid, status),
        },
      ]
    );
  };

  return (
    <View style={{ width: "100%" }}>
      <TouchableCpn onPress={props.pressed}>
        <View
          style={
            status == "finished"
              ? { ...style.container }
              : { ...style.container, ...style.unfinishContainer }
          }
        >
          <View style={style.row}>
            <Text style={style.name}>{datas.uname}</Text>
            <View style={style.row}>
              <Text style={style.date}>{time}</Text>
              <MaterialIcons
                name="delete"
                size={22}
                color="black"
                style={style.delBtn}
                onPress={deleteOrderHandler}
              />
            </View>
          </View>
          <View style={style.colAsRow}>
            <Text style={style.infoText}>Order Id : {orderId}</Text>
            <Text style={style.infoText}>Phone No : {datas.phno}</Text>
            <Text style={style.infoText}>Address : {datas.address}</Text>
            <Text style={style.infoText}>Payment : {datas.paymentType}</Text>
          </View>
          <View style={style.row}>
            <Text style={style.serviceText}>{datas.serviceName}</Text>
            <Text style={style.serviceText}>{datas.totalQty} clothes</Text>
            <Text style={style.serviceText}>{datas.totalPrice} Ks</Text>
          </View>
          {datas.paymentConfirmed === true && status === "confirmed" && (
            <View style={style.row}>
              <View style={style.statusContainer}>
                <Text style={style.status}>Payment Confirmed</Text>
              </View>
            </View>
          )}
          {datas.paymentConfirmed === true && status == "finished" && (
            <View style={style.row}>
              <View style={style.statusContainer}>
                <Text style={style.status}>Payment Confirmed</Text>
              </View>
              <View style={style.statusContainer}>
                <Text style={style.status}>Order Confirmed</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableCpn>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#eaeaea",
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
  },
  unfinishContainer: {
    backgroundColor: "#ccc",
    borderColor: "#777",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
  },
  colAsRow: {
    marginVertical: 2,
  },
  name: {
    fontFamily: "pyidaungsu-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "pyidaungsu",
    fontSize: 12,
    marginRight: 10,
    color: "#837676",
  },
  delBtn: {
    color: "red",
  },
  infoText: {
    fontFamily: "pyidaungsu",
    fontSize: 13,
    color: "#4E4545",
  },
  serviceText: {
    fontFamily: "pyidaungsu",
    fontSize: 15,
    color: "#000",
  },
  statusContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    height: 26,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#072AcB",
  },
  status: {
    fontFamily: "pyidaungsu",
    fontSize: 13,
    color: "#000",
  },
});
