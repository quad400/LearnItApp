import { combineReducers } from 'redux'

import authReducer from './auth'
import courseReducer from './course'
import { categoryCreateReducer, categoryListReducer, courseDetailReducer, 
        courseFilterIdReducer, 
        courseFilterReducer, 
        courseListReducer, courseRemoveReducer, courseUpdateReducer, 
        courseUserReducer, 
        requirementCreateReducer, 
        syllabusCreateReducer,
        syllabusListReducer,
        syllabusRemoveReducer,
        topicCreateReducer,
        topicDetailReducer,
        topicListReducer,
        topicRemoveReducer,
        topicUpdateReducer} from './courseReducers'
import { accountDetailReducer, 
        accountCourseDetailReducer,
        accountUpdateReducer,
        accountSelfDetailReducer } from './accountReducer'
import { searchReducer } from './searchReducer'
import { addtocartReducer, cartAddReducer, loadCartReducer, loadOrderReducer } from './cartReducer'


export default combineReducers({
    auth:authReducer,
    
    course: courseReducer,
    courseList: courseListReducer,
    courseUsers: courseUserReducer,
    courseDetails: courseDetailReducer,
    courseFilters: courseFilterReducer,
    courseFiltersId: courseFilterIdReducer,
    courseUpdates: courseUpdateReducer,
    courseRemoves: courseRemoveReducer,
    
    syllabusCreate: syllabusCreateReducer,
    syllabusList: syllabusListReducer,
    syllabusRemoves: syllabusRemoveReducer,

    
    topicList: topicListReducer,
    topicCreate: topicCreateReducer,
    topicDetails: topicDetailReducer,
    topicUpdates: topicUpdateReducer,
    topicRemoves: topicRemoveReducer,
    
    categoryCreate: categoryCreateReducer,
    categoryList: categoryListReducer,
    requirementCreate: requirementCreateReducer,


    accountDetails: accountDetailReducer,
    accountCourseDetails: accountCourseDetailReducer,
    accountSelfDetails: accountSelfDetailReducer,
    accountUpdates: accountUpdateReducer,
    
    searchList: searchReducer,
    
    addToCarts: addtocartReducer,
    loadCarts: loadCartReducer,
    loadOrders: loadOrderReducer,
    carts: cartAddReducer,
})