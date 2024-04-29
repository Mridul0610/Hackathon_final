import React, { useState } from 'react';
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import RegisterHeader from '../Layouts/RegisterHeader';
import "./Login.css"

function StuEveRegister() {
  const override= {
    display: "block",
    margin: "0 auto",
    marginTop: "200px",
    borderColor:"black",
    justifyContent: 'center',
    alignItems: 'center',
   
  };

    const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("black");
    const [name, setName] = useState()
    const [email,setEmail] =useState()
    const [password,setPassword] =useState()
    const [IdProof,setIdProof] =useState([])
    const [college,setCollege] =useState()
    const [contact,setContact] =useState()
    const [address,setAddress] =useState()
    const nav = useNavigate()


const handleSubmit= async(e)=>{
    e.preventDefault()
    try{
        const formData = new FormData();
        formData.append('IdProof', IdProof);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('college', college);
        formData.append('contact', contact);
        formData.append('address', address);


        const response = await axios.post("http://localhost:3000/student/add" , formData)
        if(response.data.success){
            console.log(response.data.data);
            toast.success(response.data.message)
            //  window.location.reload()
             nav('/login-admin')
           
          }
          else{
            toast.error(response.data.message)
          }  
    }catch (error) {
        console.error("Error", error);
}
}



return(
    <>
      
      <div class="login1-container">
    <section>
        <div class="login-container">
            <div class="form-container" style={{height:630}}>
                <h1 class="opacity" style={{color:'white'}}>CANDIDATE REGISTER</h1>
                <form className='row' onSubmit={handleSubmit}>

                    <div className='col-md-6'>
                    <label htmlFor="file">Id Proof</label>
                    <input type="file"  onChange={(e) => setIdProof(e.target.files[0])} required /> 
                    </div>

                    <div className='col-md-6'>
                    <label htmlFor="name">Name</label>
                    <input type="text"  value={name} onChange={(e) => setName(e.target.value)} required /> 
                    </div>

                    <div className='col-md-4'>
                    <label htmlFor="college">College Name</label>
                    <input type="text"  value={college} onChange={(e) => setCollege(e.target.value)} required />
                    </div>

                    <div className='col-md-4'>
                    <label htmlFor="contact">Contact</label>
                    <input type="tel" minLength={10} maxLength={10} value={contact} onChange={(e) => setContact(e.target.value)} required />
                    </div>

                    <div className='col-md-4'>
                    <label htmlFor="address">Address</label>
                    <input type="text"  value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>

                    <div className='col-md-6'>
                    <label htmlFor="email">Email</label>
                    <input type="text"  value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className='col-md-6'>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                 
                    <button type='submit' class="opacity" style={{width:'30%'}}>SUBMIT</button>
                    <Link to={'/login-admin/student'}>
                    <button type='submit' class="opacity" style={{marginTop:20}}>Back To login</button>
                     </Link> 
                  
                </form>
            </div>
        </div>
    </section>
</div>

    </>
)
}

export default StuEveRegister