import { ADD_NOTI, UPDATE_NOTI, FETCH_NOTI } from "../../actions/service/noti";

const initState = {
  notis: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_NOTI: {
    }
    case UPDATE_NOTI: {
      const updateNotis = { ...state.notis };
      updateNotis[action.notiId].touched = true;
      return {
        ...state,
        notis: updateNotis,
      };
    }
    case FETCH_NOTI:
      return {
        ...state,
        notis: action.data,
      };
    default:
      return state;
  }
};
