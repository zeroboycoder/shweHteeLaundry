import {
  FETCH_NUMBER_OF_ITEMS,
  FETCH_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../../actions/service/item";

import { categoriesDatas } from "../../../data/dummyDatas";
import { itemsDummyDatas } from "../../../data/itemsDummyDatas";

const initState = {
  currentItems: [],
  numberOfItemsInCategory: [],
  totalQty: 0,
  totalPrice: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_NUMBER_OF_ITEMS: {
      return {
        ...state,
        numberOfItemsInCategory: categoriesDatas,
      };
    }
    case FETCH_ITEMS: {
      return {
        ...state,
        currentItems: itemsDummyDatas,
      };
    }
    case ADD_TO_CART: {
      // Increase the currentItem's quentity
      const updateCurrentItems = [...state.currentItems];
      updateCurrentItems[action.index].qty++;
      updateCurrentItems[action.index].totalPrcOfItem =
        updateCurrentItems[action.index].qty * action.price;
      // Increase the item number in category
      const updateNumOfItemsInCate = { ...state.numberOfItemsInCategory };
      updateNumOfItemsInCate[updateCurrentItems[action.index].cid]
        .numberOfItem++;
      return {
        ...state,
        currentItems: updateCurrentItems,
        numberOfItemsInCategory: updateNumOfItemsInCate,
        totalQty: state.totalQty + 1,
        totalPrice: state.totalPrice + action.price,
      };
    }
    case REMOVE_FROM_CART: {
      // Reduce the currentItem's quentity
      const updateCurrentItems = [...state.currentItems];
      updateCurrentItems[action.index].qty--;
      updateCurrentItems[action.index].totalPrcOfItem =
        updateCurrentItems[action.index].qty * action.price;
      // Reduce the item number in category
      const updateNumOfItemsInCate = { ...state.numberOfItemsInCategory };
      updateNumOfItemsInCate[updateCurrentItems[action.index].cid]
        .numberOfItem--;
      return {
        ...state,
        currentItems: updateCurrentItems,
        numberOfItemsInCategory: updateNumOfItemsInCate,
        totalQty: state.totalQty - 1,
        totalPrice: state.totalPrice - action.price,
      };
    }
    default:
      return state;
  }
};
