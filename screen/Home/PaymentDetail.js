import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as Clipboard from "expo-clipboard";
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from "axios";

import PaymentDescBox from "../../components/Home/PaymentDescBox";
import { onAddOrder } from "../../store/actions/service/order";
import { sentPushNoti, schedulePushNotification } from "../../util/noti";

export default function PaymentDetail(props) {
  const dispatch = useDispatch();
  const { datas, serviceName, items, totalPrice } = props.route.params;

  const addOrderHandler = () => {
    dispatch(onAddOrder(items, serviceName, datas.name));
  };

  // Copy the phone number
  const copyHandler = () => {
    Clipboard.setString(datas.phno);
    showMessage({
      message: "Copied!",
      type: "success",
    });
  };

  const openTheApp = async () => {
    // Open an app in play store or App Store
    const appUrl =
      Platform.OS === "android" ? datas.androidAppUrl : datas.iosAppUrl;
    const canOpen = Linking.canOpenURL(appUrl);
    if (canOpen) {
      addOrderHandler();
      Linking.openURL(appUrl);
      // Sent local notification to customer (themself)
      schedulePushNotification("Shwe Htee", "Your order is send to owner!!!");
      // Sent push notification to owner
      let adminTokenArr = [];
      try {
        const res = await axios.get(
          `https://shwe-htee-laundry-default-rtdb.asia-southeast1.firebasedatabase.app/adminPushTokens.json`
        );
        adminTokenArr = res.data;
        adminTokenArr.map((adminToken) =>
          sentPushNoti(adminToken.token, "Shwe Htee", "Receive New Order!")
        );
      } catch (err) {
        throw new Error(err);
      }
    } else {
      Alert.alert(
        "Can't open",
        `Cant't open ${datas.name} app. Please open manually`
      );
    }
  };

  return (
    <View style={{ ...style.screen, backgroundColor: datas.colorCode }}>
      <View style={style.imgContainer}>
        <Image source={datas.imgUrl} alt={datas.name} style={style.img} />
      </View>

      <PaymentDescBox totalPrice={totalPrice} />

      <View style={style.phnoBox}>
        <View style={style.phoneTopBox}>
          <Text style={style.phno}>{datas.phno}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={style.copyBtn}
            onPress={copyHandler}
          >
            <Text style={{ fontFamily: "pyidaungsu" }}>ကူးယူပါ</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={style.openBtn}
            onPress={openTheApp}
          >
            <Text style={{ fontFamily: "pyidaungsu" }}>
              {datas.name} app ကိုဖွင့်ပါ
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.textBox}>
        <Text style={style.text}>
          အထက်ပါ ဖုန်းနံပါတ်ကို ကူးယူပြီး {datas.name} တွင် ရိုက်ထည့်၍
          ငွေပေးချေပါ။
        </Text>
      </View>
    </View>
  );
}

export const paymentDetaileNavOptions = (props) => {
  const title = props.route.params.name;
  return {
    headerTitle: title,
    Clipboard,
  };
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: Dimensions.get("window").height * 0.08,
  },
  imgContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 7,
    elevation: 10,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#fff",
  },
  phnoBox: {
    alignItems: "center",
  },
  phoneTopBox: {
    flexDirection: "row",
  },
  phno: {
    fontFamily: "pyidaungsu-bold",
    padding: 5,
    paddingHorizontal: 20,
    borderColor: "#ccc",
    borderRadius: 7,
    backgroundColor: "#fff",
  },
  copyBtn: {
    padding: 5,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 7,
    backgroundColor: "#fff",
  },
  openBtn: {
    padding: 6,
    paddingHorizontal: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 7,
    backgroundColor: "#fff",
  },
  textBox: {
    width: "70%",
  },
  text: {
    textAlign: "center",
    fontFamily: "pyidaungsu",
  },
});
