import React from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

import Color from "../constant/Color";

export default function Input(props) {
  return (
    <View style={style.container}>
      <Text style={style.label}>{props.label}</Text>
      <TextInput
        {...props}
        value={props.value}
        onChangeText={(text) => props.changed(props.inputName, text)}
        style={style.input}
        keyboardType={props.keyboardType}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    marginBottom: 16,
  },
  label: {
    fontFamily: "pyidaungsu",
    fontSize: 16,
    color: "#000",
  },
  input: {
    height: 40,
    borderColor: Color.gray,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 20,
  },
});
