import React,{useState, useEffect} from 'react'
import axios from 'axios' 
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
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

function StuEvent() {
  const [isLoading, setIsLoading] = useState(true);
  let [color, setColor] = useState("black");
  const [items, setItem] = useState([]);
  const [studentId, setStudentId] = useState('')
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage]= useState(1)
  const {id}= useParams();

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
  }, [currentPage,pageSize]);

  

  const storedToken = sessionStorage.getItem("token");
  if(!storedToken){
    toast.error("user not authenticated");
    return <Navigate to='/login-admin'/>
 
  }

  const fetchData= async()=>{
    try{
      const response = await axios.post('http://localhost:3000/admin/event/all')
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
    }else{
      toast.error(response.data.message)
    }
  }catch(error){
    console.error(error)
  }
  }

  function changePage(id){
    setCurrentPage(id)
  }
  function nextPage (){
    if(currentPage === totalPages || currentPage === 0) {
   setCurrentPage((nextPage)=>currentPage)
    }else{
   setCurrentPage((nextPage)=>nextPage+1)  
    }
   
  }
  
  function prevPage () {
    if(currentPage === 1){
    setCurrentPage((prevPage)=>currentPage)
  }else{
    setCurrentPage((prevPage)=>prevPage-1)
  }
  }

  const indexOfLastPage = currentPage*pageSize
  console.log('last',indexOfLastPage)
  const indexOfFirstPage = indexOfLastPage-pageSize 
  console.log('first',indexOfFirstPage) 
  const itemsPerPage = items.slice(indexOfFirstPage,indexOfLastPage);
  console.log('items',itemsPerPage)
  const totalPages = Math.ceil(items.length / pageSize); 
  console.log('total pages',totalPages)
  const numbers = [...Array(totalPages+1).keys()].slice(1)

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
   <div className="section-header" style={{ marginTop: 70, height: 100 }}>
     <h2>Events</h2>
     <p>Candidates!! Register yourself</p>
   </div>
   <div className="container" data-aos="fade-up" style={{ display: 'flex', flexWrap: 'wrap' }}>
     {itemsPerPage?.map(item=> (
       <div key={item.id} className="col-lg-12 col-md-12" style={{ paddingBottom: 20, paddingLeft: 20 }}>
         <div className="card" data-aos="fade-up" data-aos-delay={100} style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '5px', overflow: 'hidden',lineHeight:0 }}>
           {/* <img src={'http://localhost:3000/' + item?.profilePic} style={{ width: '100%', height: 200 }} /> */}
           <div className="card-body" style={{display:'flex',gap:'20%'}}>
             <div>
             <h3>{item.eventTitle.toUpperCase()}</h3>
             {/* <p>{item.description}</p><br/>    */}
           <h5 style={{color:'rgb(14, 27, 77)',fontWeight:700}}>{item.status===1?'Event Not started':item.status===2?'Event started':item.status===3||item.status===4? 'Event closed':item.status}</h5>            
           <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}>Start Time</span>{formatDate(item.startTime)}</p>
             <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}>End Time</span>  {formatDate(item.endTime)}</p> 

              <p> <span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}> Total No. of slots</span> {item.slots}</p>
              <p> <span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}> Available slots</span> {item.availableSlots}</p>
              </div>
              <div>
              <h4>Our Mentors</h4>
             {item.mentorsId.map(mentor=> 

           <div  style={{paddingBottom:'50px', margin:'0 auto'}}>
           <img src={'http://localhost:3000/'+mentor.profilePic} style={{ width: '20%', height:'20%' }}/>
           <h5 key={mentor?._id}><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black' , marginTop:25}}>Mentor</span>
             {mentor?.name.toUpperCase()} </h5>
             <h5>
            <span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black',marginRight:10}}>
             Designation</span> 
             {mentor?.designation.toUpperCase()} 
             </h5>         
            </div>
            
            )}
              </div>

           </div>             
              <button style={{backgroundColor:'rgb(14, 27, 77)',color:'white', padding:'10px 10px',width:'30%', margin:'0 auto', marginBottom:'20px'}}
              onClick={() =>handleSubmit(item._id)}
               >    
               Apply To Event
              </button>  
              
         </div>
       </div>
     ))}
   </div>
 </section>
 
      )} 

<nav aria-label="Page navigation example" style={{marginLeft:'40%'}}>
  <ul className='pagination'>
    <li className='page-item'>
      
      <a href='#' className='page-link' onClick={prevPage}>Previous</a>
    </li>
    {numbers.map((n, i) => (
      <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
        <a href='#' className='page-link' onClick={() => changePage(n)}>
          {n}
        </a>
      </li>
    ))}
    <li className='page-item'>
     
      <a href='#' className='page-link' onClick={nextPage}> Next</a>
    </li>
  </ul>
</nav>

      </>
  )
}

export default StuEvent