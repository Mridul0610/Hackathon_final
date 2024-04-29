import {useState,React, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios' 
import * as qs from "qs"
import ClipLoader from "react-spinners/ClipLoader";
const override= {
  display: "block",
  margin: "0 auto",
  marginTop: "200px",
  borderColor:"black",
  justifyContent: 'center',
  alignItems: 'center',
  overflow:"hidden"
 
};

function MenHome() {


  useEffect(() => {
    // Simulate an API call
    fetchData()
  }, []);

  const [items, setItem] = useState([]);
  const [mentorsId, setMentorsId] = useState([])


  const fetchData = async ()=>{
    // let mentor = {
    //   mentorsId:mentorsId
    // }
    try{

     const response= await axios.post("http://localhost:3000/admin/dashboard/upComingEvents",token)     
     setItem(response.data.data)
     setMentorsId(response.data.data.mentorsId)
     console.log(response)
   
    }
    catch (error){
     console.error("error fetching data:" ,error)
     console.error(error.response)
    }
}



const storedToken = sessionStorage.getItem("token");
if(!storedToken){
  toast.error("user not authenticated");
  return <Navigate to='/login-admin'/>

}

  let token={
    _id:sessionStorage.getItem("_id"),
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: true};
    
    return date.toLocaleDateString('en-US', options); // Change 'en-US' to your desired locale
  };

  return (
    <div>

<section id="about">  
    
<h1 style={{marginTop:'5%',marginLeft:'40%'}}>Upcoming Events🎉</h1>
<div  className="container position-relative" data-aos="fade-up" style={{ display: 'flex', flexWrap: 'wrap' }}>

{items.map(item=>(
          <div key={item.id} className="col-lg-4 col-md-6" style={{ paddingBottom: 20, paddingLeft: 20 , color:'white',margin:'0 auto' }}>
          <div className="card" data-aos="fade-up" data-aos-delay={100} style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '5px', overflow: 'hidden',lineHeight:0 ,height:'auto'}}>
            <div className="card-body">
              <h1 style={{color:'white'}}>{item.eventTitle?.toUpperCase()}</h1>
              <p style={{color:'white'}}>{item.description}</p>
              <h5 style={{color:'white'}}><span className="badge badge-info" style={{background:'white', color:'black'}}>No. of slots</span>  {item.slots}</h5>
              <p className="badge badge-info" style={{background:'white', color:'black'}}>{item.status=== 1?'Event Not Started Yet!' :item.status=== 2 ?'Event Started': item.status}</p>
              <h5 style={{color:'white'}}><span className="badge badge-info" style={{background:'white', color:'black'}}>Start Time</span>  {formatDate(item.startTime)}</h5>
              <h5 style={{color:'white'}}><span className="badge badge-info" style={{background:'white', color:'black'}}>End Time</span>  {formatDate(item.endTime)}</h5>
              

            </div>
          </div>
        </div>
))}
</div>

</section>

    </div>
  )
}

export default MenHome