import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  Platform,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
} from "react-native";
import axios from "axios";
import * as Google from "expo-auth-session/providers/google";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

import Color from "../../constant/Color";
import * as SocialAuth from "../../util/socialAuth";

export default function ChooseAuth(props) {
  const [showLoading, setShowLoading] = useState({ name: "" });

  // For Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "224889267136-9pdatvjpdpce4n9un1qka2v15q0mdf26.apps.googleusercontent.com",
    iosClientId:
      "224889267136-8a10be03t8tij2p4mpn4reffibhn0eic.apps.googleusercontent.com",
    expoClientId:
      "224889267136-tn1cjm1g7dsgrm8iqfr7sspdreu5l2ld.apps.googleusercontent.com",
  });

  useEffect(async () => {
    if (response?.type === "success") {
      const accessToken = response.authentication.accessToken;
      const userInfo = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const user = await userInfo.json();
      const { id, name } = user;
      showMessage({
        message: `${id}, ${name}`,
        type: "warning",
      });
      console.log(id, name);
      // Check the user is exist or not
      const res = await axios.get(
        `https://shwe-htee-laundry-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}.json`
      );
      const data = res.data;
      if (data) {
        const uname = data.uname ? data.uname : name;
        return props.navigation.navigate("GetUserInfo", {
          id,
          name: uname,
          phno: data.phno,
          address: data.address,
          admin: data.admin ? data.admin : false,
        });
      } else {
        props.navigation.navigate("GetUserInfo", {
          id,
          name,
        });
      }
    }
  }, [response]);

  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  const clickHanlder = (loginName) => {
    if (loginName === "google") {
      promptAsync({ showInRecents: true });
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
