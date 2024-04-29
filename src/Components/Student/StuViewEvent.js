import React,{useState, useEffect} from 'react'
import axios from 'axios' 
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import * as qs from "qs"
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import './Stu.css'



const override= {
    display: "block",
    margin: "0 auto",
    marginTop: "250px",
    marginBottom: '200px',
    borderColor:"black",
    justifyContent: 'center',
    alignItems: 'center',
    overflow:"hidden"
   
  };
function StuViewEvent() {

    const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("black");

    const [studentId, setStudentId] = useState('')
    const {id}= useParams();
    const [eventTitle, setEventTitle] = useState();
    const [availableSlots, setAvailableSlots] = useState()
    const [slots, setSlots] = useState();
    const [description, setDescription] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [status, setStatus] = useState();
    const [mentorsId,setMentors] = useState([]);
    const nav= useNavigate('')

  useEffect(() => {
    const storedStudentId= sessionStorage.getItem('studentId')  
    if(storedStudentId){
      setStudentId(storedStudentId)
    }
    console.log(studentId)
    fetchData()
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  

  const storedToken = sessionStorage.getItem("token");
  if(!storedToken){
    toast.error("user not authenticated");
    return <Navigate to='/login-admin'/>
 
  }

  const fetchData= async()=>{
    let single={
       _id:id
    }
    try{
      const response = await axios.post('http://localhost:3000/admin/event/single',single)
    //   setItem(response.data.data.data)
      setDescription(response.data.data.description)
      setStartTime(response.data.data.startTime)
      setEndTime(response.data.data.endTime)
      setSlots(response.data.data.slots)
      setAvailableSlots(response.data.data.availableSlots)
      setEventTitle(response.data.data.eventTitle)
      setStatus(response.data.data.status)
      setMentors(response.data.data.mentorsId);
      setIsLoading(false); 
      console.log(response.data.data)
    } catch(error){
      console.error("error fetching data:" ,error)
      console.error(error.response)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: true};
    return date.toLocaleDateString('en-US', options); // Change 'en-US' to your desired locale
  };


    const handleSubmit= async (eventId)=>{
    // e.preventDefault();
    try{
      const data={
        eventId:eventId,
        studentId:sessionStorage.getItem("studentId")
      
      }

    const response = await axios.post('http://localhost:3000/student/addInEvent' ,data);
    fetchData()
    if(response.data.success){
      console.log(response.data);
    toast.success(response.data.message)
    nav('/student/event')
    }else{
      toast.error(response.data.message)
    }
  }catch(error){
    console.error(error)
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
 
 <section id="speakers">
   <div className="section-header" style={{ marginTop: 70, height: 50 }}>
     <h2>Event</h2>
     {/* <p>Candidates!! Register yourself</p> */}
   </div>
   <div className="container" data-aos="fade-up" style={{ display: 'flex', flexWrap: 'wrap' }}>

       <div  style={{ padding: 20, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>

           {/* <img src={'http://localhost:3000/' + item?.profilePic} style={{ width: '100%', height: 200 }} /> */}
           <div className='row' style={{paddingLeft:'15%'}}>
            <div className='col-md-6'>
             <h3>{eventTitle.toUpperCase()}</h3>
               </div>

           <h5 style={{color:'rgb(14, 27, 77)',fontWeight:700, marginTop:20}}>{status===1?'Event Not started':status===2?'Event started':status===3||status===4? 'Event closed':status}</h5>
           
           <div className='col-md-6'>          
           <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black', marginRight:10}}>Start Time</span>{formatDate(startTime)}</p>
           </div> 
           <div className='col-md-6'>
             <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black',marginRight:10}}>End Time</span>  {formatDate(endTime)}</p>
           </div>
            
            <div className='col-md-6'>
            <p> <span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black', marginRight:10}}> Total No. of slots</span> {slots}</p>
           </div>

           <div className='col-md-6'>
            <p> <span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black', marginRight:10}}> Available slots</span> {availableSlots}</p>
           </div>

            <div className='col-md-6'>
            <p> <span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}}>Event Description </span>
             {description} 
             </p>
             </div>
             <h4>Our Mentors</h4>
             {mentorsId.map(mentor=> 

           <div  className='col-lg-4' style={{paddingBottom:'50px', margin:'0 auto'}}>
           <img src={'http://localhost:3000/'+mentor.profilePic} style={{ width: '50%', height:'50%' }}/>
           <h5 key={mentor._id}><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black' , marginTop:25}}>Mentor</span>
             {mentor?.name.toUpperCase()} </h5>
             <h5>
            <span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black',marginRight:10}}>
             Designation</span> 
             {mentor?.designation.toUpperCase()} 
             </h5>
             
            </div>
            )}

            <div>
            {status===1 &&(
              <button  style={{backgroundColor:'rgb(14, 27, 77)',color:'white', padding:'10px 10px',width:'30%', marginLeft:'25%'}}
              onClick={() =>handleSubmit(id)}
               >
                Apply To Event
              </button> )}

              {status===2 &&(
              <Link to={'/student/task/'+ id}>
              <button style={{backgroundColor:'rgb(14, 27, 77)',color:'white',width:'30%', margin:'0 auto',  marginLeft:'25%'}}
              // onClick={() =>handleSubmit(item._id)}
               >    
               Go To Task
              </button>  
               </Link>   )}

              {status===3 &&(
                <h3 style={{color:'rgb(14, 27, 77)', fontWeight:700, padding:'10px',width:'50%', margin:'0 auto'}}>Event Closed Wait for Result!</h3>
              )}

              {status===4 &&(
              <Link to={'/student/result/'+id}>
              <button style={{backgroundColor:'rgb(14, 27, 77)', color:'white'}}>View Result</button>
              </Link>
              )}

              </div>
              {/* {
                 <p>
                  Student Already Registered
                 </p>
              } */}
           </div>
       </div>
   </div>
 </section>
 
      )} 
    

    </>
  )
}

export default StuViewEvent 