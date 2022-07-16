import React, { useState } from "react";
import {useNavigate, Link} from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"", password:""});
    let history = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: (JSON.stringify({email: credentials.email, password: credentials.password }))
          });
          const json = await response.json()
          console.log(json);
         if(json.success){
             // Save the auth token and redirect
             localStorage.setItem('token', json.authToken);
             props.showAlert("Log-in successful!","success")
             history("/");

         }
         else{
            props.showAlert("Invalid Credentials","danger")
         }

    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
      }


  return (
    <div className="mt-3">
        <h2>Login to use iNotebook</h2>
        <div id="emailHelp" className="form-text">If you don't have an account please, <Link to='/signup'>Sign-Up</Link></div>
      <form onSubmit={handleSubmit}>
        <div className="my-5 mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onChange}
            name="email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
