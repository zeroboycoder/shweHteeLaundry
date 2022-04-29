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

import Color from "../../constant/Color";

export default function PromoBox({ imgUrl, title, desc, promoText, clicked }) {
  // choose the touchable component with the based OS
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View>
      <TouchableComponent onPress={clicked}>
        <View style={style.container}>
          <View style={style.imgContainer}>
            <Image source={imgUrl} alt="Promo Image" style={style.img} />
          </View>
          <View>
            <View>
              <Text style={style.title}>{title}</Text>
              <Text style={style.desc}>{desc}</Text>
            </View>
            <View style={style.promoBox}>
              <Text style={style.promoText}>{promoText}</Text>
            </View>
          </View>
        </View>
      </TouchableComponent>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 200,
    height: 110,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: Color.yellow,
    borderRadius: 16,
  },
  // Left Section
  imgContainer: {
    width: 60,
    height: 60,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  // Right Section
  title: {
    width: 100,
    color: Color.darkBlue,
    fontFamily: "pyidaungsu",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 3,
  },
  desc: {
    fontFamily: "pyidaungsu",
  },
  promoBox: {
    width: 70,
    borderWidth: 1,
    borderColor: "#fb0d0d",
    marginLeft: 7,
    paddingHorizontal: 3,
    borderRadius: 3,
    transform: [{ rotate: "-20deg" }],
  },
  promoText: {
    fontFamily: "pyidaungsu",
    fontSize: 12,
    color: "#fb0d0d",
  },
});
