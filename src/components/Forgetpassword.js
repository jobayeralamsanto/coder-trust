import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default class forgetpassword extends Component {
    constructor(props) {
        super(props);
        this.state = { phone: "", errors: {} };
        this.state = { medium: "", errors: {} };
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput = e => {
        // e.preventDefault();
        console.log(e.target.value);
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }
    handleForm = e => {
        e.preventDefault();
        if (this.state.phone === '') {
            NotificationManager.warning("Email is Required");
            return false;
        }
        if (this.state.medium === '') {
            NotificationManager.warning("Medium is Required");
            return false;
        }
        const data = { phone: this.state.phone , medium: this.state.medium };
        
        axios
            .post("https://wu89z93mp4.execute-api.us-west-2.amazonaws.com/dev/authentication/forgot-password", data)
            .then(result => {
                NotificationManager.success("Password Reset link sent to your email .Please check the your email.Link Will be Valid For 30 min");
            })
            .catch(err => {
                  if (err.response && err.response.status === 404)
                    NotificationManager.error(err.response.data.msg);
                  else
                    NotificationManager.error("Something Went Wrong");
                  this.setState({ errors: err.response })
            });

    }
    render() {
        return (
            <div className="content">
                <NotificationContainer />
                <form onSubmit={this.handleForm}>
                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-8">
                            <div className="card">
                                <div className="card-header text-center">Forgot password</div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label >Enter phone number</label>
                                        <input type="text" name="phone" value={this.state.phone} onChange={this.handleInput} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label >Medium</label>
                                        <input type="text" name="medium" value={this.state.medium} onChange={this.handleInput} className="form-control" />
                                    </div>
                                </div>
                                <input type="button" value="send Mail" onClick={this.handleForm} className="btn btn-primary" />
                            </div>
                            <div>
                            <Link to="/login">
                            <input type="button" value="Back to login"  className="btn btn-primary" />
                            </Link>
                            </div>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </form>
            </div>
        )
    }
}
