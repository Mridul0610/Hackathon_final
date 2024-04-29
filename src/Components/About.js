import {useState,React, useEffect} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom'

function About() {
  
  useEffect(() => {
    // Simulate an API call
    fetchData()
  }, []);


  const [items, setItem] = useState([]);
  const fetchData = async ()=>{
    try{

     const response= await axios.post("http://localhost:3000/admin/dashboard",token)     
     setItem(response.data)
     
     console.log(response)
   
    }
    catch (error){
     console.error("error fetching data:" ,error)
     console.error(error.response)
    }
}

  const storedToken = sessionStorage.getItem("token");
  if(!storedToken){
    alert("user not authenticated");
    return <Navigate to='/auth/login'/>
 
  }
  let token={
    _id:sessionStorage.getItem("_id"),
  }



  return (
    <div>
     {/* ======= About Section ======= */}
    <section id="about">      

      <div className="container position-relative" data-aos="fade-up" style={{marginLeft:'15%'}}>

  <div className="row">
      <div class="card col-lg-3" style={{width: "18rem", marginRight:'5%'}}>
  <div class="card-body">
    <h5 class="card-title" style={{textDecoration:'underline'}}>Total Events</h5>
    <h6>{items.totalEvents}</h6>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
</div>


<div class="card col-lg-3" style={{width: "18rem", marginRight:'5%'}}>
  <div class="card-body">
    <h5 class="card-title" style={{textDecoration:'underline'}}>Total Students</h5>
    <h6>{items.totalStudents}</h6>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
</div>

<div class="card col-lg-4" style={{width: "18rem", marginRight:'5%'}}>
  <div class="card-body">
    <h5 class="card-title" style={{textDecoration:'underline'}}>Total Mentors</h5>
    <h6>{items.totalMentors}</h6>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
</div>

<div class="card col-lg-4" style={{width: "18rem", marginRight:'5%'}}>
  <div class="card-body">
    <h5 class="card-title" style={{textDecoration:'underline'}}>Pending Student Verificcation</h5>
    <h6>{items.pendingStudentsVerifications}</h6>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
</div>

<div class="card col-lg-4" style={{width: "18rem", marginRight:'5%'}}>
  <div class="card-body">
  <h5 class="card-title" style={{textDecoration:'underline'}}>Pending Event Approval</h5>
    <h6>{items.pendingEventsApprovel}</h6>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
</div>


        </div>
      </div>
    </section>
    {/* End About Section */}
    </div>
  )
}

export default About