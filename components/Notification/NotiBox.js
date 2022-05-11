import React from "react";
import {
  Image,
  Platform,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
} from "react-native";

const dummyDatas = {
  onTheWay: require("../../assets/image/noti/ontheway.png"),
  prepared: require("../../assets/image/noti/prepared.png"),
};

export default function NotiBox({ data, notiId, pressed }) {
  // Shortform of order id
  const oid = data.oid;
  const orderId = oid.substring(oid.length - 5, oid.length);
  // Change timestamp to date & time
  const timestamp = data.timestamp;
  const dateString = String(new Date(timestamp).toDateString()); // 'Thu Jan 20 2022'
  const timeString = String(new Date(timestamp).toLocaleTimeString()); // '4:29:17 AM'
  const time = dateString + " at " + timeString;

  let TouchableCpn = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCpn = TouchableNativeFeedback;
  }

  return (
    <View style={{ width: "100%" }}>
      <TouchableCpn onPress={() => pressed(oid, notiId)}>
        <View
          style={
            data.touched ? style.container : [style.container, style.untouched]
          }
        >
          <View style={style.firstCol}>
            <Text style={style.date}>{time}</Text>
            <View style={style.imgContainer}>
              {data.imgCode === "confirmed" ? (
                <Image
                  source={dummyDatas.prepared}
                  alt="Being prepared"
                  style={style.img}
                />
              ) : (
                <Image
                  source={dummyDatas.onTheWay}
                  alt="On the way"
                  style={style.img}
                />
              )}
            </View>
          </View>
          <View style={style.secondCol}>
            <Text style={style.text}>Order Id : {orderId}</Text>
            <Text style={style.text}>{data.msg}</Text>
          </View>
        </View>
      </TouchableCpn>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 13,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 7,
    marginVertical: 7,
    backgroundColor: "#fafafa",
  },
  untouched: {
    backgroundColor: "#ccc",
    borderColor: "#777",
    borderWidth: 1,
  },
  firstCol: {
    flex: 0.5,
  },
  date: {
    fontFamily: "pyidaungsu",
    fontSize: 12,
    color: "#837676",
  },
  imgContainer: {
    width: 97,
    height: 48,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  secondCol: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontFamily: "pyidaungsu",
    fontSize: 13,
  },
});
