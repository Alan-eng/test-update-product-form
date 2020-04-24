import * as productsActions from '../actions/products';

export function products(state = [], action) {
  switch (action.type) {
    case productsActions.RECEIVE_PRODUCTS:
      if (state.length === 0) {
        return [
          ...action.products,
        ];
      } return state
    case productsActions.ADD_PRODUCT:
      return [
        ...state,
        action.product,
      ];
    case productsActions.DELETE_PRODUCT:
      const productIndex = state.findIndex(product => product.id === action.id);
      return [
        ...state.slice(0, productIndex),
        ...state.slice(productIndex + 1)
      ];
    case productsActions.UPDATE_PRODUCT:
      const index = state.findIndex(product => product.id === action.product.id);
      return [
        ...state.slice(0, index),
        action.product,
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
}
