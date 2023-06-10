// LoginScreen.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginRequest } from '../redux/actions';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const todos = useSelector((state) => state.todos);
  const history = useHistory();

  console.log('todos', todos)

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginRequest(username, password));
  };

  // Redirect to the dashboard screen if the user is logged in
  useSelector((state) => {
    if (state.user) {
      history.push('/dashboard');
    }
  });

  return (
    <section class="vh-100">
      <div class="container-fluid h-custom  pt-5">
        <div class="row d-flex justify-content-center align-items-center h-100 mt-5">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid"
              alt="Sample image" />
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form  onSubmit={handleLogin}>
              {error && <p className="text-danger">{error}</p>}
              <div class="form-outline mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label class="form-label" for="form3Example3">User Name</label>
              </div>
              <div class="form-outline mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label class="form-label" for="form3Example4">Password</label>
              </div>

              <div class="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;
