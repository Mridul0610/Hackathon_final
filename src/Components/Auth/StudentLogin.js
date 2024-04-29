import React, { useState } from 'react';
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import RegisterHeader from '../Layouts/RegisterHeader';
import "./Login.css"

const StudentLogin = () => {

  const nav = useNavigate()
  const [email,setEmail] = useState("")
  console.log(email)
  const [password,setPassword] = useState("")
  console.log(password)



  const loginform = async (e)=>{
    e.preventDefault();
    try{
     const response= await axios.post("http://localhost:3000/student/login" ,{ email:email, password:password}

    )
    if(response.data.success){
    if(response.data.data.userType === 3){
      sessionStorage.setItem("token",response.data.data.token)
      sessionStorage.setItem("studentId",response.data.data.studentId)
      sessionStorage.setItem("_id",response.data.data._id)


      nav('/student/')
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
            <div class="form-container">
                <h1 class="opacity" style={{color:'white'}}>CANDIDATE LOGIN</h1>
                <form onSubmit={loginform}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type='submit' class="opacity">SUBMIT</button>
                    {/* <button type='submit' class="opacity"></button> */}

                </form>
            </div>
        </div>
    </section>
</div>
   </>
  );
};



export default StudentLogin;
