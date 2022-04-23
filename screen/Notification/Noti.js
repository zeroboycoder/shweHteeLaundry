import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import NotiBox from "../../components/Notification/NotiBox";
import { fetchNotis } from "../../store/actions/service/noti";

export default function Noti() {
  const dispatch = useDispatch();
  const notis = useSelector((store) => store.noti.notis);
  const [refresh, setRefresh] = useState();

  // Fetch all Noti
  const fetchNotiHandler = async () => {
    await dispatch(fetchNotis());
  };

  useEffect(fetchNotiHandler, []);

  // Go to Order Detail based on order id in noti
  const goToOrderDetail = (orderId) => {
    console.log("Order Id : ", orderId);
  };

  return (
    <View style={style.screen}>
      {console.log(notis)}
      <FlatList
        keyExtractor={(item, index) => index}
        data={Object.keys(notis)}
        renderItem={(items) => (
          <NotiBox data={notis[items.item]} pressed={goToOrderDetail} />
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
