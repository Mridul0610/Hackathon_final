import React ,{useState, useEffect} from 'react'
import axios from 'axios' 
import { Await, Link, Navigate, useNavigate } from 'react-router-dom'
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

function Speaker() {
  const [isLoading, setIsLoading] = useState(true);
  let [color, setColor] = useState("black");
  const [items, setItem] = useState([]);
  const [pageSize, setPageSize] = useState(9);
  const [currentPage, setCurrentPage]= useState(1)
  
useEffect(() => {
  // Simulate an API call
  fetchData()
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
}, [currentPage,pageSize]);


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
      // headers: {
      //   Authorization: `Bearer ${storedToken}`,
      // },
      })
    // console.log(token)
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

const removeMentor = async (id,status)=> {
  try{
  // e.preventDefault();
  const single = {
    _id: id,
    status:status
  }



   const response = await axios.post('http://localhost:3000/admin/mentor/disable', single)

   fetchData()
   if(response.data.success){
        toast.success(response.data.message);
        // window.location.reload()
   }
  }
  catch(error) {
    console.error('Error disabling Mentor:', error);
  
};

}
function changePage(id){
  setCurrentPage(id)
}
function nextPage (){
 setCurrentPage((nextPage)=>nextPage+1)

 
}

function prevPage () {
 setCurrentPage((prevPage)=>prevPage-1)

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
  <div className="section-header" style={{ marginTop: 70, height: 50 }}>
    <h2>Event Mentors</h2>
    {/* <p>Here are our Mentors</p> */}  
    
  <Link to={'/AddMentor'}>
  <h2 style={{backgroundColor:'#0e1b4d',color:'white',width:'20%', float:'right'}}>Add new Mentor</h2></Link>
  </div> 

  <div className="container" data-aos="fade-up" style={{ display: 'flex', flexWrap: 'wrap' }}>

    {itemsPerPage.map(item => (
      <div key={item.id} className="col-lg-4 col-md-6" style={{ paddingBottom: 20, paddingLeft: 20  }}>
        <div className="card" data-aos="fade-up" data-aos-delay={100} style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '5px', overflow: 'hidden',lineHeight:0 ,height:500}}>
          <img src={'http://localhost:3000/' + item.profilePic} style={{ width: '100%', height: 200 }} />
          <div className="card-body">
            <h3>{item.name.toUpperCase()}</h3>
            <h4>{item.designation.toUpperCase()}</h4>
            <p><i class="fa-solid fa-envelope"></i>  {item.email}</p>
            <p data-bs-container="body" data-bs-toggle="popover" data-bs-placement="right" data-bs-content="Right popover">{item.description}</p>
            <p className="badge badge-info" style={{background:'InfoText'}}>{item.status==='true'?'Active' :item.status==='false'?'Disabled': item.status}</p>
             <div style={{display:'flex', gap:20}}>
            <button style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}}>
              <Link to={'/UpdateMentor/' + item._id}>
                Update
              </Link>
            </button>
            {item.status==='true' &&(
            <button style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}} onClick={()=>removeMentor(item._id,'false')}>
                Disable
            </button>
            )}
            {item.status==='false' &&(
               <button style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}} onClick={()=>removeMentor(item._id,'true')}>
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

export default Speaker