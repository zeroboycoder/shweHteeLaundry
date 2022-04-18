import React, { Component, useEffect } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

import { onAuth, onTriedLogin } from "../store/actions/user/auth";
import Color from "../constant/Color";

class StartScreen extends Component {
  checkAuth = async () => {
    const userDatas = await AsyncStorage.getItem("userDatas");
    console.log(userDatas);
    if (userDatas === null) {
      console.log("Tried login");
      this.props.onTriedLogin();
      return;
    }

    this.props.onAuth(JSON.parse(userDatas));
  };

  componentDidMount() {
    console.log("CDM & check auth");
    this.checkAuth();
  }

  componentDidUpdate() {
    console.log("CDU");
  }

  render() {
    console.log("Startup screen");
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={Color.darkBlue} />
      </View>
    );
  }
}

const dispatchToProps = (dispatch) => ({
  onAuth: (userDatas) => dispatch(onAuth(userDatas)),
  onTriedLogin: () => dispatch(onTriedLogin()),
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default connect(null, dispatchToProps)(StartScreen);
