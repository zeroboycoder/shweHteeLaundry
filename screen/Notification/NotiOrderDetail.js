import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";

import OrderDetail from "../../components/Home/OrderDetail";

const NotiOrderDetail = (props) => {
  const {
    orderId,
    serviceName,
    paymentType,
    items,
    timestamp,
    totalQty,
    totalPrice,
    fromNoti,
  } = props.route.params;
  const oid = orderId.substring(orderId.length - 5, orderId.length);
  // Change timestamp to date & time
  const dateString = String(new Date(timestamp).toDateString()); // 'Thu Jan 20 2022'
  const timeString = String(new Date(timestamp).toLocaleTimeString()); // '4:29:17 AM'
  const time = dateString + " at " + timeString;
  return (
    <View style={style.screen}>
      <View style={style.container}>
        <OrderDetail
          orderId={oid}
          items={items}
          serviceName={serviceName}
          paymentType={paymentType}
          time={time}
          totalQty={totalQty}
          totalPrice={totalPrice}
          fromNoti={fromNoti}
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
};

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

export default NotiOrderDetail;
