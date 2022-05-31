import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CategoryRow from "../../components/Home/CategoryRow";
import ItemBox from "../../components/Home/ItemBox";
import BottomCheckout from "../../components/Home/BottomCheckout";
import {
  onFetchItems,
  onAddToCart,
  onRemoveFromCart,
} from "../../store/actions/service/item";

export default function Items(props) {
  // Get the category id from navigation params
  const serviceName = props.route.params.serviceName;
  const cateId = props.route.params.cid;
  const promoId = props.route.params.promoId;
  // Create a local state
  const [loading, setLoading] = useState(false);
  const [cid, setCid] = useState(cateId);
  // Fetch the datas from store(reducer)
  const currentItems = useSelector((state) => state.item.currentItems);
  const filterItems = currentItems.filter((item) => item.cid === cid);
  const totalQty = useSelector((state) => state.item.totalQty);
  const totalPrice = useSelector((state) => state.item.totalPrice);

  const dispatch = useDispatch();
  const loadItems = useCallback(async () => {
    try {
      await dispatch(onFetchItems());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    loadItems().then(() => {
      setLoading(false);
    });
  }, [loadItems]);

  // Handler for top categories row
  cateRowPressedHandler = (id) => {
    setCid(id);
  };

  const addToCart = useCallback(
    (index, price) => {
      dispatch(onAddToCart(index, price));
    },
    [dispatch]
  );

  const removeFromCart = useCallback(
    (pid, price) => {
      dispatch(onRemoveFromCart(pid, price));
    },
    [dispatch]
  );

  const checkoutBtnHandler = () => {
    const items = currentItems.filter((item) => item.qty > 0);
    props.navigation.navigate("checkout", {
      serviceName: serviceName,
      items: items,
      totalQty,
      totalPrice,
      fromHome: true,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <CategoryRow currentCid={cid} pressed={cateRowPressedHandler} />
        <View style={{ marginBottom: 270 }}>
          <FlatList
            data={filterItems}
            renderItem={(items) => (
              <ItemBox
                item={items.item}
                added={addToCart}
                removed={removeFromCart}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <BottomCheckout
          totalQty={totalQty}
          totalPrice={totalPrice}
          promoId={promoId}
          pressed={checkoutBtnHandler}
        />
      </View>
    </View>
  );
}

export const itemsNavOptions = (props) => {
  const title = props.route.params.categoryName;
  return {
    headerTitle: title,
  };
};
