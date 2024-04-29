import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link, useNavigate,useParams,Navigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
// import "./Form.css"

const override= {
    display: "block",
    margin: "0 auto",
    marginTop: "250px",
    marginBottom: '200px',
    borderColor:"black",
    justifyContent: 'center',
    alignItems: 'center',
   
  };

function AddMarks() {
  const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("black");
    const [score, setScore] = useState();
    const [remarks, setRemarks] = useState();
    const {id}= useParams();

    useEffect(()=>{
      let single={
        _id:id,
        mentorId:sessionStorage.getItem('mentorId')
      }
      const response = axios.post('http://localhost:3000/mentor/solution/single', single,token).then(
        response=>{
          console.log(response.data.data)
          setScore(response.data.data.score);
          setRemarks(response.data.data.remarks);


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
      mentorId:sessionStorage.getItem("mentorId"),
    }

  
    const handleSubmit= async(e,_id)=>{
      e.preventDefault()
        try{
            
           const data={
            score:'score',
            remarks:'remarks',
            mentorId:sessionStorage.getItem('mentorId'),
            _id:id
           }

            const response = await axios.post("http://localhost:3000/mentor/solution/updateMarks" , data,token)
            if(response.data.success){
                console.log(response.data.data);
                toast.success(response.data.message)
                return <Navigate to='/mentor/solution'/>
              }
              else{
                toast.error(response.data.message)
              }  
        }catch (error) {
            console.error("Error adding score:", error);
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

     {!isLoading &&(
      <div style={{marginTop:100}}>
        <form className='row' onSubmit={handleSubmit} style={{color:'black', width:'40%', margin: '0 auto'}}>
       
        <h1> Add Mentor</h1>
            <label>
                Score
            </label>
            <input type='number' onChange={(e) => setScore(e.target.value)} required  className='form-control'/>
        

        <label>
          Remarks </label><input type='text' onChange={(e) => setRemarks(e.target.value)} required className='form-control'/>

        <button type="submit" onClick={()=>handleSubmit(id)}>Save</button>

      </form>
      </div>
     )} 
    </>
  )
}

export default AddMarks