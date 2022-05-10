import {
  ADD_ORDER,
  FETCH_ORDER_HISTORIES,
  UPDATE_ORDER,
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
    case UPDATE_ORDER: {
      const updateOrder = state.orderHistories[action.orderId];
      updateOrder["paymentConfirmed"] = true;
      updateOrder["status"] = action.status;
      return {
        ...state,
        orderHistories: [...updateOrder],
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
