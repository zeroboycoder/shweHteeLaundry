import axios from "axios";

export const ADD_ORDER = "ADD_ORDER";
export const FETCH_ORDER_HISTORIES = "FETCH_ORDER_HISTORIES";

export const onAddOrder =
  (items, serviceName, paymentType) => async (dispatch, getState) => {
    const { uid, uname, phno, address, userPushToken } = getState().auth;
    const { totalQty, totalPrice } = getState().item;
    const status = "pending";
    const data = {
      uid,
      uname,
      phno,
      address,
      userPushToken,
      serviceName,
      paymentType,
      items,
      totalQty,
      totalPrice,
      status,
      timestamp: new Date().getTime(),
      paymentConfirmed: false,
      status: "pending",
    };
    try {
      const response = await axios.post(
        "https://shwe-htee-laundry-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        data
      );
      dispatch({
        type: ADD_ORDER,
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const onFetchOrderHistoryies = () => async (dispatch, getState) => {
  const { uid, admin } = getState().auth;
  try {
    const response = await axios.get(
      "https://shwe-htee-laundry-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json"
    );
    const resData = response.data;
    let history = [];
    if (!admin) {
      for (const key in resData) {
        let data = [];
        if (resData[key].uid === uid) {
          data = resData[key];
          data["oid"] = key;
          history.unshift(data);
        }
      }
    } else {
      history = resData;
    }
    dispatch({
      type: FETCH_ORDER_HISTORIES,
      data: history,
    });
  } catch (error) {
    console.log(error);
  }
};
