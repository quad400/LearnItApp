import React,{useState} from 'react'
import {connect} from 'react-redux'
import { forget_password } from '../../actions/auth'


const ForgetPassword = ({forget_password}) => {

    const [form, setForm] = useState({
        email: "",
    });    
    const {email} = form;

    const handleChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        forget_password(email);
    }

    return (
            <div className="auth__container">
                <div className="auth__wrapper">
                    <div className="auth__text">
                        <h2>
                            Forget Password
                        </h2>
                        <p>Enter the email associated with your account and we'll send an email with instruction to reset your password.</p>
                    </div>
                    <div className="auth__form">
                    <form onSubmit={handleSubmit}>
                        <div className="auth__form__container">
                        <input
                            className="auth__form__control"
                            onChange={handleChange}
                            required
                            placeholder="Email"
                            type="email"
                            name="email"
                        />
                        </div>
                        <div className="auth__submit">
                            <button data-target="#exampleModalCenter">
                                Send Instructions
                            </button>
                        </div>
                    </form>
                  </div>
            </div> 
        </div>
    );
}

export default connect(null, {forget_password})(ForgetPassword);