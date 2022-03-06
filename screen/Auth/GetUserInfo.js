import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  Button,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
} from "react-native";
import * as Notifications from "expo-notifications";
import { useDispatch } from "react-redux";

import Colors from "../../constant/Color";
import InputBox from "../../components/InputBox";
import { onAuth } from "../../store/actions/user/auth";

// Create a set notification handler (alert is show or not)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
  }),
});

// 1st => Create a reducer
// Create a Store(state & dispatch)
// Manipulate with dispatch
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_INPUT": {
      const updateValues = {
        ...state.value,
        [action.inputName]: action.value,
      };
      let formIsValid = true;
      for (const key in updateValues) {
        formIsValid = updateValues[key].trim().length > 0 && formIsValid;
      }
      return {
        value: updateValues,
        formIsValid: formIsValid,
      };
    }
    default:
      return state;
  }
};

export default function GetUserInfo(props) {
  const dispatch = useDispatch();
  const { id, name } = props.route.params;
  const [userPushToken, setUserPushToken] = useState();

  // Create a state and dispatch for useEffect
  const [formState, formDispatch] = useReducer(reducer, {
    value: {
      uname: name,
      phno: "",
      address: "",
    },
    formIsValid: false,
  });

  // On Input Changed
  const inputChangeHandler = useCallback(
    (inputName, value) => {
      formDispatch({
        type: "UPDATE_INPUT",
        inputName: inputName,
        value: value,
      });
    },
    [formDispatch]
  );

  // Create a user's push token
  useEffect(() => {
    Notifications.getPermissionsAsync()
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Notifications.requestPermissionsAsync();
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          throw new Error("Permission isn't granted!");
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync();
      })
      .then((response) => {
        const token = response.data;
        setUserPushToken(token);
      });
  }, []);

  // If submitd form
  const onSubmitForm = () => {
    const userDatas = { ...formState.value, uid: id, token: userPushToken };
    dispatch(onAuth(userDatas));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={style.screen}>
        <View>
          <Text style={{ ...style.title, textAlign: "center" }}>Shwe Htee</Text>
          <Text style={{ ...style.subTitle, textAlign: "center" }}>
            Laundry Service
          </Text>
        </View>

        {/* Form */}
        <View style={style.form}>
          {/* 3 user input */}
          <InputBox
            inputName="uname"
            label="Username"
            value={formState.value.uname}
            autoCapitalize="none"
            returnKeyType="next"
            changed={inputChangeHandler}
          />
          <InputBox
            inputName="phno"
            label="Phone Number"
            value={formState.value.phno}
            keyboardType="phone-pad"
            autoCapitalize="none"
            returnKeyType="next"
            changed={inputChangeHandler}
          />
          <InputBox
            inputName="address"
            label="Address"
            value={formState.value.address}
            autoCapitalize="none"
            returnKeyType="next"
            changed={inputChangeHandler}
          />
          <View style={{ marginTop: 16 }}>
            <Button
              title="Submit"
              disabled={!formState.formIsValid}
              onPress={onSubmitForm}
            />
          </View>
        </View>
        <View style={{ widht: 10, height: 50 }}></View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: Dimensions.get("window").height * 0.1,
  },
  title: {
    fontFamily: "pyidaungsu-bold",
    fontSize: 24,
    color: Colors.orange,
  },
  subTitle: {
    marginTop: -2,
    fontFamily: "pyidaungsu",
    fontSize: 18,
    color: Colors.darkBlue,
  },
  form: {
    width: "80%",
  },
});
