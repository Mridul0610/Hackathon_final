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

function AllSolution() {
    const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("black");
    const [items, setItem] = useState([]);
    const {taskId} = useParams()
    
    useEffect(() => {
        // Simulate an API call
        fetchData()
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }, []);
     

      const fetchData= async()=>{
        const single={
          taskId:taskId
        }
        try{
          const response = await axios.post('http://localhost:3000/mentor/solution/all',single)
          setItem(response.data.data)
          setIsLoading(false); 
          console.log(response.data.data)
        } catch(error){
          console.error("error fetching data:" ,error)
          console.error(error.response)
        }
      }

      let token={
        mentorsId:sessionStorage.getItem("mentorsId"),
      }
      const storedToken = sessionStorage.getItem("token");
      if(!storedToken){
        toast.error("user not authenticated");
        return <Navigate to='/login-admin'/>
     
      }

      // const uniqueEventNames = [...new Set(items.map(item => item.eventId?.eventTitle.toUpperCase()))];
      // const eventName = uniqueEventNames.length === 1 ? uniqueEventNames[0] : "Multiple Events";
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
     <h1>Student Details</h1>
  <table style={{ borderCollapse: 'collapse', width: '100%', marginTop:'10%', marginBottom:'10%',justifyContent:'center' }}>
       <thead>
       <tr style={{ backgroundColor: 'rgb(14, 27, 77)', height: '40px', color:"white"}}>
      {/* <th style={{ textAlign: 'center' }} colSpan="8"></th>  */}
        </tr>
         <tr style={{ backgroundColor: '#9BB8CD', height: '40px', color:"black"}}>
           {/* <th style={tableHeaderStyle}>Sr.No.</th> */}
           <th style={tableHeaderStyle}>Student Name</th>
           <th style={tableHeaderStyle}>Solution</th>
           <th style={tableHeaderStyle}>College</th>
           <th style={tableHeaderStyle}>Contact</th>
           <th style={tableHeaderStyle}>Task Name</th>
           <th style={tableHeaderStyle}>Total Marks</th>
           <th style={tableHeaderStyle}>Obtained Marks</th>
           <th style={tableHeaderStyle}>Remarks</th>


         </tr>
       </thead>
       <tbody>
         {items.map(item => (
           <tr key={item._id} style={{ borderBottom: '1px solid #ddd'}}>
           {/* <th style={tableHeaderStyle}>{item.Index}</th> */}
             <td style={tableCellStyle}>{item.studentId?.name}</td>
             <td style={tableCellStyle}><img src={'http://localhost:3000/'+item.solution} style={{height:100}}/></td>
             <td style={tableCellStyle}>{item.studentId?.college}</td> 
             <td style={tableCellStyle}>{item.studentId?.contact},{item.studentId?.email}</td> 
             <td style={tableCellStyle}>{item.taskId?.taskTitle}</td>
             <td style={tableCellStyle}>{item.taskId?.totalMarks}</td>

            
             <td style={tableCellStyle}>
              {item.marks.length>0?(
              item.marks.map(mark=>(
                <div key={mark._id}>
                    {mark.score}
                </div>
             ))
              ):(
                <Link to={"/mentor/ViewSingle/"+item._id}>
                <button style={{backgroundColor:'#9BB8CD', width:'100%'}}>
                View Solution
              </button>
              </Link>
              )
            }</td>   

             <td style={tableCellStyle}>
             {item.marks.length>0?(
              item.marks.map(mark => (
                <div key={mark._id}>
                   {mark.remarks}
                   </div>
                   ))
             ):(
              <p>No Remarks</p>
             )
                  }
                    </td> 
             {/* <td style={tableCellStyle}>
               {item.status=='pending'?'Request Pending': item.status==="approve"?'Approved': item.status}
               </td> */}

 
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

export default AllSolution