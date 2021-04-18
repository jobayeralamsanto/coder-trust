import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../services/auth.service';
import { useHistory } from 'react-router-dom';
toast.configure();

function ConfirmationCode({state}) {
    const [ second, setSecond ] = useState(10);
    const [ code, setCode ] = useState();
    const history = useHistory();
    const { medium, email, phone } = history.location.state;
    // console.log(medium);

    useEffect( () => {
        if(second > 0) {
            setTimeout(() => setSecond(second - 1), 1000);
        }
    }, [second])


    useEffect(() => {
        AuthService.confirmationCodeValidity(medium, email, phone)
        .then(data => {
            toast.success(data.data.message, {
                position: toast.POSITION.TOP_RIGHT, 
                autoClose: 3000
            });
        })
        .catch(err => {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT, 
                autoClose: 3000
            });
            if (err.response.data.message === 'Confirmation code has expired!'){
                setSecond(0);
            }
        });
    }, []);

    const codeResend = () => {
        AuthService.resendConfirmationCode(medium, email, phone)
        .then(data => {
            setSecond(10);
            toast.success(data.data.message, {
                position: toast.POSITION.TOP_RIGHT, 
                autoClose: 3000
            });
        })
        .catch(err => {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT, 
                autoClose: 3000
            })
        });
    };

    const codeSubmit = () => {
        
        AuthService.confirmSignup(medium, email, phone, code)
        .then(data => {
            toast.success(data.data.message, { 
                position:toast.POSITION.TOP_RIGHT, 
                autoClose: 3000
            });
            if (data.data.code === 'SIGNUP_CONFIRMED'){
                history.push({pathname:'login'})
            }
        })
        .catch(err => {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT, 
                autoClose: 3000
            });
        })
    }

    return (
        <div>
            <div className="jumbotron">
                <h2 className="display-4">Please check your device</h2>
                <p className="lead">A confirmation link sent to your {medium}</p>
                <hr className="my-4" />
                {medium === 'phone' ? <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Code Sent to you</span>
                    </div>
                    <input onChange={ (e) => 
                        {
                            var reg = new RegExp('^[0-9]+$');
                            var is_number = reg.test(e.target.value);
                            console.log(is_number, code);
                            if(is_number || e.target.value.length === 0){
                                setCode(e.target.value)
                            }
                        }} value={code} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </div> : null}
                <div className="row">
                    <div className="col d-flex justify-content-start">
                        <button disabled={second} onClick={codeResend} className="btn btn-primary lead">Resend {medium == 'email' ? 'link': 'code'}  {second > 0? `in ${second}`: null}</button>
                    </div>
                    {medium === 'phone' ? <div className="col d-flex justify-content-end">
                        <button onClick={codeSubmit} className="btn btn-primary lead">Submit Code</button>
                    </div> : null}
                </div>
            </div>
        </div>
    )
}

export default ConfirmationCode
