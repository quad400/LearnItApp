import axios from "axios";
import { CART_START, CART_SUCCESS, LOAD_CART,CART_FAIL, LOAD_ORDER_SUCCESS, LOAD_ORDER_FAIL } from "../constants/types";


export const fetchCart = () => async dispatch => {
    dispatch( {
    type: CART_START
});
    if (localStorage.getItem("access") != null){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${localStorage.getItem("access")}`,
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}order/cart/`, config);
            console.log(res.data)
            dispatch({
                type: CART_SUCCESS,
                payload: res.data
            })
            localStorage.setItem("cartItems", JSON.stringify(res.data))
        } catch (error) {
            dispatch({
                type: CART_FAIL,
                error: error
            });
        }
    } else{
        console.log(" Authentication is required")
    }
  };

export const fetchOrder = () => async dispatch => {
    if (localStorage.getItem("access")){
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `JWT ${localStorage.getItem("access")}`,
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}order/`, config);
            console.log(res.data)
            dispatch({
                type: LOAD_ORDER_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: LOAD_ORDER_FAIL,
                error: error
            });
        }
    } else{
        console.log(" Authentication is required")
    }
  };
