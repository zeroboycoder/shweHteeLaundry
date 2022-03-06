import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PaymentDescBox(props) {
  return (
    <View style={style.container}>
      <Text style={{ ...style.text, ...style.title }}>
        ရွှေထီးလျှော်ဖွတ်သန့်စင်ရေး ဝန်ဆောင်မှု
      </Text>
      <Text style={style.text}>ကျသင့်ငွေ : {props.totalPrice} Ks</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    width: "80%",
    height: 120,
    margin: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
  },
  text: {
    fontFamily: "pyidaungsu-bold",
  },
  title: {
    color: "#1453f4",
  },
});
