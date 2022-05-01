import React, { useState } from "react";
import {
  Button,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet,
} from "react-native";
import PaymentDescBox from "../../components/Home/PaymentDescBox";
import PaymentOptionsBtn from "../../components/Home/PaymentOptionsBtn";

const dummyDatas = [
  {
    name: "KBZ pay",
    imgUrl: require("../../assets/image/payment/kbzpay.png"),
    alt: "KBZ Pay Logo",
    screen: "paymentDetail",
    phno: "09764704270",
    colorCode: "#2460FC",
    androidAppUrl:
      "https://play.google.com/store/apps/details?id=com.kbzbank.kpaycustomer",
    iosAppUrl: "https://apps.apple.com/us/app/kbzpay-customer/id1398852297",
  },
  {
    name: "Mytel pay",
    imgUrl: require("../../assets/image/payment/mytelpay.png"),
    alt: "Mytel Pay Logo",
    screen: "paymentDetail",
    phno: "09764704270",
    colorCode: "#F64FDC",
    androidAppUrl:
      "https://play.google.com/store/apps/details?id=com.mytelpay.eu",
    iosAppUrl: "https://apps.apple.com/us/app/mytelpay/id1463482161",
  },
  {
    name: "Wave pay",
    imgUrl: require("../../assets/image/payment/wavepay.png"),
    alt: "Wave Pay Logo",
    screen: "paymentDetail",
    phno: "09764704270",
    colorCode: "#FAF001",
    androidAppUrl:
      "https://play.google.com/store/apps/details?id=mm.com.wavemoney.wavepay",
    iosAppUrl: "https://apps.apple.com/us/app/wavepay/id1439175549",
  },
];

export default function Payment(props) {
  // useState for radio input
  const [checked, setChecked] = useState({
    "KBZ pay": false,
    "Mytel pay": false,
    "Wave pay": false,
  });
  const [canClick, setCanClick] = useState(false);

  // Datas from navigation params
  const { items, serviceName, totalPrice } = props.route.params;

  const checkedHandler = (name) => {
    const data = {
      "KBZ pay": false,
      "Mytel pay": false,
      "Wave pay": false,
    };

    data[name] = true;
    setChecked(data);
    setCanClick(true);
  };

  const paymentOptions = dummyDatas.map((data, index) => {
    return (
      <PaymentOptionsBtn
        key={index}
        name={data.name}
        imgUrl={data.imgUrl}
        active={checked[data.name]}
        pressed={checkedHandler}
      />
    );
  });

  const submitHandler = () => {
    const keys = Object.keys(checked); // ["KBZ pay", "Mytel pay", "Wave pay"]
    const checkedValue = keys.filter((key) => checked[key]); // return array

    const datas = dummyDatas.filter((data) => data.name === checkedValue[0]); // return array
    props.navigation.navigate("paymentDetail", {
      datas: datas[0],
      items,
      serviceName,
      totalPrice,
    });
  };

  return (
    <View style={style.screen}>
      <PaymentDescBox totalPrice={totalPrice} />
      <View style={{ width: "70%" }}>{paymentOptions}</View>
      <View>
        <Button
          title="ငွေပေးချေမည်"
          onPress={submitHandler}
          disabled={canClick ? false : true}
        />
      </View>
    </View>
  );
}

export const paymentNavOptions = () => {
  return {
    headerTitle: "ငွေပေးချေရန် ရွေးချယ်ပါ",
  };
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: "18%",
    backgroundColor: "#fff",
  },
  imgContainer: {
    width: 110,
    height: 110,
    borderRadius: 120,
    overflow: "hidden",
  },
  touchable: {
    width: "100%",
    height: "100%",
  },
  img: {
    width: "100%",
    height: "100%",
  },
});
