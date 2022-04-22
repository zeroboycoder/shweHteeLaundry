import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { onboarding } from "../../store/actions/user/auth";

export default function OnboradingItem(props) {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  // End click handler
  const onboardingHandler = () => {
    dispatch(onboarding());
  };

  return (
    <View style={[style.container, { width }]}>
      <View style={style.titleBox}>
        <Text style={style.title}>ရွှေထီး</Text>
        <Text style={style.subTitle}>လျှော်ဖွတ်သန့်စင်ရေး ဝန်ဆောင်မှု</Text>
      </View>
      <Image
        source={props.item.imgUrl}
        style={[style.image, { width, resizeMode: "contain" }]}
      />

      <View style={style.descBox}>
        <Text style={style.desc}>{props.item.desc}</Text>
      </View>

      {/* End Onboarding and go to home screen */}
      {props.item.isEnd ? (
        <TouchableOpacity
          style={style.iconContainer}
          onPress={onboardingHandler}
        >
          <AntDesign name="arrowright" size={24} color="#0016DA" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  titleBox: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "pyidaungsu-bold",
    color: "#FFC600",
    fontSize: 34,
  },
  subTitle: {
    fontFamily: "pyidaungsu-bold",
    color: "#0016DA",
    fontSize: 18,
    marginTop: 3,
  },
  image: {
    flex: 0.5,
    justifyContent: "center",
  },
  descBox: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  desc: {
    fontFamily: "pyidaungsu",
    textAlign: "center",
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
    right: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#0016DA",
    borderRadius: 50,
  },
});
