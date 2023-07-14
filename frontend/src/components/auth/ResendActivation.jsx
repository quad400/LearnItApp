import React,{useState} from 'react'
import {connect} from 'react-redux'
import {Alert} from 'react-bootstrap'
import { resend_activation } from '../../actions/auth'


const ResendActivation = ({resend_activation,isError}) => {

    const [form, setForm] = useState({
        email: "",
    });    
    const {email} = form;

    const handleChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        resend_activation(email);
    }

    return (
            <div className="auth__container">
                <div className="auth__wrapper">
                    <div className="auth__text">
                        <h2>
                            Resend Verification Email
                        </h2>
                        <p>Enter the email associated with your account and we'll send an email with instruction to activate your account.</p>
                    </div>
                    {isError && <Alert variant='danger'>{isError}</Alert>}

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

const mapStateToProps = state => ({
    isError: state.auth.isError,
})

export default connect(mapStateToProps, {resend_activation})(ResendActivation);