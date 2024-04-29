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

function Result() {
    const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("black");
    const [items, setItem] = useState([]);
    const [eventId, setEventId] = useState([])
 
    useEffect(() => {
        // Simulate an API call
        fetchData()
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }, []);
     
      const fetchData= async()=>{
        try{
          const response = await axios.post('http://localhost:3000/admin/result/all')
          setItem(response.data.data)
          setIsLoading(false); 
          console.log(response.data.data)
        } catch(error){
          console.error("error fetching data:" ,error)
          console.error(error.response)
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
         <tr style={{ backgroundColor: '#9BB8CD', height: '40px', color:"black"}}>
           {/* <th style={tableHeaderStyle}>Sr.No.</th> */}
           <th style={tableHeaderStyle}>Student Name</th>
           <th style={tableHeaderStyle}>College</th>
           <th style={tableHeaderStyle}>Contact</th>
           <th style={tableHeaderStyle}>Event Name</th>
           <th style={tableHeaderStyle}>Task Name</th>
           <th style={tableHeaderStyle}>Score</th>
           <th style={tableHeaderStyle}>Remarks</th>
           <th style={tableHeaderStyle}>Publish Result</th>


         </tr>
       </thead>    
        {items.map(item => (
       <tbody>
    
           <tr key={item.id} style={{ borderBottom: '1px solid #ddd'}}>
           {/* <th style={tableHeaderStyle}>{item.Index}</th> */}
             <td style={tableCellStyle}>{item.studentId?.name}</td>
             <td style={tableCellStyle}>{item.studentId?.college}</td> 
             <td style={tableCellStyle}>{item.studentId?.contact},{item.studentId?.email}</td> 
             <td style={tableCellStyle}>{item.eventId?.eventTitle}</td>
             <td style={tableCellStyle}>{item.taskId?.taskTitle}</td>
             <td style={tableCellStyle}>{item.solutionId?.marks.map(mark => (
                <div key={mark._id}>
                   {mark.score}
                   </div>
                   ))}
                    </td> 
             <td style={tableCellStyle}>{item.solutionId?.marks.map(mark=>(
                <div key={mark._id}>
                    {mark.remarks}
                </div>
             ))}</td>     

<td>
  <Link to={'/ViewSingleEve/'+ item.eventId._id}>
  <button style={{backgroundColor:'rgb(14, 27, 77)',color:'white', width:'60%'}}>Publish Result</button>
  </Link>
</td>

           </tr>
          

       </tbody> ))}
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

export default Result