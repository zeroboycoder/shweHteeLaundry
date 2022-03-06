import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";

import OrderDetail from "../../components/Home/OrderDetail";

export default function Checkout(props) {
  const { serviceName, items, totalQty, totalPrice, fromHistory } =
    props.route.params;
  return (
    <View style={style.screen}>
      <View style={style.container}>
        <OrderDetail
          items={items}
          serviceName={serviceName}
          totalQty={totalQty}
          totalPrice={totalPrice}
          fromHistory={fromHistory}
          pressed={() =>
            props.navigation.navigate("payment", {
              serviceName,
              items: items,
              totalPrice,
            })
          }
        />
      </View>
    </View>
  );
}

export const checkoutNavOptions = () => ({ headerTitle: "Checkout" });

const style = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: Dimensions.get("window").height * 0.78,
  },
});
