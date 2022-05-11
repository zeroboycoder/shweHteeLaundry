import React, { useCallback, useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import Color from "../../constant/Color";
import {
  onFetchOrderHistoryies,
  onDelOrder,
} from "../../store/actions/service/order";
import OwnerOrderBox from "../../components/History/OwnerNewOrderHistory";

export default function HistoryForOwner(props) {
  const dispatch = useDispatch();
  const [isconfirmedBtn, setIsconfirmedBtn] = useState(false);
  const [newOrders, setNewOrders] = useState();
  const [confirmedOrders, setConfirmedOrders] = useState();
  const [unfinishedOrders, setUnfinishedOrders] = useState(0); // for just total description
  const [loading, setLoading] = useState(true);
  const [refreashing, setRefreashing] = useState(false);

  const allOrderHistories = useSelector((store) => store.order.orderHistories);

  // Fetch Histories
  useEffect(() => dispatch(onFetchOrderHistoryies()), [dispatch]);

  const loadHistories = useCallback(() => {
    dispatch(onFetchOrderHistoryies());
  }, []);

  // Analyis Histories
  const fetchHistories = () => {
    let unfinishCounter = 0;
    const newOrders = [];
    const confirmedOrders = [];
    for (const key in allOrderHistories) {
      if (allOrderHistories[key].status === "pending") {
        const tempArr = [];
        tempArr.push(allOrderHistories[key]);
        tempArr[0]["oid"] = key;
        newOrders.unshift([...tempArr]);
      } else {
        const tempArr = [];
        tempArr.push(allOrderHistories[key]);
        tempArr[0]["oid"] = key;
        confirmedOrders.unshift([...tempArr]);
        if (allOrderHistories[key].status === "confirmed") unfinishCounter++;
      }
    }
    setUnfinishedOrders(unfinishCounter);
    setNewOrders(newOrders);
    setConfirmedOrders(confirmedOrders);
  };

  // Change history based on isconfiredBtn/Top Btn
  useEffect(() => {
    setLoading(true);
    fetchHistories();
    setLoading(false);
  }, [allOrderHistories]);

  // Delete Order Handler
  const deleteOrderHandler = (orderId, status) => {
    if (status.pending) {
      const updatedOrder = newOrders.filter(
        (newOrder) => newOrder[0].oid !== orderId
      );
      setNewOrders(updatedOrder);
    } else {
      const updatedOrder = confirmedOrders.filter(
        (newOrder) => newOrder[0].oid !== orderId
      );
      setConfirmedOrders(updatedOrder);
    }
    dispatch(onDelOrder(orderId));
  };

  // Press go to order detail
  const pressedHandler = (items) => {
    const order = items[0];
    // Order Id
    const oid = order.oid;
    const orderId = oid.substring(oid.length - 5, oid.length);
    // Change timestamp to date & time
    const timestamp = order.timestamp;
    const dateString = String(new Date(timestamp).toDateString()); // 'Thu Jan 20 2022'
    const timeString = String(new Date(timestamp).toLocaleTimeString()); // '4:29:17 AM'
    const time = dateString + " at " + timeString;

    props.navigation.navigate("orderDetail", {
      uid: order.uid,
      originOrderId: oid,
      orderId: orderId,
      paymentType: order.paymentType,
      status: order.status,
      serviceName: order.serviceName,
      time: time,
      items: order.items,
      totalQty: order.totalQty,
      totalPrice: order.totalPrice,
      userPushToken: order.userPushToken,
    });
  };

  // Create a Buttons
  let TouchableCpn = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCpn = TouchableNativeFeedback;
  }

  const changeActiveBtn = (name) => {
    name === "newOrder" ? setIsconfirmedBtn(false) : setIsconfirmedBtn(true);
  };

  const topButtons = (
    <View style={style.btnContainer}>
      <View
        style={
          isconfirmedBtn
            ? { ...style.btn, ...style.btnLeft }
            : { ...style.btn, ...style.btnLeft, ...style.activeBtn }
        }
      >
        <TouchableCpn onPress={() => changeActiveBtn("newOrder")}>
          <Text
            style={
              isconfirmedBtn
                ? { ...style.text }
                : { ...style.text, ...style.activeText }
            }
          >
            New Orders
          </Text>
        </TouchableCpn>
      </View>
      <View
        style={
          isconfirmedBtn
            ? { ...style.btn, ...style.btnRight, ...style.activeBtn }
            : { ...style.btn, ...style.btnRight }
        }
      >
        <TouchableCpn onPress={() => changeActiveBtn("confirmedOrder")}>
          <Text
            style={
              isconfirmedBtn
                ? { ...style.text, ...style.activeText }
                : { ...style.text }
            }
          >
            Confirmed Orders
          </Text>
        </TouchableCpn>
      </View>
    </View>
  );

  let app = <ActivityIndicator size="large" color={Color.darkBlue} />;
  if (!loading) {
    app = (
      <View style={style.screen}>
        {/* Top Level Buttons */}
        {topButtons}
        {/* Body */}
        <View style={style.body}>
          {!isconfirmedBtn ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 6,
                }}
              >
                <Text style={style.counterText}>
                  New Orders : {newOrders.length}
                </Text>
                <Ionicons
                  name="reload"
                  size={24}
                  color="black"
                  onPress={loadHistories}
                />
              </View>
              <FlatList
                onRefresh={loadHistories}
                refreshing={refreashing}
                keyExtractor={(item, index) => index}
                initialNumToRender={10}
                data={newOrders}
                renderItem={(items) => (
                  <OwnerOrderBox
                    {...items.item}
                    pressed={() => pressedHandler(items.item)}
                    deleted={deleteOrderHandler}
                  />
                )}
                style={{ height: "100%" }}
              />
            </>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 6,
                }}
              >
                <Text style={style.counterText}>
                  Unfinish Orders : {unfinishedOrders}
                </Text>
                <Ionicons
                  name="reload"
                  size={24}
                  color="black"
                  onPress={loadHistories}
                />
              </View>
              <FlatList
                onRefresh={loadHistories}
                refreshing={refreashing}
                keyExtractor={(item, index) => index}
                data={confirmedOrders}
                renderItem={(items) => (
                  <OwnerOrderBox
                    {...items.item}
                    pressed={() => pressedHandler(items.item)}
                    deleted={deleteOrderHandler}
                  />
                )}
                style={{ height: "100%" }}
              />
            </>
          )}
        </View>
      </View>
    );
  }
  return app;
}

const style = StyleSheet.create({
  screen: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    maxHeight: "100%",
    paddingBottom: 64,
  },
  btnContainer: {
    flexDirection: "row",
  },
  btn: {
    width: 140,
    borderWidth: 1,
    borderColor: "#000",
  },
  btnLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  btnRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  activeBtn: {
    borderColor: "#ffc600",
    backgroundColor: "#ffc600",
  },
  text: {
    textAlign: "center",
    paddingVertical: 8,
    fontFamily: "pyidaungsu",
    color: "#000",
    width: "100%",
  },
  activeText: {
    color: "#fff",
  },
  counterText: {
    marginBottom: 2,
    fontSize: 14,
    fontFamily: "pyidaungsu-bold",
  },
  body: {
    width: "100%",
    marginTop: 16,
  },
});
