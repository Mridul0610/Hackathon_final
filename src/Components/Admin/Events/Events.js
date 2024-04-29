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

 
};

function Events() {
  const [isLoading, setIsLoading] = useState(true);
  let [color, setColor] = useState("black");
  const [items, setItem] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage]= useState(1)

  useEffect(() => {
    // Simulate an API call
    fetchData()
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [currentPage,pageSize]);

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

  const removeEvent = (id)=> {
    // e.preventDefault();
    const single = {
      _id: id,
      status:false
    }
  
      const confirmed = window.confirm("Do you want to delete this Event?");
    if (confirmed) {
      axios.post('http://localhost:3000/admin/event/delete', qs.stringify(single))
        .then((res) => {
          toast.success('Event Deleted');
          window.location.reload()
        })
        .catch(error => console.error('Error deleting event:', error));
    } else {
      alert('Deletion canceled');
    }
  };

  const ChangeRequestStatus= async (id,status)=>{
    try{
      const data={
        _id:id,
        status:status,
      }

    const response = await axios.post('http://localhost:3000/admin/event/status' ,data);
    // console.log(`Request with ID ${id} has been ${status === 'approve' ? 'approved' : 'declined'} `)

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
  const indexOfFirstPage = indexOfLastPage-pageSize  
  const itemsPerPage = items.slice(indexOfFirstPage,indexOfLastPage);
  const totalPages = Math.ceil(items.length / pageSize); 
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
   <div className="section-header" style={{ marginTop: 70, height: 70 }}>
     <h2>Events</h2> 
       <Link to={'/AddEvent'}>
  <h2 style={{backgroundColor:'#0e1b4d',color:'white',width:'20%',float:'right'}}>Add new Event</h2></Link>
   </div>

   <div className="container" data-aos="fade-up" style={{ display: 'flex', flexWrap: 'wrap' }}>
     {itemsPerPage.map(item => (
       <div key={item.id} className="col-lg-12 col-md-6" style={{ paddingBottom: 20, paddingLeft: 20  }}>
         <div className="card" data-aos="fade-up" data-aos-delay={100} style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '5px', overflow: 'hidden',lineHeight:0, height:'auto' }}>
           {/* <img src={'http://localhost:3000/' + item?.profilePic} style={{ width: '100%', height: 200 }} /> */}
           <div className="card-body">
             <h3>{item.eventTitle.toUpperCase()}</h3>
          
             <p>{item.description}</p>  
             
               <p> <span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black', marginBottom:'20px'}}>Mentors</span>   {item.mentorsId?.map(mentor=>(
                <div style={{marginBottom:'30px'}} key={mentor._id}>
                  {mentor.name}
                </div>
               ))}</p>
           <h5 style={{color:'rgb(14, 27, 77)',fontWeight:700,}}>{item.status===1?'Event Not started':item.status===2?'Event started':item.status===3||item.status===4? 'Event closed':item.status}</h5>            
             <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}>Start Time</span>{formatDate(item.startTime)}</p>
             <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}>End Time</span>  {formatDate(item.endTime)}</p> 
            
              <p className='col-md-6'> <span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}> Total slots </span> {item.slots}</p>
              <p className='col-md-6'> <span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}> Available slots </span> {item.availableSlots}</p>
              
              <div style={{display:'flex', gap:20}}>
             <button style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}}>
               <Link to={'/UpdateEvent/' + item._id}>
                 Update
               </Link>
             </button>
             <button style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}} onClick={()=>removeEvent(item._id)}>
              Delete
             </button>

            
    {item.status === 1 && ( 
      
      <button style={{backgroundColor:'rgb(14, 27, 77)',color:'white', padding:'10px 10px'}}onClick={() => ChangeRequestStatus(item._id, 2)} >
        Start 
      </button>

  )} {item.status===2 &&(
       <button onClick={()=> ChangeRequestStatus(item._id,3)}>
        End
      </button>
  )} {item.status===3 &&(
    <button onClick={()=> ChangeRequestStatus(item._id,4)}>
        Publish Result
    </button>
  )}
  {item.status===4 &&(
    <button>
        Result Published
    </button>
  )}
             </div>
           </div>
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

export default Events