import React, {useState} from "react";
import {Link} from "react-router-dom"
import {Alert} from 'react-bootstrap'
import { signup } from "../../actions/auth";
import "./Auth.css";
import { connect } from "react-redux";
import Message from "../../containers/Message";
import axios from "axios";

const Signup = ({signup,isError}) => {

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
    });
    
    const handleChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleGoogelSignUp = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=http://localhost:3000`)
            window.location.replace(res.data.authorization_url)
        } catch (err){

        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const {email,fullname,password} = form

        signup(email,fullname,password);
    }

    return (
            <div className="auth__container">
                <div className="auth__wrapper">
                    <div className="auth__text">
                        <h2>
                            Create an account
                        </h2>
                        <p>Lets get started by creating an account</p>
                    </div>
                    {isError && <Message className="alert_error" message={isError} type='error' />}

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
                        <div className="auth__form__container">
                        <input
                            className="auth__form__control"
                            onChange={handleChange}
                            required
                            placeholder="Full Name"
                            type="text"
                            name="fullname"
                        />
                        </div>
                        <div className="auth__form__container">
                        <input
                            className="auth__form__control"
                            onChange={handleChange}
                            required
                            placeholder="Password"
                            type="password"
                            name="password"
                        />
                        </div>
                        <div className="auth__submit">
                            <button data-target="#exampleModalCenter">
                                SignUp
                            </button>
                        </div>
                    </form>
                    </div>

                    <div className="auth__account">
                        <div className="auth__account__text">
                            <p>Already have an account</p>
                        </div>
                        <Link className="auth__link" to='/login'>Login</Link>
                    </div>
            </div> 
        </div>
    );
};

const mapStateToProps = state => ({
    isError: state.auth.isError,
})

export default connect(mapStateToProps,{signup})(Signup);
