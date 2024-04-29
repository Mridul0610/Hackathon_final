import React,{useState, useEffect} from 'react'
import axios from 'axios' 
import { Link, Navigate, useNavigate } from 'react-router-dom'
import * as qs from "qs"
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
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

function MenAssignedEve() {
  const [isLoading, setIsLoading] = useState(true);
  let [color, setColor] = useState("black");
  const [items, setItem] = useState([]);
//   const [mentorId, setMentorId] = useState('')

  useEffect(() => {
    fetchData()
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  
  let token={
    mentorsId:sessionStorage.getItem("mentorId"),
  }
  const storedToken = sessionStorage.getItem("token");
  if(!storedToken){
    toast.error("user not authenticated");
    return <Navigate to='/login-admin'/>
 
  }

  const fetchData= async()=>{

    try{

      const response = await axios.post('http://localhost:3000/mentor/event/all',token)
      setItem(response.data.data)
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
     <h2>Events</h2>
   </div>
   <div className="container" data-aos="fade-up" style={{ display: 'flex', flexWrap: 'wrap' }}>
     {items?.map(item=> (
       <div key={item.id} className="col-lg-12 col-md-6" style={{ paddingBottom: 20, paddingLeft: 20,width:'70%' , margin:'0 auto' }}>
         <div className="card" data-aos="fade-up" data-aos-delay={100} style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '5px', overflow: 'hidden',lineHeight:0, margin:'0 auto' }}>
           {/* <img src={'http://localhost:3000/' + item?.profilePic} style={{ width: '100%', height: 200 }} /> */}
           <div className="card-body">
             <h3>{item.eventTitle.toUpperCase()}</h3>
             <h5><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}}>Description</span>{item.description}</h5><br/>   
           <h5 style={{color:'rgb(14, 27, 77)',fontWeight:700}}>{item.status===1?'Event Not started':item.status===2?'Event started':item.status===3||item.status===4? 'Event closed':item.status}</h5>            
             <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}>Start Time</span>{formatDate(item.startTime)}</p>
             <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}>End Time</span>{formatDate(item.endTime)}</p> 

              <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}> No. of slots available</span>{item.slots}</p>
    
                <Link to={'/mentor/task/'+item._id}>
              <button style={{backgroundColor:'rgb(14, 27, 77)',color:'white', width:'50%'}}>View Task</button>
              </Link>
               
           </div>
         </div>
       </div>
     ))}
   </div>
 </section>
 
      )} 
      </>
  )
}

export default MenAssignedEve