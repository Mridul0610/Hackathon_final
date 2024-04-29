import React ,{useState, useEffect} from 'react'
import axios from 'axios' 
import { Link, Navigate, useNavigate } from 'react-router-dom'
import * as qs from "qs"
// import "./style.css"
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

function StuSpeaker() {
  const [isLoading, setIsLoading] = useState(true);
  let [color, setColor] = useState("black");
  const [items, setItem] = useState([]);
  
useEffect(() => {
  // Simulate an API call
  fetchData()
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
}, []);


  // let token={
  //   _id:sessionStorage.getItem("_id"),
  // }
  // const storedToken = sessionStorage.getItem("token");
  // if(!storedToken){
  //   toast.error("user not authenticated");
  //   return <Navigate to='/login-admin'/>
 
  // }

  const fetchData = async ()=>{
    try{
  
     const response= await axios.post("http://localhost:3000/admin/mentor/all",{
    
      })
     setItem(response.data.data)
     setIsLoading(false); 
     console.log(response.data.data)
   
   
    }
    catch (error){
     console.error("error fetching data:" ,error)
     console.error(error.response)
    }
    // fetchData()
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
      />
    )}
{!isLoading &&(
 
<section id="speakers">
  <div className="section-header" style={{ marginTop: 70, height: 100 }}>
    <h2>Event Mentors</h2>
    <p>Here are our Mentors</p>
  </div> 
  <div className="container" data-aos="fade-up" style={{ display: 'flex', flexWrap: 'wrap' }}>

    {items.filter(item =>item.status==='true').map(item => (
      <div key={item.id} className="col-lg-4 col-md-6" style={{ paddingBottom: 20, paddingLeft: 20 }}>
        <div className="card" data-aos="fade-up" data-aos-delay={100} style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '5px', overflow: 'hidden',lineHeight:0, height:450 }}>
          <img src={'http://localhost:3000/' + item.profilePic} style={{ width: '100%', height: 200 }} />
          <div className="card-body">
            <h3>{item.name.toUpperCase()}</h3>
            <h4>{item.designation.toUpperCase()}</h4>
            <p><i class="fa-solid fa-envelope"></i>  {item.email}</p>
            <p>{item.description}</p>
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

export default StuSpeaker