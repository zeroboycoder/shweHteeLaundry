import { ADD_NOTI, FETCH_NOTI } from "../../actions/service/noti";

const initState = {
  notis: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_NOTI: {
    }
    case FETCH_NOTI:
      return {
        ...state,
        notis: action.data,
      };
    default:
      state;
  }
};
