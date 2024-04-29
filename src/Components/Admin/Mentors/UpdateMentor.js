import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate,Navigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import axios from 'axios';
import "../Form.css"


const override= {
    display: "block",
    margin: "0 auto",
    marginTop: "250px",
    marginBottom: '200px',
    borderColor:"black",
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, 
  };

function UpdateMentor() {
    const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("black");
    const [profilePic, setProfilePic] = useState([]);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [designation, setDesignation] = useState();
    const [description, setDescription] = useState();
    const {id}= useParams();
    const nav = useNavigate()


    useEffect(()=>{
      let single={
        _id:id
      }
      const response = axios.post('http://localhost:3000/admin/mentor/single', single,token).then(
        response=>{
          console.log(response.data.data)
          setName(response.data.data.name);
          setEmail(response.data.data.email);
          setDescription(response.data.data.description)
          setDesignation(response.data.data.designation)
          setProfilePic(response.data.data.profilePic)


        }
      )
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
    
    const handleSubmit = async (e) => {
      e.preventDefault();
       try{
 
       const formData= new FormData();
       if(!!profilePic){
        formData.append('profilePic', profilePic)
       }
       formData.append('_id', id);
       formData.append('name', name);
       formData.append('email', email);
       formData.append('designation', designation);
       formData.append('description', description);

       const response = await axios.post('http://localhost:3000/admin/mentor/update', formData, token)
       console.log(response.data.data); // log the response from the server
       toast.success(response.data.message)
        nav('/speaker')
      
       }catch(error){
        toast.error(error.data.message)
        console.error(error.response);
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
      <form className="row" onSubmit={handleSubmit} style={{marginTop:100 ,color:'black', width:'40%', margin: '0 auto'}}>
      
        {/* <div className='form-group'>   */}
        <h1>Update Mentor</h1>
        <div className='col-md-6'>
                Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='form-control'/>
        </div>
       
       <div className='col-md-6'>
        Profile <input type='file' value={File}  onChange={(e) => setProfilePic(e.target.files[0])} className='form-control'/><br />
       </div> 
       
       <div className='col-md-6'> 
       Email <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-control'/><br />
       </div> 
       
       <div className='col-md-6'> 
       Designation <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} className='form-control'/><br/>
       </div>
        
       
        Description <input type="text" value={description}  onChange={(e) => setDescription(e.target.value)} className='form-control'/><br/>
        

        <div className='btn' style={{display:'flex'}}>
        <button type="submit">Save</button>
        <Link to={'/speaker'}>
        <button style={{marginLeft:20,width:'100%',backgroundColor:'rgb(14, 27, 77)',color:'white'}}>Show Employee List</button></Link>
        </div> 
        {/* </div> */}
      </form>
    </div>)}
    </>
  )
}

export default UpdateMentor