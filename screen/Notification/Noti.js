import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import NotiBox from "../../components/Notification/NotiBox";
import { fetchNotis, updateNoti } from "../../store/actions/service/noti";
import { onFetchOrderHistoryies } from "../../store/actions/service/order";

export default function Noti(props) {
  const dispatch = useDispatch();
  const notis = useSelector((store) => store.noti.notis);
  const orders = useSelector((store) => store.order.orderHistories);
  const { uid } = useSelector((store) => store.auth);
  const [refresh, setRefresh] = useState(false);

  // Fetch all Noti
  const fetchNotiHandler = async () => {
    await dispatch(fetchNotis());
  };

  // Fetch all Orders
  const fetchOrderHandler = async () => {
    await dispatch(onFetchOrderHistoryies());
  };

  useEffect(() => {
    fetchNotiHandler();
    fetchOrderHandler();
  }, []);

  // Go to Order Detail based on order id in noti
  const goToOrderDetail = async (orderId, notiId) => {
    // Change touched to false
    if (notis[notiId].touched == false) {
      dispatch(updateNoti(uid, notiId));
    }

    const result = orders.filter((order) => order.oid === orderId);
    const data = result[0];
    props.navigation.navigate("notiOrderDetail", {
      orderId: orderId,
      serviceName: data.serviceName,
      paymentType: data.paymentType,
      timestamp: data.timestamp,
      items: data.items,
      totalQty: data.totalQty,
      totalPrice: data.totalPrice,
      fromNoti: true,
    });
  };

  return (
    <View style={style.screen}>
      <FlatList
        onRefresh={fetchNotiHandler}
        refreshing={refresh}
        keyExtractor={(item, index) => index}
        data={Object.keys(notis)}
        renderItem={(items) => (
          <NotiBox
            data={notis[items.item]}
            notiId={items.item}
            pressed={goToOrderDetail}
          />
        )} // items.item === notiId
      />
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
