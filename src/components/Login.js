import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'

import AuthService from "../services/auth.service";


 
   
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [medium, setMedium] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const professions = ["email", "phone"];
  const [myProfession, setMyProfession] = useState("");

  
  console.log(myProfession);
  const onChangeMedium = (e) => {
    const medium = e.target.value;
    setMedium(medium);
  };

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };


  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(myProfession, phone, email, password).then(
        () => {
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

 

  

  return (
    <div className="col-md-12">
      <div className="card card-container">
      <h1>Login</h1>
        <CRow>
                  <CCol xs="12" sm="6">

                    <a href="https://ct-test-auth-stack-dev.auth.us-west-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=http://localhost:4200/dashboard/&response_type=TOKEN&client_id=5n8dl6kq08gt38phmj3sfgl9cc&scope=email openid profile">Login with Google</a>


                  </CCol>

                  <CCol xs="12" sm="6">

                  <a href="https://ct-test-auth-stack-dev.auth.us-west-2.amazoncognito.com/oauth2/authorize?identity_provider=Facebook&redirect_uri=http://localhost:4200/dashboard/&response_type=TOKEN&client_id=5n8dl6kq08gt38phmj3sfgl9cc">Login with facebook</a>
                  </CCol>
                </CRow>
                <hr/>
                
                <h3>Signin with </h3>
                
               <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                    >
                        {professions.map(profession => (
                            <button
                                type="button"
                                name="medium"
                                value={medium}
                                onChange={onChangeMedium}
                                key={profession}
                                className={"btn btn-light border-dark "}
                                onClick={() => setMyProfession(profession)}
                            >
                                {profession.toLocaleUpperCase()}
                            </button>
                        ))}
                    </div>
                 

        <Form  onSubmit={handleLogin} ref={form}>
         
         {
          myProfession === "phone" && (
          <div  className="form-group">
            <label htmlFor="phone">Phone</label>
            <Input
              type="text"
              className="form-control"
              name="phone"
              value={phone}
              onChange={onChangePhone}
             
            />
          </div>
          )}
      {
        myProfession === "email" && (
           <div className="form-group" >
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required]}
            />
          </div>
          )
        }
        
           <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
          <CRow>
          <CCol xs="6">
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
         </CCol>
          <CCol xs="6" className="text-right" disabled={loading}>
                        <button className="btn btn-primary btn-block" >
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/forgetpassword">
                          Forget Password?
                       </Link>
                          </button>
                      </CCol>
                    </CRow>
                    <hr/>
                   

                <CRow>
                <CCol>
                <p>signup your account</p>
                </CCol>
                <CCol>
                <button className="btn btn-primary btn-block">
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/register">
                          signup </Link>
                          </button>
                </CCol>
                </CRow>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;




