import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";

import HistoryBox from "../../components/History/historyBox";
import { onFetchOrderHistoryies } from "../../store/actions/service/order";

export default function History(props) {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  // Fetch item from store
  const orderHistories = useSelector((state) => state.order.orderHistories);

  // Fetch order Histories
  const fetchOrdersHandler = () => {
    dispatch(onFetchOrderHistoryies());
  };

  useEffect(fetchOrdersHandler, [dispatch]);

  // Render Order History Box
  const RenderHistoryBox = ({ order }) => {
    const oid = order.oid;
    if (!oid) {
      return null;
    }
    const orderId = oid.substring(oid.length - 5, oid.length);
    // Change timestamp to date & time
    const timestamp = order.timestamp;
    const dateString = String(new Date(timestamp).toDateString()); // 'Thu Jan 20 2022'
    const timeString = String(new Date(timestamp).toLocaleTimeString()); // '4:29:17 AM'
    const time = dateString + " at " + timeString;
    return (
      <HistoryBox
        key={oid}
        orderId={orderId}
        status={order.status}
        time={time}
        totalQty={order.totalQty}
        totalPrice={order.totalPrice}
        pressed={() =>
          props.navigation.navigate("orderDetail", {
            orderId: orderId,
            status: order.status,
            serviceName: order.serviceName,
            time: time,
            items: order.items,
            totalQty: order.totalQty,
            totalPrice: order.totalPrice,
            fromHistory: true,
          })
        }
      />
    );
  };

  return (
    <View style={style.screen}>
      {orderHistories.length <= 0 ? (
        <View style={style.historyTextBox}>
          <Text style={style.historyText}>History မရှိသေးပါ။</Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={(item, index) => index}
          data={orderHistories}
          renderItem={(items) => <RenderHistoryBox order={items.item} />}
          onRefresh={fetchOrdersHandler}
          refreshing={refresh}
        />
      )}
    </View>
  );
}

export const historyNavOptions = (navData) => {
  return {
    headerTitle: "Histories",
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
