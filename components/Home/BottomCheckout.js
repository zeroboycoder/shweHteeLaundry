import React, { useState, useEffect, useCallback } from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export default function BottomCheckout(props) {
  const [promoClothes, setPromoClothes] = useState();

  useEffect(() => {
    if (props.promoId) {
      if (props.promoId === "p000") {
        setPromoClothes(100);
      }
      if (props.promoId === "p001") {
        setPromoClothes(20);
      }
    }
  }, [props.promoId]);

  return (
    // Button Total Checkout
    <View style={style.bottomCheckout}>
      <View style={style.container}>
        <View style={style.row}>
          <Text style={style.text}>Total clothes :</Text>
          <Text style={style.text}>
            {props.totalQty}
            {props.promoId && " / " + promoClothes}
          </Text>
        </View>
        <View style={style.row}>
          <Text style={style.text}>Total price : </Text>
          <Text style={style.text}>{props.totalPrice} Ks</Text>
        </View>
        <View style={style.btnContainer}>
          <Button
            disabled={!!!props.totalPrice}
            title="Checkout"
            onPress={props.pressed}
          />
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  bottomCheckout: {
    alignItems: "center",
    position: "absolute",
    left: 0,
    bottom: 50,
    width: "100%",
    height: 126,
    backgroundColor: "#eaeaea",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 3,
  },
  container: {
    width: "80%",
    height: "100%",
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "pyidaungsu",
    fontSize: 16,
  },
  btnContainer: {
    paddingBottom: 6,
  },
});
