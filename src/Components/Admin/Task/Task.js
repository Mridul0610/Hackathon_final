import React ,{useState, useEffect} from 'react'
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


function Task() {  
    const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("black");
    const [items, setItem] = useState([]);
    const [pageSize, setPageSize] = useState(3);
    const [currentPage, setCurrentPage]= useState(1)
    // const pageSize = 3;

    useEffect(() => {
      // Simulate an API call
      fetchData()
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    },[currentPage, pageSize]);

  
  const fetchData= async ()=>{
    try{
    const response= await axios.post("http://localhost:3000/admin/task/all")
  
  setItem(response.data.data)
  setIsLoading(false)
  console.log(response.data.data)
    }catch(error){
      console.error('error fetching data:',error)
      console.log(error.response)
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

const removeTask = (id)=> {
  // e.preventDefault();
  const single = {
    _id: id,
    status:false
  }

    const confirmed = window.confirm("Do you want to delete this Task?");
  if (confirmed) {
    axios.post('http://localhost:3000/admin/task/delete', qs.stringify(single))
      .then((res) => {
        toast.success('Task Deleted');
        window.location.reload()
      })
      .catch(error => console.error('Error deleting task:', error));
  } else {
    toast.error('Deletion canceled');
  }
};

// const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
// const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

const indexOfLastPage = currentPage*pageSize
console.log('last',indexOfLastPage)
  const indexOfFirstPage = indexOfLastPage-pageSize  
  console.log('first',indexOfFirstPage)
  const itemsPerPage = items.slice(indexOfFirstPage,indexOfLastPage);
  console.log('item', itemsPerPage)
  const totalPages = Math.ceil(items.length / pageSize); 
  console.log('total',totalPages)
  const numbers = [...Array(totalPages+1).keys()].slice(1)
  console.log('num',numbers)

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
      <h2>Event Tasks</h2>  
      
    <Link to={'/AddTask'}>
    <h2 style={{backgroundColor:'#0e1b4d',color:'white',width:'20%',float:'right'}}>Add new Task</h2></Link>
    </div>

   <div className="container" data-aos="fade-up" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {itemsPerPage.map(item => (
      <div key={item.id} className="col-lg-12 col-md-6" style={{ paddingBottom: 20, paddingLeft: 20,}}>
        <div className="card" data-aos="fade-up" data-aos-delay={100} style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '5px', overflow: 'hidden',lineHeight:0 }}>
          <div className="card-body">
            <h3>{item.taskTitle.toUpperCase()}</h3>
            <h4 tabindex="0" data-bs-toggle="popover" data-bs-placement="right" data-bs-content="Right popover" style={{backgroundColor:'Background'}} >{item.description}</h4>
            {/* <p>{item.status === true}</p> */}
            <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}>Event Title</span> {item.eventId?.eventTitle}</p>

            <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}>Duration <i class="fa-solid fa-clock"></i></span>  {item.duration}</p>
            <p> <span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black'}}>Total Marks</span> {item.totalMarks}</p>
             <div style={{display:'flex', gap:20}}>
            <button style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}}>
              <Link to={'/UpdateTask/'+ item._id}>
                Update
              </Link>
            </button>
            <button style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}}  onClick={()=>removeTask(item._id)}>
                Delete
            </button>
            {item.status===true &&(
            <button style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}} onClick={()=>removeTask(item._id)}>
                Disable
            </button>
            )}
                     {item.status===false &&(
            <button style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}} onClick={()=>removeTask(item._id)}>
                Enable
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

export default Task