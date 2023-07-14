import { CATEGORY_LOADED_SUCCESS,
    CATEGORY_LOADED_FAIL,COURSES_LOADED_SUCCESS,COURSES_LOADED_FAIL
    ,COURSE_DETAIL_SUCCESS,COURSE_DETAIL_FAIL, COURSE_CREATED_SUCCESS,
     COURSE_CREATED_FAIL
        } from "../constants/types";


const initialState = {
    category: [],
    isError: null,
    user: null,
    loading: true,
    courses: [],
    course: null,
    success: false,
}

const courseReducer = (state=initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case CATEGORY_LOADED_SUCCESS:
            return {
                ...state,
                loading: false,
                category: payload
            }
        case CATEGORY_LOADED_FAIL:
            return {
                ...state,
                loading: false,
                isError: payload,
            }
        case COURSES_LOADED_SUCCESS:
            return {
                ...state,
                loading: false,
                courses: payload
            }
        case COURSES_LOADED_FAIL:
            return {
                ...state,
                courses: null,
                loading: false,
                isError: payload
            }
        case COURSE_DETAIL_SUCCESS:
            return {
                ...state,
                course: payload,
                loading: false,
                isError: null,
            }
        case COURSE_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                isError: payload,
            }
        case COURSE_CREATED_SUCCESS:
            return {
                ...state,               
                loading: false, 
                success: true
            }
        case COURSE_CREATED_FAIL:
            return {
                ...state,
                loading: false,
                isError: payload,
            }
        default:
            return state;
    }
};

export default courseReducer;