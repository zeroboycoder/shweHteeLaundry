import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileInfoBox(props) {
  return (
    <View style={style.box}>
      <View style={style.label}>
        <Text style={style.labelText}>{props.label}</Text>
      </View>
      <View style={style.value}>
        <Text style={style.valueText}>{props.value}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 46,
    paddingHorizontal: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "#072AC8",
    borderRadius: 25,
  },
  label: {
    width: "40%",
  },
  value: {
    width: "60%",
  },
  labelText: {
    fontFamily: "pyidaungsu-bold",
    fontSize: 16,
  },
  valueText: {
    fontFamily: "pyidaungsu",
    fontSize: 14,
  },
});
