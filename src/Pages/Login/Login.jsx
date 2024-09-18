import React from "react";
import "./Login.css";
import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {

  
  const navigate = useNavigate()

  const API = 'https://ntbackend.uz/api/v1/auth/login'

  const LoginForm = (e) =>{
    e.preventDefault()
    axios
      .post(API , {
        username: e.target[0].value,
        password: e.target[1].value 
      })
      .then((res)=>{
        if(res.status === 201 && res.data.data.username === 'admin'){
          localStorage.setItem('userId' , res.data.data._id)
          localStorage.setItem('token' , res.data.token)
          console.log(res.data);
          
          navigate('/adminpanel')
          
          
        }
      }).catch((err)=>{
        alert(err)
      })
  }
  return (

    <>
      <div className="loginsection">
        <video autoPlay loop muted className="video">
          {" "}
          <source
            src="https://dubaimotor.uz/video/bugatti-divosssss.mp4"
            type="video/mp4"
          />
        </video>
        <div className="container">
          <h1>Admin Log in</h1>
          <br />
  
          <form onSubmit={LoginForm} className="login-form">
            <input type="text" placeholder={"User Name"} />
            <input type="password" placeholder={"password"} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
