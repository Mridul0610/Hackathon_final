import React,{useState, useEffect} from 'react'
import axios from 'axios' 
import { Link, Navigate, useNavigate } from 'react-router-dom'
import * as qs from "qs"
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import './Student.css'

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

function StuAssignedEvents() {
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
     
      const fetchData= async()=>{
        try{
          const response = await axios.post('http://localhost:3000/admin/student/allAssignEvents')
          setItem(response.data.data)
          setIsLoading(false); 
          console.log(response.data.data)
        } catch(error){
          console.error("error fetching data:" ,error)
          console.error(error.response)
        }
      }


      const ChangeRequestStatus= async (id,status)=>{
        // e.preventDefault();
        try{
          const data={
            _id:id,
            status:status,
          }
    
        const response = await axios.post('http://localhost:3000/admin/student/eventStatus' ,data);
        console.log(`Request with ID ${id} has been ${status === 'approve' ? 'approved' : 'declined'} `)
    
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
  
  <div className='container'>
     <h1>Registered Student</h1>
  <table style={{ borderCollapse: 'collapse', width: '100%', marginTop:'10%', marginBottom:'10%',justifyContent:'center' }}>
       <thead>
         <tr style={{ backgroundColor: 'rgb(14, 27, 77)', height: '40px', color:"white"}}>
           {/* <th style={tableHeaderStyle}>Sr.No.</th> */}
           <th style={tableHeaderStyle}>Student Name</th>
           <th style={tableHeaderStyle}>Email</th>
           <th style={tableHeaderStyle}>College</th>
           <th style={tableHeaderStyle}>Contact</th>
           <th style={tableHeaderStyle}>Event Name</th>
           <th style={tableHeaderStyle}>Slot</th>
           <th style={tableHeaderStyle}>Status</th>
           <th style={tableHeaderStyle}>Change Status</th>


         </tr>
       </thead>
       <tbody>
         {items.map(item => (
           <tr key={item.id} style={{ borderBottom: '1px solid #ddd'}}>
           {/* <th style={tableHeaderStyle}>{item.Index}</th> */}
             <td style={tableCellStyle}>{item.studentId?.name}</td>
             <td style={tableCellStyle}>{item.studentId?.email}</td> 
             <td style={tableCellStyle}>{item.studentId?.college}</td> 
             <td style={tableCellStyle}>{item.studentId?.contact}</td> 
             <td style={tableCellStyle}>{item.eventId?.eventTitle}</td>
             <td style={tableCellStyle}>{item.eventId?.slots}</td>     
             <td style={tableCellStyle}>
               {item.status=='pending'?'Request Pending': item.status==="approve"?'Approved': item.status==='decline'?'Request Declined': item.status}
               </td>

<td style={tableCellStyle}>
   {item.status === 'pending' && ( 
     <div className='content'>
    
       <button onClick={() => ChangeRequestStatus(item._id, 'approve')} style={{backgroundColor: 'green'}}>
       <i className="fa-solid fa-check"></i> 
       </button>
       <button onClick={() => ChangeRequestStatus(item._id, 'decline')} style={{backgroundColor:'crimson'}}>
       <i className="fa-solid fa-xmark"></i>   
       </button>
      
     </div>
   )}
     {item.status === 'approve' && ( 
      <p style={{margin:'0 auto'}}>Student Already Approved!</p>
)}

{item.status === 'decline' && ( 
      <p style={{margin:'0 auto'}}>Request Declined!</p>
)}

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

export default StuAssignedEvents