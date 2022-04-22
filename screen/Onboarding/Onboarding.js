import React, { useState, useRef } from "react";
import { Animated, FlatList, View, StyleSheet } from "react-native";

import OnboradingItem from "../../components/Onboarding/OnboradingItem";
import Pagination from "../../components/Onboarding/Pagination";
import slides from "./data";

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const slideRef = useRef(null);

  const viewItemChange = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  return (
    <View style={style.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={slides}
          renderItem={(items) => <OnboradingItem item={items.item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewItemChange}
          ref={slideRef}
        />
      </View>
      <Pagination data={slides} scrollX={scrollX} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
