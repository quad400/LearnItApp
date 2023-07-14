import { ADD_TO_CART, LOAD_CART, CART_START, CART_SUCCESS, CART_FAIL, LOAD_ORDER_SUCCESS, LOAD_ORDER_FAIL } from "../constants/types";

export const addtocartReducer = (
  state = {
    data: {},
    carts: [],
    cartNumber: 0
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      let cart = {
        title: state.data.course.title,
        thumbnail: state.data.course.thumbnail,
        price: state.data.course.price,
      }
      state.carts.push(cart)
      return {
        ...state,
        cartNumber: state.cartNumber + 1
      };
    default: 
      return state;
  }
};

export const loadCartReducer = (
  state = {
    loading: true,
    data: {items: [],total_item: 0 }
  },
  action
) => {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    default: 
      return state;
  }
};

export const loadOrderReducer = (
  state = {
    loading: true,
    data: {cart: [], },
    error: null
  },
  action
) => {
  switch (action.type) {
    case LOAD_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case LOAD_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default: 
      return state;
  }
};


const initialState = {
  shoppingCart: null,
  error: null,
  loading: false
};


export const cartAddReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_START:
      return {
        ...state,
        loading: true,
      };
    case CART_SUCCESS:
      return {
        ...state,
        loading: false,
        shoppingCart: action.payload
      };
    case CART_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
