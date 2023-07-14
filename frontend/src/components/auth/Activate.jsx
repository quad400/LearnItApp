import React from 'react'
import { connect } from 'react-redux';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import { activate } from '../../actions/auth';
import Message from '../../containers/Message';


const Activate = ({activate, isError}) => {

    const params = useParams();
    const navigate = useNavigate();

    const uid = params.uid
    const token = params.token

    
    const handleVerify = async (e)=>{
        e.preventDefault();
        activate(uid,token);
        navigate("/login");
    }


  return (
    <div className="auth__container">
        <div className="verify__container">
            <div className="verify__wrapper">
                {isError &&
                    <Message 
                        message={isError}
                        type="error"
                    />
                }
                <h2>Activate your account</h2>
                <div className="verify__button">
                    <button onClick={handleVerify}>Verify</button>
                </div>
            </div>
            <div className="verify__resend">
                <Link to='/resend/activation' replace={true} className="link">
                    Resend Email
                </Link>
            </div>

        </div>
    </div>
  )
}

const mapStateToProps = state => ({
    isError: state.auth.isError,
})


export default connect(mapStateToProps,{activate})(Activate)