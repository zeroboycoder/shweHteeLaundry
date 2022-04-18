import axios from "axios";

export const ADD_NOTI = "ADD_NOTI";
export const FETCH_NOTI = "FETCH_NOTI";

export const addNoti = (data) => async (dispatch) => {
  const uid = data.uid;
  const msg = data.msg;
  await axios.post(
    `https://shwe-htee-laundry-default-rtdb.asia-southeast1.firebasedatabase.app/notis/${uid}.json`,
    msg
  );
  dispatch({
    type: ADD_NOTI,
    msg,
  });
};

export const fetchNotis = () => async (dispatch, getState) => {
  const { uid } = getState().auth;
  const res = await axios.get(
    `https://shwe-htee-laundry-default-rtdb.asia-southeast1.firebasedatabase.app/notis/${uid}.json`
  );
  const data = res.data;
  dispatch({
    type: FETCH_NOTI,
    data,
  });
};
