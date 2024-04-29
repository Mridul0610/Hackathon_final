import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link, useNavigate,Navigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import Select from 'react-select'
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

  function AddEvent() {
    const [isLoading, setIsLoading] = useState(true);
      let [color, setColor] = useState("black");
      const [mentorsId, setMentorId] = useState([]);
      const [mentor,setMentor]= useState()
      const [eventTitle, setEventTitle] = useState();
      const [slots, setSlots] = useState();
      const [description, setDescription] = useState();
      const [startTime, setStartTime] = useState();
      const [endTime, setEndTime] = useState();
      const [eventDate, setEventDate] = useState();
      const [storeArray, setStoreArray]= useState([])
      const nav= useNavigate()

      useEffect(() => {
        getAllMentors();
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }, []); // Fetch mentors on component mount

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
          const Input ={
          mentorsId:storeArray,
          eventTitle:eventTitle,
          slots:slots,
          description:description,
          startTime:startTime,
          endTime:endTime,
          eventDate:eventDate
          }
            const response = await axios.post("http://localhost:3000/admin/event/add" , Input,token)
            if(response.data.success){
                console.log(response.data.data);            
                toast.success(response.data.message)
                nav('/event')
              }
              else{
                toast.error(response.data.message)
              }  
        }catch (error) {
            console.error("Error:", error);
    }
}


const getAllMentors = async(e)=>{

   try{
     const response= await axios.post("http://localhost:3000/admin/mentor/all")
     console.log(response.data.data)
     setMentorId(response.data.data)
    //  setMentor(response.data.data)
   }catch (error){
       console.error('error fetching data:',error)
   }

}

const selectedOption = (e)=> {
  console.log('the data',e)
  const arr=[] 
  e.forEach(e => {
    arr.push(e.value);

  setStoreArray(arr)
  console.log('the data:',e)
});  

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
    <div className='box'>
              <form  className='row' onSubmit={handleSubmit} style={{ color:'black', width:'40%', margin: '0 auto'}}>
        {/* <div className='form-group'>   */}
        <h1> Add Event</h1>
            <div className='col-md-6'>
            <label>
               Event Name
            </label>
            <input type="text" onChange={(e) => setEventTitle(e.target.value)} required className="form-control" />
            </div>
             
             <div className='col-md-6'>
            <label>
               Start Date
            </label>
            <input type="date" onChange={(e) => setEventDate(e.target.value)}   className="form-control"/>
            </div>

        <div className='col-md-6'>   
        <label>
        Mentor Name </label>
        <Select
          isMulti={true}
          options = {mentorsId.filter(mentor=>mentor.status=== 'true').map((mentor) => ({
          value:mentor._id,
          label: mentor.name,
          // className:"form-control"
       
        }))}  
         onChange={selectedOption}
        // onChange={(selectedOption) => setMentor(selectedOption)}
        // value={mentor}
        />
        </div>
         
         <div className='col-md-6'>
        <label>
        No. of Slots </label><input type="number" min='0' onChange={(e) => setSlots(e.target.value)} required className="form-control"/>
        </div>
        
        {/* <div className='col-md-6'> */}
        <label>
        Description </label><input type="text" onChange={(e) => setDescription(e.target.value)} className="form-control"/>
        {/* </div> */}
        
        <div className='col-md-6'>
        <label>Start Time</label><input type='datetime-local' onChange={(e)=> setStartTime(e.target.value)} className="form-control"/>
        </div>

        <div className='col-md-6'>
        <label>End Time</label><input type='datetime-local' onChange={(e)=> setEndTime(e.target.value)} className="form-control"/>
        </div>

        <button type="submit" style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}}>Save</button> 
      {/* </div> */}
      </form>
      </div>
)}
    </>
  )
}

export default AddEvent