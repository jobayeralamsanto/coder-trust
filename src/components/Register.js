import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
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

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const history = useHistory();

  const [name, setName] = useState("");
  const [medium, setMedium] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const professions = ["email", "phone"];
  const [myProfession, setMyProfession] = useState("");

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

   const onChangeMedium = (e) => {
    const medium = e.target.value;
    setMedium(medium);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

   const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

   const onChangeRole = (e) => {
    const role = e.target.value;
    setRole(role);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(name,medium, email,phone, password,role).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          history.push({pathname:'confirmcode', state:{medium, email, phone}})
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
      <h1>Register</h1>
       
        <h3>Signup with </h3>
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

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                  validations={[required, vname]}
                />
              </div>

              
              <div className="form-group">
                <label htmlFor="medium">medium</label>
                <Input
                  type="text"
                  className="form-control"
                  name="medium"
                  value={medium}
                  onChange={onChangeMedium}
                  validations={[required]}
                />
              </div>

             
         {
          myProfession === "email" && (
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>
              )}
              
         {
          myProfession === "phone" && (
               <div className="form-group">
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

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

               <div className="form-group">
                <label htmlFor="role">Role</label>
                <Input
                  type="text"
                  className="form-control"
                  name="role"
                  value={role}
                  onChange={onChangeRole}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

              <div className="form-group">
                <CButton className="px-0">
                <Link to="/login">
                Back Login
                </Link>
                </CButton>
              </div>

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
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

export default Register;
   

   