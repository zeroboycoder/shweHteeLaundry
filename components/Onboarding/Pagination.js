import React from "react";
import { Animated, StyleSheet, useWindowDimensions, View } from "react-native";

const Pagination = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 30, 10],
          extrapolate: "clamp",
        });
        return (
          <Animated.View key={i} style={[styles.dot, { width: dotWidth }]} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#0016DA",
    marginHorizontal: 8,
    width: 10,
  },
});

export default Pagination;
