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

function StuResult() {
    const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("black");
    const [items, setItem] = useState([]);
    const [taskId,setTaskId] = useState([])
    const {id} = useParams()
 
    useEffect(()=>{
        fetchData()
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
    }, [])

      
  let token={
    taskId:id,
    // taskId:taskId,
    studentId:sessionStorage.getItem("studentId"),
  }
  const storedToken = sessionStorage.getItem("token");
  if(!storedToken){
    toast.error("user not authenticated");
    return <Navigate to='/login-admin'/>
 
  }


  const fetchData= async()=>{
   const task={
    _id:id,
    // studentId:sessionStorage.getItem('studentId')

   }
    try{
      const response = await axios.post('http://localhost:3000/student/result/singlByTask',token,task)
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
     <h1>Result</h1>
  <table style={{ borderCollapse: 'collapse', width: '100%', marginTop:'10%', marginBottom:'10%',justifyContent:'center' }}>
       <thead>
         <tr style={{ backgroundColor: 'rgb(14, 27, 77)', height: '40px', color:"white"}}>
           <th style={tableHeaderStyle}>Event Name</th>
           <th style={tableHeaderStyle}>Task Name</th>
           <th style={tableHeaderStyle}>Duration</th>
           <th style={tableHeaderStyle}>Remarks</th>
           <th style={tableHeaderStyle}>Score</th>



         </tr>
       </thead>
       <tbody>
         {items?.map(item => (
           <tr key={item.id} style={{ borderBottom: '1px solid #ddd'}}>
             <td style={tableCellStyle}>{item.eventId.eventTitle}</td>
             <td style={tableCellStyle}>{item.taskId?.taskTitle}</td> 
             <td style={tableCellStyle}>{item.taskId?.duration}</td> 
             <td style={tableCellStyle}>{item.solutionId.marks.map(mark=>
              <div key={mark._id}>
                {mark.remarks}
              </div>)}</td> 
             <td style={tableCellStyle}>{item.marksObtained}</td>
 
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



export default StuResult

