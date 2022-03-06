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

export default function OwnerNewOrderHistory() {
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
          onPress: () => console.log("Conrim an order"),
        },
      ]
    );
  };

  return (
    <View style={{ width: "100%" }}>
      <TouchableCpn>
        <View style={style.container}>
          <View style={style.row}>
            <Text style={style.name}>Pyae Sone Khant</Text>
            <View style={style.row}>
              <Text style={style.date}>21 December 2021 at 5:00 PM</Text>
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
            <Text style={style.infoText}>Order Id : 1234</Text>
            <Text style={style.infoText}>Phone No : 09764704270</Text>
            <Text style={style.infoText}>Address : Shwe Nat Taug</Text>
          </View>
          <View style={style.row}>
            <Text style={style.serviceText}>Wash & Iron</Text>
            <Text style={style.serviceText}>20 clothes</Text>
            <Text style={style.serviceText}>1100Ks</Text>
          </View>
          <View style={style.row}>
            <View style={style.statusContainer}>
              <Text style={style.status}>Payment Confirm</Text>
            </View>
          </View>
        </View>
      </TouchableCpn>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#dcdcdc",
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
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
