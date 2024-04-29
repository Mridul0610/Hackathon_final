import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link, useNavigate,Navigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import "../Form.css"

const override= {
    display: "block",
    margin: "0 auto",
    marginTop: "250px",
    marginBottom: '200px',
    borderColor:"black",
    justifyContent: 'center',
    alignItems: 'center',
   
  };

function AddMentor() {
  const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("black");
    const [profilePic, setProfilePic] = useState([]);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [designation, setDesignation] = useState();
    const [description, setDescription] = useState();
    const nav= useNavigate()


    useEffect(()=>{
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    },[])

    const storedToken = sessionStorage.getItem("token");
    if(!storedToken){
      alert("user not authenticated");
      return <Navigate to='/login-admin'/>
    }
    let token={
      _id:sessionStorage.getItem("_id"),
    }

  
    const handleSubmit= async(e)=>{
      e.preventDefault()

        try{
            const formData = new FormData();
            formData.append('profilePic', profilePic);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('designation', designation);
            formData.append('description', description);

            const response = await axios.post("http://localhost:3000/admin/mentor/add" , formData,token)

                console.log(response.data.data);
                toast.success(response.data.message)
                nav('/speaker')
              } 
        catch (error) {
            console.error("Error adding employee:", error);
            toast.error(error.data.message)

    }
}

  return (
    <>

{isLoading &&(
      <ClipLoader
  color={color}
  loading={isLoading}
  cssOverride={override}
  size={100}
  aria-label="Loading Spinner"
  data-testid="loader"
  // position="relative"
/>

)}

{!isLoading&&( 
  
       <div className='box'>
        <form className='row' onSubmit={handleSubmit} style={{marginTop:100 ,color:'black', width:'40%', margin: '0 auto'}}>
        {/* <div className='form-group'>   */}
      
        <h1> Add Mentor</h1>
        <div className='col-md-6'> 
            <label>
                Name
            </label>
            <input type="text" onChange={(e) => setName(e.target.value)} required  className='form-control'/>
        </div>
        <div className='col-md-6'> 
        <label>
        Profile </label><input type='file' onChange={(e) => setProfilePic(e.target.files[0])} required className='form-control'/>
      </div>

      <div className='col-md-6'> 
      <label>  
        Email </label><input type="email" onChange={(e) => setEmail(e.target.value)} required className='form-control'/>
        </div>
 
        <div className='col-md-6'> 
        <label>
        Password </label><input type="password" onChange={(e) => setPassword(e.target.value)} required className='form-control'/>
        </div>

        <div className='col-md-6'> 
        <label>
        Designation </label><input type="text" onChange={(e) => setDesignation(e.target.value)} required className='form-control'/>
        </div>

        <div className='col-md-6'> 
        <label>
        Description </label><input type="text" onChange={(e) => setDescription(e.target.value)} className='form-control'/>
        </div>
        <button type="submit" style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}}>Save</button>

        {/* </div>  */}
    
      </form>
      </div>)}
    </>
  )
}

export default AddMentor