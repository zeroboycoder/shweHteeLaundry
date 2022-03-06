import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import Color from "../../constant/Color";

export default function ItemBox(props) {
  const [selectedPrice, setSelectedPrice] = useState(props.item.price[0].prc);

  return (
    <View style={style.container}>
      <View style={style.textContainer}>
        <Text style={style.serviceText}>{props.item.name}</Text>
      </View>

      <View style={style.pickerContainer}>
        <Picker
          style={style.picker}
          selectedValue={selectedPrice}
          onValueChange={(itemValue) => setSelectedPrice(itemValue)}
        >
          {props.item.price.map((p, index) => (
            <Picker.Item
              key={index}
              label={p.prc.toString() + " Ks" + (p.vip ? " (VIP)" : "")} // 400 Ks  -or-  700 Ks (VIP)
              value={p.prc}
              style={style.pickerText}
            />
          ))}
        </Picker>
      </View>

      <View style={style.qtyContainer}>
        <TouchableOpacity
          disabled={props.item.qty < 1}
          style={style.btnContainer}
          onPress={() => props.removed(props.item.index, selectedPrice)}
        >
          <Text style={style.qtyBtn}>-</Text>
        </TouchableOpacity>

        <Text style={style.qty}>{props.item.qty}</Text>
        <TouchableOpacity
          style={style.btnContainer}
          onPress={() => props.added(props.item.index, selectedPrice)}
        >
          <Text style={style.qtyBtn}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: "85%",
    marginVertical: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Color.gray,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 12,
  },
  // Service Text
  textContainer: {
    flex: 0.33,
  },
  serviceText: {
    fontFamily: "pyidaungsu",
    fontSize: 14,
  },
  pickerContainer: {
    flex: 0.37,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontFamily: "pyidaungsu",
  },
  // Picker
  picker: {
    flex: 1,
    width: "80%",
    fontFamily: "pyidaungsu",
  },
  pickerText: {
    fontFamily: "pyidaungsu",
    fontSize: 14,
  },
  // Quentity
  qtyContainer: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 28,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  qtyBtn: {
    fontFamily: "pyidaungsu",
    fontSize: 20,
  },
  qty: {
    fontFamily: "pyidaungsu",
    fontSize: 16,
  },
});
