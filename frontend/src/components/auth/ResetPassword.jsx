import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Alert} from 'react-bootstrap'
import {useParams,Navigate, useNavigate } from 'react-router-dom';
import { reset_password } from '../../actions/auth'
import Message from '../../containers/Message';


const ResetPassword = ({reset_password,isError}) => {
    
    const params = useParams();
    const navigate = useNavigate()

    const uid = params.uid
    const token = params.token

    const [form, setForm] = useState({
        new_password: "",
        re_new_password: "",
    }); 

    const {new_password,re_new_password} = form;

    const handleChange = async (e)=>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        reset_password(uid,token,new_password,re_new_password);
        if (!isError) {
            navigate('/login')
        }
    }
      
    // useEffect(()=> {
    // }, [isError])

    return (
            <div className="auth__container">
                <div className="auth__wrapper">
                    <div className="auth__text">
                        <h2>
                           Reset password
                        </h2>
                        <p>Your new password must be different from previous used password.</p>
                    </div>
                    {isError &&                     
                    <Message 
                        message={isError}
                        type="error"
                    />}

                    <div className="auth__form">
                    <form onSubmit={handleSubmit}>
                    <div className="auth__form__container">
                        <input
                            className="auth__form__control"
                            onChange={handleChange}
                            required
                            placeholder="Password"
                            type="password"
                            name="new_password"
                        />
                        </div>
                        <div className="auth__form__container">
                        <input
                            className="auth__form__control"
                            onChange={handleChange}
                            required
                            placeholder="Confirm Password"
                            type="password"
                            name="re_new_password"
                        />
                        </div>
                        <div className="auth__submit">
                            <button data-target="#exampleModalCenter">
                                Reset Password
                            </button>
                        </div>
                    </form>
                  </div>
            </div> 
        </div>
    );
}

const mapStateToProps = state => ({
    isError: state.auth.isError,
})

export default connect(mapStateToProps, {reset_password})(ResetPassword);