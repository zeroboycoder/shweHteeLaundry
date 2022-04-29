import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

import Color from "../../constant/Color";
import CategoryBox from "../../components/Home/CategoryBox";
import { categoriesDatas } from "../../data/dummyDatas";

export default function Categories(props) {
  const serviceName = props.route.params.serviceName;
  const promoId = props.route.params.promoId;
  const cateDatasArr = [];
  for (const id in categoriesDatas) {
    cateDatasArr.push({ id: id, ...categoriesDatas[id] });
  }
  return (
    <View style={style.screen}>
      <Text style={style.title}>အထည်အမျိုးအစား ရွေးချယ်ပါ</Text>
      <ScrollView style={{ flex: 1 }}>
        <View style={style.categoryBox}>
          {cateDatasArr.map((category) => (
            <CategoryBox
              key={category.id}
              name={category.name}
              imgUrl={category.imgUrl}
              clicked={() =>
                props.navigation.navigate("items", {
                  serviceName,
                  categoryName: category.name,
                  cid: category.id,
                  promoId,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export const categoriesNavOptions = (props) => {
  const title = props.route.params.serviceName;
  return {
    headerTitle: title,
  };
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "pyidaungsu-bold",
    fontSize: 18,
    color: Color.darkBlue,
    marginTop: 20,
    letterSpacing: 0.7,
  },
  categoryBox: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 16,
  },
});
