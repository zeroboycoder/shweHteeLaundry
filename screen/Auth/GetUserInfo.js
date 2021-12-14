import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

export default function GetUserInfo() {
  return (
    <View>
      <View>
        <Text>Shwe Htee</Text>
        <Text>Laundry Service</Text>
      </View>
      <View>
        {/* 3 user input */}
        <TextInput />
        <TextInput />
        <TextInput />
      </View>
    </View>
  );
}
