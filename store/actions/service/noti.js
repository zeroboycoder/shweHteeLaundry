import axios from "axios";

export const ADD_NOTI = "ADD_NOTI";
export const UPDATE_NOTI = "UPDATE_NOTI";
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
    newNoti: msg,
  });
};

export const updateNoti = (uid, notiId) => async (dispatch) => {
  await axios.patch(
    `https://shwe-htee-laundry-default-rtdb.asia-southeast1.firebasedatabase.app/notis/${uid}/${notiId}.json`,
    { touched: true }
  );
  dispatch({
    type: UPDATE_NOTI,
    notiId,
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
