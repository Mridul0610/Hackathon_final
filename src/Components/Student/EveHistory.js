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


function EveHistory() {

    const [isLoading, setIsLoading] = useState(true);
    const [studentId, setStudentId] = useState('')
    const [mentorsId,setMentors] = useState([]);
    const [items, setItem]= useState([])
    let [color, setColor] = useState("black");



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

     const fetchData = async()=>{

        try{     
          const data={studentId:sessionStorage.getItem('studentId')}
            const response = await axios.post("http://localhost:3000/student/assignedEvents", data)
            // const task= await axios.post("http://localhost:3000/admin/task/all")

       
        setItem(response.data.data)
        setIsLoading(false); 
        console.log(response.data.data)
      }
        
      catch (error){
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
    <div className='container'>
    <h1>Registered Events</h1>
 <table style={{ borderCollapse: 'collapse', width: '100%', marginTop:'10%', marginBottom:'10%',justifyContent:'center' }}>
      <thead>
        <tr style={{ backgroundColor: 'rgb(14, 27, 77)', height: '40px', color:"white"}}>
          {/* <th style={tableHeaderStyle}>Sr.No.</th> */}
          <th style={tableHeaderStyle}>Event Name</th>
          <th style={tableHeaderStyle}>Event Timings</th>
          <th style={tableHeaderStyle}>Event Status</th>
          <th style={tableHeaderStyle}>Description</th>
          <th style={tableHeaderStyle}>Slot</th>
          <th style={tableHeaderStyle}>Request Status</th> 
          <th style={tableHeaderStyle}>Start Task</th> 




        </tr>
      </thead>
      <tbody>
        {items.filter(item => (item.eventId.status===2 || item.eventId?.status===3 ||  item.eventId?.status===4))
        .map(item=>(
          <tr key={item.id} style={{ borderBottom: '1px solid #ddd'}}>
          {/* <th style={tableHeaderStyle}>{item.Index}</th> */}
            <td style={tableCellStyle}>{item.eventId?.eventTitle}</td>
            <td style={tableCellStyle}>{formatDate(item.eventId?.startTime)} to {formatDate(item.eventId?.endTime)}</td>
            <td style={tableCellStyle}>{item.eventId?.status===1?'Event Not Started Yet!':item.eventId?.status===2?'Event Started!':item.eventId?.status===3?'Event Closed!':item.eventId?.status===4?
            <Link to={'/student/task/'+ item.eventId._id}>
            <p style={{fontWeight:700,color:'black'}}>View Result</p>
            </Link>:item.eventId.status}</td> 
            <td style={tableCellStyle}>{item.eventId?.description}</td> 
            <td style={tableCellStyle}>{item.eventId?.slots}</td> 
            <td style={tableCellStyle}>{item.status}</td>
            <td style={tableCellStyle}>{item.status==='approve'?<Link to={'/student/task/'+ item.eventId._id}><button style={{ width: 'auto',backgroundColor: 'rgb(155, 184, 205)',margin: '0px auto',}}>Perform Task</button></Link>:item.status==='decline'?'Request Declined':item.status}
            
            </td>

             

          </tr>
        
        ))}
      </tbody>
    </table>

</div>

)}
    </>

  )
}

const tableHeaderStyle = {
  padding: '10px',
  textAlign: 'center',
  border: '1px solid #ddd',
};

// Define table cell style
const tableCellStyle = {
  padding: '10px',
  textAlign: 'center',
  border: '1px solid #ddd',
};

export default EveHistory