import {
  ADD_ORDER,
  FETCH_ORDER_HISTORIES,
  DEL_ORDER,
} from "../../actions/service/order";

const initState = {
  orderHistories: [],
  cartItems: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_ORDER: {
      return {
        orderHistories: state.orderHistories.unshift(action.data),
        ...state,
      };
    }
    case FETCH_ORDER_HISTORIES: {
      return {
        ...state,
        orderHistories: action.data,
      };
    }
    case DEL_ORDER: {
      delete state.orderHistories[action.orderId];
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
