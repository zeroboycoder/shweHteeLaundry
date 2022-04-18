import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";

import OnboradingItem from "./OnboradingItem";
import slides from "./data";

export default function Onboarding() {
  return (
    <View style={style.container}>
      <FlatList
        data={slides}
        renderItem={(items) => <OnboradingItem item={items.item} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
