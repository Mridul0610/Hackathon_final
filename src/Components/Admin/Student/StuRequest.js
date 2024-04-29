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
  overflow:"hidden"
};

function StuRequest() {
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
          const response = await axios.post('http://localhost:3000/admin/student/all')
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
    
        const response = await axios.post('http://localhost:3000/admin/student/varification' ,data);
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
           <th style={tableHeaderStyle}>Id Proof</th>
           <th style={tableHeaderStyle}>Student Name</th>
           <th style={tableHeaderStyle}>Email</th>
           <th style={tableHeaderStyle}>College</th>
           <th style={tableHeaderStyle}>Contact</th>
           <th style={tableHeaderStyle}>Address</th>
           <th style={tableHeaderStyle}>Status</th>
           <th style={tableHeaderStyle}>Change Status</th>


         </tr>
       </thead>
       <tbody>
         {items.map(item => (
           <tr key={item.id} style={{ borderBottom: '1px solid #ddd'}}>
             <td style={tableCellStyle}><img src={'http://localhost:3000/'+item.IdProof} style={{height:100}}/></td>
             <td style={tableCellStyle}>{item.name}</td>
             <td style={tableCellStyle}>{item.email}</td> 
             <td style={tableCellStyle}>{item.college}</td> 
             <td style={tableCellStyle}>{item.contact}</td>
             <td style={tableCellStyle}>{item.address}</td>     
             <td style={tableCellStyle}>
               {item.status=='pending'?'Request Pending': item.status==="true"?'Verified': item.status}
               </td>

<td style={tableCellStyle}>
   {item.status === 'pending' && ( 
     <>
       <button onClick={() => ChangeRequestStatus(item._id, 'true')} style={{width:"auto", backgroundColor: '#9BB8CD', margin:'0 auto'}}>
         Verify
       </button>

     </>
   )}
     {item.status === 'true' && ( 
      <p style={{margin:'0 auto'}}>Student Already Verified</p>
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

export default StuRequest