import React ,{useState, useEffect} from 'react'
import axios from 'axios' 
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import * as qs from "qs"
import ClipLoader from "react-spinners/ClipLoader";
// import Pagination from 'react-bootstrap/Pagination';
import { toast } from 'react-toastify';

// import Pagination from '../Layouts/Pagination';
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


function StuTask() {  
    const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("black");
    const [items, setItem] = useState([]);
    const [requestStatus, setRequestStatus] = useState(null);
    const [selectedFile, setSelectedFile] = useState()
     const {eventId}= useParams();


    useEffect(() => {
      // Simulate an API call
      fetchData()
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    },[]);

      let token={
    studentId:sessionStorage.getItem("studentId"),
  }
  const storedToken = sessionStorage.getItem("token");
  if(!storedToken){
    toast.error("user not authenticated");
    return <Navigate to='/login-admin'/>
 
  }


  const fetchData= async ()=>{
    const single = {
       eventId:eventId,
      //  studentId:sessionStorage.getItem('studentId')
    }
    try{
    const response= await axios.post("http://localhost:3000/admin/task/all",single)
  
  setItem(response.data.data)
  setIsLoading(false)
  console.log(response.data.data)
    }catch(error){
      console.error('error fetching data:',error)
      console.log(error.response)
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
  // {!isLoading &&(
    <section id="speakers">
    <div className="section-header" style={{ marginTop: 70, height: 50 }}>
      <h2>Event Tasks</h2>
    </div>

   <div className="container" data-aos="fade-up" style={{ display: 'flex', flexWrap: 'wrap' }}>
  
      
      {items.map(item=>(
      <div key={item._id} className="col-lg-12 col-md-12" style={{ paddingBottom: 20, paddingLeft: 20}}>
        <div className="card" data-aos="fade-up" data-aos-delay={100} style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '5px', overflow: 'hidden',lineHeight:0 }}>
          <div className="card-body">
            <h3>{item.taskTitle}</h3>
            <h4>{item.eventId?.description}</h4>
           <h5 style={{color:'rgb(14, 27, 77)',fontWeight:700}}>{item.eventId.status===1?'Event Not started':item.eventId.status===2?'Event started':item.eventId.status===3||item.eventId.status===4? 'Event closed':item.eventId.status}</h5>            
            <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}>Event Title</span> {item.eventId?.eventTitle}</p>

            <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}>Duration <i class="fa-solid fa-clock"></i></span>  {item.duration}</p>
            <p> <span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}>Total Marks</span> {item.totalMarks}</p>
            {item.eventId.status=== 2 &&(
            <Link to={'/student/ViewTask/'+item._id}>
            <button style={{backgroundColor:'rgb(14, 27, 77)', color:'white'}}>Perform Task</button>
            </Link>
            )}
            
            {item.eventId.status=== 3 &&(
              <p tyle={{backgroundColor:'rgb(14, 27, 77)', color:'white'}}>Event Closed Wait For Result!!</p>
            )}

            {item.eventId.status=== 4 &&(
            <Link to={'/student/result/'+item._id}>
            <button style={{backgroundColor:'rgb(14, 27, 77)', color:'white'}}>View Result</button>
            </Link>
            )} 
            
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
// }
// }

export default StuTask