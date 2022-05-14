import React from "react";
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import Color from "../../constant/Color";
import ServiceBox from "../../components/Home/ServiceBox";
import PromoBox from "../../components/Home/PromoBox";
import { serviceDummyDatas, promoDummyDatas } from "../../data/dummyDatas";

export default function Home(props) {
  const goToCategoryHandler = (serviceName, promoId) => {
    props.navigation.navigate("categories", {
      serviceName,
      promoId,
    });
  };
  return (
    <View style={style.screen}>
      {/* Greeting Section */}
      <View style={style.greetingContainer}>
        <Text style={style.greetingTitle}>မင်္ဂလာပါ</Text>
        <View style={style.greetingBody}>
          <View style={style.imgContiner}>
            <Image
              source={require("../../assets/image/home/greeting.png")}
              alt="Service Logo"
              style={style.img}
            />
          </View>
          <View style={style.textContainer}>
            <Text style={style.greetingText}>
              သင့်ရဲ့ အဝတ်အထည်များကို ယုံကြည်စွာအပ်နှံလိုက်ပါ
            </Text>
          </View>
        </View>
      </View>

      {/* Service Section */}
      <View style={style.serviceContianer}>
        <Text style={style.title}>ဝန်ဆောင်မှုများ</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.serviceBoxs}
        >
          {serviceDummyDatas.map((service) => (
            <ServiceBox
              key={service.name}
              name={service.name}
              imgUrl={service.imgUrl}
              clicked={() => goToCategoryHandler(service.name)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Promotion Section */}
      <View>
        <Text style={style.title}>အထူးဝန်ဆောင်မှုများ</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={style.promoBoxs}
        >
          {promoDummyDatas.map((promo, i) => (
            <PromoBox
              key={i}
              title={promo.title}
              imgUrl={promo.imgUrl}
              desc={promo.desc}
              promoText={promo.promoText}
              clicked={() => goToCategoryHandler(promo.title, promo.id)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export const HomeNavOptions = (navData) => {
  return {
    headerTitle: "Shwe Htee",
    headerRight: () => (
      <Feather
        name="menu"
        size={24}
        color="white"
        style={{ marginRight: 24 }}
        onPress={() => navData.navigation.toggleDrawer()}
      />
    ),
  };
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: Dimensions.get("window").height * 0.05,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },

  //
  greetingTitle: {
    fontFamily: "pyidaungsu-bold",
    fontSize: 20,
    marginBottom: 15,
    color: Color.darkBlue,
  },
  greetingBody: {
    width: Dimensions.get("screen").width,
    position: "relative",
    left: -16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 16,
  },
  imgContiner: {
    width: 100,
    height: 80,
    borderRadius: 16,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  greetingText: {
    fontFamily: "pyidaungsu",
    fontSize: 14,
    flexWrap: "wrap",
    textAlign: "center",
    color: Color.darkBlue,
  },

  // Service
  serviceContianer: {
    width: "100%",
    minHeight: 150,
    maxHeight: 150,
    marginVertical: 15,
  },
  title: {
    fontFamily: "pyidaungsu-bold",
    fontSize: 17,
    color: Color.darkBlue,
  },
  serviceBoxs: {
    flex: 1,
    justifyContent: "space-around",
  },

  // Promotion
  promoBoxs: {
    marginVertical: 16,
  },
});
