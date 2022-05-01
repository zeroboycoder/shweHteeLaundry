import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Feather } from "@expo/vector-icons";

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

    const orderResult = orders.filter((order) => order.oid === orderId);
    const data = orderResult[0];
    if (!data) {
      showMessage({
        message: "Your order is deleted by owner",
        type: "warning",
      });
      return;
    }
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
      {notis === null ? (
        <View style={style.notiTextBox}>
          <Text style={style.notiText}>Notification မရှိသေးပါ။</Text>
        </View>
      ) : (
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
      )}
    </View>
  );
}

export const notiNavOptions = (navData) => {
  return {
    headerTitle: "Notifications",
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
    backgroundColor: "#fff",
    padding: 16,
  },
  notiTextBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notiText: {
    color: "#072ac8",
    fontFamily: "pyidaungsu",
    fontSize: 15,
  },
});
