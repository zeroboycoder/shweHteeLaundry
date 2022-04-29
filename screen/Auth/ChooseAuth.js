import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
} from "react-native";

import Color from "../../constant/Color";
import * as SocialAuth from "../../util/socialAuth";

export default function ChooseAuth(props) {
  const [showLoading, setShowLoading] = useState({ name: "" });
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  const clickHanlder = (loginName) => {
    if (loginName === "google") {
      SocialAuth.signInWithGoogleAsync(props.navigation);
      setShowLoading({ name: "google" });
    }
    if (loginName === "facebook") {
      SocialAuth.signInWithFacebookAsync(props.navigation);
      setShowLoading({ name: "facebook" });
    }
  };

  return (
    <View style={style.screen}>
      {/* Title Text */}
      <Text style={style.title}>Continuous with</Text>

      <View style={{ width: "75%" }}>
        {/* Social Login Btn */}
        <View style={style.social}>
          {/* Google Login Icon */}
          <View style={{ borderRadius: 25, overflow: "hidden" }}>
            <TouchableComponent onPress={() => clickHanlder("google")}>
              <View style={style.btnContainer}>
                {showLoading.name === "google" ? (
                  <ActivityIndicator size="small" color={Color.darkBlue} />
                ) : (
                  <>
                    <Image
                      source={require("../../assets/image/gg_logo.png")}
                      alt="Google Logo"
                      style={style.socialIcon}
                    />
                    <Text style={style.btnLable}>Google</Text>
                  </>
                )}
              </View>
            </TouchableComponent>
          </View>

          {/* Facebook Login Icon */}
          <View style={{ borderRadius: 25, overflow: "hidden" }}>
            <TouchableComponent onPress={() => clickHanlder("facebook")}>
              <View style={style.btnContainer}>
                {showLoading.name === "facebook" ? (
                  <ActivityIndicator size="small" color={Color.darkBlue} />
                ) : (
                  <>
                    <Image
                      source={require("../../assets/image/fb_logo.png")}
                      alt="Google Logo"
                      style={style.socialIcon}
                    />
                    <Text style={style.btnLable}>Facebook</Text>
                  </>
                )}
              </View>
            </TouchableComponent>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{ width: 112, height: 1, backgroundColor: "#000" }}
          ></View>
          <View>
            <Text
              style={{
                marginHorizontal: 10,
                fontFamily: "pyidaungsu",
                fontSize: 16,
              }}
            >
              OR
            </Text>
          </View>
          <View
            style={{ width: 112, height: 1, backgroundColor: "#000" }}
          ></View>
        </View>
      </View>

      <View></View>
    </View>
  );
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    position: "relative",
    top: Dimensions.get("window").height * 0.1,
    fontFamily: "pyidaungsu-bold",
    fontSize: 20,
  },
  social: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: Color.gray,
    padding: 6,
    borderRadius: 25,
    width: 126,
    height: 42,
  },
  socialIcon: {
    width: 26,
    height: 26,
  },
  btnLable: {
    fontFamily: "pyidaungsu",
  },
});
