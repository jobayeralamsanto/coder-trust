import React, { useState, useEffect } from "react";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Welcome from "./components/Welcome";
import Forgetpassword from "./components/Forgetpassword";
import ConfirmationCode from "./components/ConfirmationCode";
import ConfirmSignup from "./components/ConfirmSignup";
import Dashboard from "./components/Dashboard";
import { brown } from "@material-ui/core/colors";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    
      <div className="container mt-3">
        <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={["/", "/login"]} component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/forgetpassword" component={Forgetpassword} />
          {/* <Route exact path={["/profile", ]} component={Profile} /> */}
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/confirm/:confirmationCode" component={Welcome} />
          <Route path="/confirmcode" component={ConfirmationCode} />
          <Route path="/profile" component={ConfirmSignup} />
        </Switch>
        </React.Suspense>
        </BrowserRouter>
      </div>
    
  );
};

export default App;
