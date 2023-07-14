import React, {useEffect} from 'react'
import { checkAuthenticated, load_user } from '../actions/auth'
import { accountSelfDetail } from '../actions/account'
import { courseDetail } from '../actions/course'
import { connect } from 'react-redux'
import CourseProfileTabs from '../components/course/CourseProfileTabs'

const UpdateCourseLayout = (props) => {
    useEffect(() => {
		props.checkAuthenticated();
		props.load_user();
		props.accountSelfDetail()
        props.courseDetail()
    
	  
	},[props])
    return (
    <div>
        <CourseProfileTabs />
        {props.children}
    </div>
  )
}

export default connect(null, {courseDetail,checkAuthenticated, load_user,accountSelfDetail})(UpdateCourseLayout)
