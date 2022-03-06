import React from "react";
import { View, Text, StyleSheet } from "react-native";

import NotiBox from "../../components/Notification/NotiBox";

export default function Noti() {
  return (
    <View style={style.screen}>
      <NotiBox />
    </View>
  );
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
});
