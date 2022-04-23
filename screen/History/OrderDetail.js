import React, { useState, useCallback } from "react";
import {
  Dimensions,
  RefreshControl,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import OrderDetail from "../../components/Home/OrderDetail";
import { onFetchOrderHistoryies } from "../../store/actions/service/order";
import { addNoti } from "../../store/actions/service/noti";
import { sentPushNoti } from "../../util/noti";

export default function Checkout(props) {
  const dispatch = useDispatch();
  const [refreash, setSrefreash] = useState(false);
  const [curStatus, setCurStatus] = useState(props.route.params.status);
  const {
    uid,
    originOrderId,
    orderId,
    time,
    paymentType,
    serviceName,
    items,
    totalQty,
    totalPrice,
    userPushToken,
    fromHistory,
  } = props.route.params;

  // Load specific history
  const loadHistories = useCallback(async () => {
    dispatch(onFetchOrderHistoryies());
  }, []);

  const confirmedHandler = async () => {
    const res = await axios.get(
      `https://shwe-htee-laundry-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${originOrderId}.json`
    );
    const data = res.data;
    data.paymentConfirmed = true;
    data.status = "confirmed";
    setCurStatus("confirmed"); // change current status
    await axios.put(
      `https://shwe-htee-laundry-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${originOrderId}.json`,
      data
    );
    // Sent Push Notification to user
    sentPushNoti(
      userPushToken,
      "Confirmed Your Payment",
      "Your payment is confirmed..."
    );
    // Add Noti to database
    const notiData = {
      uid: uid,
      msg: {
        oid: originOrderId,
        msg: "Your Payment is confirmed!!!",
        timestamp: new Date().getTime(),
        imgCode: "confirmed",
        touched: false,
      },
    };
    dispatch(addNoti(notiData));
  };

  const finishedHandler = async () => {
    const res = await axios.get(
      `https://shwe-htee-laundry-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${originOrderId}.json`
    );
    const data = res.data;
    data.status = "finished";
    setCurStatus("finished"); // change current status
    await axios.put(
      `https://shwe-htee-laundry-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${originOrderId}.json`,
      data
    );
    // Sent Push Notification to user
    sentPushNoti(
      userPushToken,
      "Finished Your Order",
      "Your order is finished..."
    );
    // Add Noti to database
    const notiData = {
      uid: uid,
      msg: {
        oid: originOrderId,
        msg: "Your Order is finished!!!",
        timestamp: new Date().getTime(),
        imgCode: "finished",
        touched: false,
      },
    };
    dispatch(addNoti(notiData));
  };

  return (
    <View style={style.screen}>
      <ScrollView
        contentContainerStyle={style.container}
        refreshControl={
          <RefreshControl refreshing={refreash} onRefresh={loadHistories} />
        }
      >
        <OrderDetail
          orderId={orderId}
          time={time}
          paymentType={paymentType}
          serviceName={serviceName}
          status={curStatus}
          items={items}
          totalQty={totalQty}
          totalPrice={totalPrice}
          fromHistory={fromHistory}
          confirmedHandler={confirmedHandler}
          finishedHandler={finishedHandler}
        />
      </ScrollView>
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
