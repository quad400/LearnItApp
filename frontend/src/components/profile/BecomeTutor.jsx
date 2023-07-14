import React from 'react'
import {Link} from 'react-router-dom'

const BecomeTutor = () => {
  return (
    <div>
        <div className='tutor_box'>
            <h6>Jump Into Course Creation</h6>

            <div className="auth__submit update_btn">
                <Link className='button_link' to="/course/create">
                        Create Your Course
                </Link>
            </div>

        </div>
        <div className='tutor_resourse'>
            <p>Based on your experience, we think these resources will be helpful.</p>

            <div className="tutor_response_conta">
                <div className="display_image">
                    <img src={require('../../assets/img1.png')} alt="my_image" />
                </div>
                <div>
                    <h5>Create an Engaging Course</h5>
                    <small>
                    Wheather you'av been teaching for years or are 
                    teaching for the first time, you can make an Engaging course.
                    We'av compiled resources and best practice to help you h=get to the next level,
                    no matter where you are starting
                    
                    </small>
                    <div>
                        <Link className='get_started' to='/'>Get Started</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BecomeTutor