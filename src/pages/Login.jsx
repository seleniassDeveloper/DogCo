import React from 'react';


const Login = () => {
  return (
    <div className="login-wrapper">
        <div className='d-flex justify-content-end align-center'>
    <h1 className="login-title">DogCo</h1>
        </div>

      <div className="login-card">
        <form className="login-form">
          <input
            type="email"
            placeholder="Enter your e-mail"
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            required
          />
          <button type="submit" className="login-btn">Log in</button>
          <div className="login-footer">
            <span className="signup-text">Sign Up</span>
            <span className="forgot-text">Forgot your password?</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;