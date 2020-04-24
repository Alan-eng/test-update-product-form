import { productApi } from '../gateways/ProductApi';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

const requestProducts = () => ({
  type: REQUEST_PRODUCTS,
});

const receiveProducts = (json) => ({
  type: RECEIVE_PRODUCTS,
  products: json.map(product => product),
});

export const fetchProducts = () => dispatch => {
  dispatch(requestProducts());
  const json = productApi.getProducts();
  dispatch(receiveProducts(json));
};

export const addProduct = (obj) => ({
  type: ADD_PRODUCT,
  product: obj,
});

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  id: id,
});

export const updateProduct = (obj) => ({
  type: UPDATE_PRODUCT,
  product: obj,
});
