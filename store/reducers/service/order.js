import { ADD_ORDER, FETCH_ORDER_HISTORIES } from "../../actions/service/order";

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
    default:
      return state;
  }
};
