import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import ProfileInfoBox from "../../components/Profile/ProfileInfoBox";

export default function Profile() {
  // Get Datas from Store with useSelector
  const { uname, phno, address } = useSelector((state) => state.auth);

  // Dummy Datas
  const dummyDatas = [
    { label: "Name", value: uname },
    { label: "Phone Number", value: phno },
    { label: "Address", value: address },
  ];

  const profileInfos = dummyDatas.map((info) => (
    <ProfileInfoBox key={info.label} label={info.label} value={info.value} />
  ));

  return (
    <View style={style.screen}>
      <View style={style.nameCircle}>
        <Text style={style.name}>P</Text>
      </View>
      <View style={style.infos}>{profileInfos}</View>
    </View>
  );
}

export const ProfileNavOptions = (navData) => ({
  headerTitle: "Profile",
  headerRight: () => (
    <Feather
      name="menu"
      size={24}
      color="white"
      style={{ marginRight: 24 }}
      onPress={() => navData.navigation.toggleDrawer()}
    />
  ),
});

const style = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.12,
    backgroundColor: "#fff",
  },
  nameCircle: {
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    marginBottom: 20,
    borderRadius: 90,
    backgroundColor: "#dedede",
  },
  name: {
    fontFamily: "pyidaungsu-bold",
    fontSize: 26,
    color: "#000",
  },
  infos: {
    width: "80%",
  },
});
