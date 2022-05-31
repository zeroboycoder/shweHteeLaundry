import React, { useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Color from "../../constant/Color";
import { onFetchItemsNum } from "../../store/actions/service/item";

export default function CategoryRow(props) {
  const dispatch = useDispatch();
  const numberOfItemsInCategory = useSelector(
    (state) => state.item.numberOfItemsInCategory
  );
  const cateDatasArr = [];
  for (const id in numberOfItemsInCategory) {
    cateDatasArr.push({ id: id, ...numberOfItemsInCategory[id] });
  }

  // Called an action for load item's number
  useEffect(() => {
    dispatch(onFetchItemsNum());
  }, [dispatch]);

  const cateRow = cateDatasArr.map((item) => {
    return (
      <TouchableOpacity key={item.id} onPress={() => props.pressed(item.id)}>
        <View style={style.cateBox}>
          <Text
            style={
              props.currentCid === item.id
                ? { ...style.name, ...style.activeText }
                : { ...style.name }
            }
          >
            {item.name}
          </Text>
          {item.numberOfItem < 1 ? (
            <View style={{ ...style.numBox, ...style.numBoxWithGray }}>
              <Text style={style.num}>{item.numberOfItem}</Text>
            </View>
          ) : (
            <View style={{ ...style.numBox }}>
              <Text style={style.num}>{item.numberOfItem}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <View style={style.container}>
      <ScrollView
        style={{ maxWidth: "80%" }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {cateDatasArr && cateRow}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 56,
  },
  cateBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  name: {
    fontFamily: "pyidaungsu-bold",
    fontSize: 15,
    color: Color.black,
  },
  activeText: {
    color: Color.darkBlue,
  },
  numBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    marginLeft: 7,
    borderRadius: 20,
    backgroundColor: Color.darkBlue,
  },
  numBoxWithGray: {
    backgroundColor: Color.gray,
  },
  num: {
    fontFamily: "pyidaungsu",
    fontSize: 12,
    color: "#fff",
  },
});
