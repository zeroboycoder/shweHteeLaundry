export const FETCH_ITEMS = "FETCH_ITEMS";
export const FETCH_NUMBER_OF_ITEMS = "FETCH_NUMBER_OF_ITEMS";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const onFetchItems = () => (dispatch) => {
  dispatch({
    type: FETCH_ITEMS,
  });
};

export const onFetchItemsNum = (datas) => (dispatch) => {
  dispatch({
    type: FETCH_NUMBER_OF_ITEMS,
    datas,
  });
};

export const onAddToCart = (index, price) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    index,
    price,
  });
};

export const onRemoveFromCart = (index, price) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    index,
    price,
  });
};
