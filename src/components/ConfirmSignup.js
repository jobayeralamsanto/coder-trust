import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../services/auth.service';
toast.configure();


function ConfirmSignup() {
    const [message, setMessage] = useState('');
    
    useEffect( () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        console.log(urlParams);
    
        const userId = urlParams.get('userid');
        const code = urlParams.get('code');
        const email = urlParams.get('email');
        const phone = urlParams.get('phone');
        const medium = phone === undefined ? 'email': 'phone';
    
        // console.log(email, userId, code)

        AuthService.confirmSignup(medium, email, phone,code)
        .then(data => {
            toast.success(data.data.message, { 
                position:toast.POSITION.TOP_RIGHT, 
                autoClose: 1500
            });
        })
        .catch(err => {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT, 
                autoClose: 1500
            });
        })

    })


    return (
        <div>
            <div className="jumbotron">
                <h2 className="display-4"></h2>
                <p className="lead">SignUp Success</p>
                <hr className="my-4" />
            </div>
        </div>
    )
}

export default ConfirmSignup
