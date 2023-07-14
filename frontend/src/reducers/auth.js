import {LOGIN_SUCCESS,LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,LOGOUT,SIGNUP_FAIL,SIGNUP_SUCCESS,
    ACTIVATION_SUCCESS,ACTIVATION_FAIL,FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAIL,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_FAIL,
    RESEND_ACTIVATION_FAIL,RESEND_ACTIVATION_SUCCESS, GOOGLE_AUTH_SUCCESS, GOOGLE_AUTH_FAIL

} from '../constants/types'


const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    user: null,
    isError: null,
};


const authReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem("access", payload.access);
            return{
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case GOOGLE_AUTH_SUCCESS:
            localStorage.setItem('access', payload.access);
            // localStorage.setItem('isAuthenticated', true)
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        
        case RESEND_ACTIVATION_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
        case FORGET_PASSWORD_SUCCESS:
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            }
        case ACTIVATION_SUCCESS:
        case USER_LOADED_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
                user: payload
        }
        case RESEND_ACTIVATION_FAIL:
        case RESET_PASSWORD_FAIL:
        case FORGET_PASSWORD_FAIL:
        case SIGNUP_FAIL:
        case AUTHENTICATED_FAIL:
        case ACTIVATION_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                isError: payload,
            }
        case USER_LOADED_FAIL:
            return{
                ...state,
                user: null,
            }
        case GOOGLE_AUTH_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            return{
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                isError: payload,
            }
        case LOGOUT:
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            return{
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
            }
        default:
            return state;
    }
};

export default authReducer;