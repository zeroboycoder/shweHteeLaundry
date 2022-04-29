import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";

import HistoryBox from "../../components/History/historyBox";
import { onFetchOrderHistoryies } from "../../store/actions/service/order";

export default function History(props) {
  const dispatch = useDispatch();
  // Fetch item from store
  const orderHistories = useSelector((state) => state.order.orderHistories);
  for (const key in orderHistories) {
    console.log("Uid : ", orderHistories[key].uid);
  }

  useEffect(() => {
    dispatch(onFetchOrderHistoryies());
  }, [dispatch]);

  // Order History Box
  const historyBox = [];
  for (const key in orderHistories) {
    const oid = orderHistories[key].oid;
    const orderId = oid.substring(oid.length - 5, oid.length);
    // Change timestamp to date & time
    const timestamp = orderHistories[key].timestamp;
    const dateString = String(new Date(timestamp).toDateString()); // 'Thu Jan 20 2022'
    const timeString = String(new Date(timestamp).toLocaleTimeString()); // '4:29:17 AM'
    const time = dateString + " at " + timeString;

    historyBox.push(
      <HistoryBox
        key={key}
        orderId={orderId}
        status={orderHistories[key].status}
        time={time}
        totalQty={orderHistories[key].totalQty}
        totalPrice={orderHistories[key].totalPrice}
        pressed={() =>
          props.navigation.navigate("orderDetail", {
            orderId: orderId,
            status: orderHistories[key].status,
            serviceName: orderHistories[key].serviceName,
            time: time,
            items: orderHistories[key].items,
            totalQty: orderHistories[key].totalQty,
            totalPrice: orderHistories[key].totalPrice,
            fromHistory: true,
          })
        }
      />
    );
  }

  return (
    <View style={style.screen}>
      {orderHistories.length <= 0 ? (
        <View style={style.historyTextBox}>
          <Text style={style.historyText}>History မရှိသေးပါ။</Text>
        </View>
      ) : (
        historyBox
      )}
    </View>
  );
}

export const historyNavOptions = (navData) => {
  return {
    headerTitle: "History",
    headerRight: () => (
      <Feather
        name="menu"
        size={24}
        color="white"
        style={{ marginRight: 24 }}
        onPress={() => navData.navigation.toggleDrawer()}
      />
    ),
  };
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  historyTextBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  historyText: {
    color: "#072ac8",
    fontFamily: "pyidaungsu",
    fontSize: 15,
  },
});
