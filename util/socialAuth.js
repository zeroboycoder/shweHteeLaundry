// import * as Google from "expo-google-app-auth";
import React from "react";
import { Platform } from "react-native";
import * as Facebook from "expo-facebook";
import axios from "axios";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export const signInWithGoogleAsync = async (navigation) => {
  const [accessToken, setAccessToken] = React.useState();

  const [request, response, promptAsync] = await Google.useAuthRequest({
    androidClientId:
      "224889267136-9pdatvjpdpce4n9un1qka2v15q0mdf26.apps.googleusercontent.com",
    iosClientId:
      "224889267136-8a10be03t8tij2p4mpn4reffibhn0eic.apps.googleusercontent.com",
    expoClientId:
      "224889267136-tn1cjm1g7dsgrm8iqfr7sspdreu5l2ld.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  });
};

// Google Sign In Old Version
// export const signInWithGoogleAsync = async (navigation) => {
//   console.log("Clicked google auth");
//   try {
//     const response = await Google.logInAsync({
//       androidClientId:
//         "224889267136-9pdatvjpdpce4n9un1qka2v15q0mdf26.apps.googleusercontent.com",
//       iosClientId:
//         "224889267136-8a10be03t8tij2p4mpn4reffibhn0eic.apps.googleusercontent.com",
//       scopes: ["profile"],
//     });
//     console.log("Finished response");
//     if (response.type === "success") {
//       const { id, name } = response.user;
//       console.log(id, name);
//       // Check the user is exist or not
//       const res = await axios.get(
//         `https://shwe-htee-laundry-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}.json`
//       );
//       const data = res.data;
//       if (data) {
//         return navigation.navigate("GetUserInfo", {
//           id,
//           name,
//           phno: data.phno,
//           address: data.address,
//           admin: data.admin ? data.admin : false,
//         });
//       } else {
//         navigation.navigate("GetUserInfo", {
//           id,
//           name,
//         });
//       }
//     } else {
//       console.log("Failed in google auth.");
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

export const signInWithFacebookAsync = async (navigation) => {
  console.log("Clicked facebook auth");
  try {
    await Facebook.initializeAsync({
      appId: "943053479978487",
    });
    const response = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });
    if (response.type === "success") {
      // Get the user's name using Facebook's Graph API
      const result = await axios.get(
        `https://graph.facebook.com/me?access_token=${response.token}`
      );
      const { id, name } = result.data;
      console.log(id, name);
      // Check the user is exist or not
      const res = await axios.get(
        `https://shwe-htee-laundry-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}.json`
      );
      const data = res.data;
      if (data) {
        return navigation.navigate("GetUserInfo", {
          id,
          name,
          phno: data.phno,
          address: data.address,
          admin: data.admin ? data.admin : false,
        });
      } else {
        navigation.navigate("GetUserInfo", {
          id,
          name,
        });
      }
    } else {
      console.log("Fail in facebook auth.");
    }
  } catch ({ message }) {
    throw new Error(message);
  }
};
