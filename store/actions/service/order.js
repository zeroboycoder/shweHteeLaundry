import axios from "axios";

export const FETCH_ORDER_HISTORIES = "FETCH_ORDER_HISTORIES";
export const ADD_ORDER = "ADD_ORDER";
export const DEL_ORDER = "DEL_ORDER";

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
        if (resData[key].uid === uid) {
          let tempData = {};
          tempData = { ...resData[key] };
          tempData["oid"] = key;
          history.unshift(tempData);
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

export const onDelOrder = (orderId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `https://shwe-htee-laundry-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${orderId}.json`
    );
    if (res.status === 200) {
      dispatch({
        type: DEL_ORDER,
        orderId,
      });
    }
  } catch (error) {}
};
