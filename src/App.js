import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PrivateRoute from "./commons/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import jwt from "jsonwebtoken";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authAction";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  try {
    const decoded = jwt.verify(
      localStorage.jwtToken.split(" ")[1],
      process.env.REACT_APP_PRIVATE_KEY
    );
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "/login";
    }
  } catch (error) {
    // localStorage.removeItem("jwtToken");
    // window.location.href = "/login";
  }
}
const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute component={Dashboard} path="/" exact />
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
