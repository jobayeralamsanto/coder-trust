import React, {useState, useEffect} from 'react';
import { useHistory, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../services/auth.service';
toast.configure();


const useStyles = makeStyles( (theme) => {
    return createStyles({
        bar: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2)
            }
        }
    })
})


function ConfirmSignup() {
    const [message, setMessage] = useState('');
    const [req, setReq] = useState(false);
    const history = useHistory();
    
    useEffect( () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        console.log(urlParams);
    
        const userId = urlParams.get('userid');
        const code = urlParams.get('code');
        const email = urlParams.get('email');
        const phone = '';
        const medium = 'email';
    
        console.log(email, userId, code)

        AuthService.confirmSignup(medium, email, phone,code)
        .then(data => {
            setReq(true);
            setMessage(`Confirmation Error:\n \t ${data.data.message}`);
            toast.success(data.data.message, { 
                position:toast.POSITION.TOP_RIGHT, 
                autoClose: 3000
            });
            if (data.data.code === 'SIGNUP_CONFIRMED'){
                history.push({pathname:'login'})
            }
            console.log(data.data);
        })
        .catch(err => {
            setReq(true);
            setMessage(`Confirmation Error:\n \t ${err.response.data.message}`);
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT, 
                autoClose: 3000
            });
            console.log(err.data);
        })
    })

    const cls = useStyles();
    return (
        <div>
            <div className="jumbotron">
                <h2 className="display-4">Confirmation Response</h2>
                {
                    !req ? <div className={cls.bar}>
                    <LinearProgress />
                </div> : <div>
                        <hr className="my-4" />
                        <p className="lead">{message}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default ConfirmSignup;
