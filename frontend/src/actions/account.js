import {
    ACCOUNT_DETAIL_SUCCESS,
    ACCOUNT_DETAIL_FAIL,
    ACCOUNT_DETAIL_REQUEST,
    ACCOUNT_UPDATE_REQUEST,
    ACCOUNT_UPDATE_SUCCESS,
    ACCOUNT_UPDATE_FAIL,
    ACCOUNT_COURSE_DETAIL_REQUEST,
    ACCOUNT_COURSE_DETAIL_SUCCESS,
    ACCOUNT_COURSE_DETAIL_FAIL
  } from "../constants/types";
import axios from 'axios'

export const accountDetail = () => async dispatch =>{
    if (localStorage.getItem("access")){
        const config = {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `JWT ${localStorage.getItem("access")}`,
                "Accept": 'application/json',
            }
        };
        dispatch({
            type: ACCOUNT_DETAIL_REQUEST
        })
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}accounts/profile/`, config);
            console.log("account",res.data)
            dispatch({
                type: ACCOUNT_DETAIL_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: ACCOUNT_DETAIL_FAIL,
                payload: error.response.data
            })
        }
    }
}

export const accountCourseDetail = () => async dispatch =>{
    if (localStorage.getItem("access")){
        const config = {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `JWT ${localStorage.getItem("access")}`,
                "Accept": 'application/json',
            }  
        }; 
        dispatch({
            type: ACCOUNT_COURSE_DETAIL_REQUEST
        })
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}courses/profile/`, config);
            console.log("course",res.data)
            dispatch({
                type: ACCOUNT_COURSE_DETAIL_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: ACCOUNT_COURSE_DETAIL_FAIL,
                payload: error.response.data
            })
        }
    }
    else{
        dispatch({
            type: ACCOUNT_COURSE_DETAIL_FAIL,
        })
    }
}

export const accountSelfDetail = () => async dispatch => {
    if (localStorage.getItem("access")){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `JWT ${localStorage.getItem("access")}`,
            }
        };
        try {
            const detail = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_URL}accounts/profile/`,config)
            dispatch({
                type:ACCOUNT_DETAIL_SUCCESS,
                payload: detail.data
            })
        } catch (error) {
            dispatch({
                type: ACCOUNT_DETAIL_FAIL,
                payload: error.response.data.detail
            })
        }
    }
    else{
        dispatch({
            type: ACCOUNT_DETAIL_FAIL,
        })
    }
}


export const accountUpdate = (profile,picture) => async dispatch =>{
    if (localStorage.getItem("access")){
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `JWT ${localStorage.getItem("access")}`,
            }
        };
        try {
            const res = await axios.put(`${process.env.REACT_APP_BASE_BACKEND_URL}accounts/profile/`,{...profile,picture: picture}, config);
            console.log(res.data)
            dispatch({
                type: ACCOUNT_UPDATE_SUCCESS,
                payload: res.data
            })
            
        } catch (error) {
            dispatch({
                type: ACCOUNT_UPDATE_FAIL,
                payload: error
            })
        }
    }
    else{
        dispatch({
            type: ACCOUNT_UPDATE_FAIL,
        })
    }
}


