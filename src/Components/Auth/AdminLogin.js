import React, { useState } from 'react';
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

// import './assets/css/style.css'; 
import "./Login.css"
import RegisterHeader from '../Layouts/RegisterHeader';

const AdminLogin = () => {

  const nav = useNavigate()
  const [email,setEmail] = useState("")
  console.log(email)
  const [password,setPassword] = useState("")
  console.log(password)

  const loginform = async (e)=>{
    e.preventDefault();
    try{
     const response= await axios.post("http://localhost:3000/admin/login" ,{ email:email, password:password}

    )
    if(response.data.success){
    if(response.data.data.userType === 1){
      sessionStorage.setItem("token",response.data.data.token)
      sessionStorage.setItem("_id",response.data.data._id)

      nav('/')
       console.log(response)
       toast.success(response.data.message)

      }else if(response.data.data.userType === 3){
        sessionStorage.setItem("token",response.data.data.token)
        sessionStorage.setItem("studentId",response.data.data.studentId)
        sessionStorage.setItem("_id",response.data.data._id)
  
  
        nav('/student/')
         console.log(response)
         toast.success(response.data.message)
        }
        else if(response.data.data.userType === 2){
          sessionStorage.setItem("token",response.data.data.token)
          sessionStorage.setItem("mentorId",response.data.data.mentorId)
          sessionStorage.setItem("_id",response.data.data._id)
    
    
          nav('/mentor')
           console.log(response)
           toast.success(response.data.message)
          }
     } 
     else{
        toast.error(response.data.message)
      }
    
  }
    catch (error){
     console.error("error fetching data:" ,error)
     console.error(error.response)
    }
}

  return (
    <>
    <RegisterHeader/>
    <div class="login1-container">
    <section>
        <div class="login-container">
            <div class="circle circle-one"></div>
            <div class="form-container">
                <h1 class="opacity" style={{color:'white'}}>LOGIN</h1>
                <form onSubmit={loginform}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type='submit' class="opacity">SUBMIT</button>
                </form>
            </div>
            <div class="circle circle-two"></div>
        </div>
        <div class="theme-btn-container"></div>
    </section>
</div>
   </>
  );
};



export default AdminLogin;
