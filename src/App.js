import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NoteList from "./NoteList";
import NoteDetail from "./NoteDetail";
import AddEditNote from "./AddEditNote";

import { useSelector, useDispatch } from "react-redux";
import { registerUser, loginUser, logoutUser } from "./actions/auth_actions";

const Registration = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(registerUser(userData));
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(loginUser(userData));
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Notes App
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Notes List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                Add Note
              </Link>
            </li>

            <li className="  nav-item ">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li className="  nav-item ">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="  nav-item ">
              <Link to="/logout" className="nav-link">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route exact path="/">
          <NoteList />
        </Route>
        <Route path="/register">
          <Registration />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>

        <Route path="/note/:id">
          <NoteDetail />
        </Route>
        <Route path="/add">
          <AddEditNote />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
