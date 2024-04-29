import React,{useState, useEffect} from 'react'
import axios from 'axios' 
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import * as qs from "qs"
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import './Stu.css'


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

function StuViewTask() {

    const [items, setItem] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("black");
    const [solution, setSolution] = useState([]);
    const [uploadedSol,setUploadedSol]=useState([])
    const [taskId,setTaskId] = useState([]);
    const [description, setDescription] = useState();
    const [duration, setDuration] = useState();
    const [taskTitle, setTaskTitle] = useState();
    const [totalMarks, setTotalMarks] = useState();



    const [studentId, setStudentId] = useState('')
    const {id}= useParams();
    const nav= useNavigate('')

    useEffect(() => {
        const storedStudentId= sessionStorage.getItem
        ('studentId')  
        if(storedStudentId){
          setStudentId(storedStudentId)
        }
        console.log(studentId)
        
        fetchData()
        solutions()
        setTimeout(() => {
          setIsLoading(false);
          // setIsUploading(false);
        }, 2000);
      }, []);

      const storedToken = sessionStorage.getItem("token");
      if(!storedToken){
        toast.error("user not authenticated");
        return <Navigate to='/login-admin'/>
     
      }

      const fetchData= async()=>{
        let single={
           _id:id,
           
        }
        try{
          const response = await axios.post('http://localhost:3000/admin/task/single',single) 

              setTaskId(response.data.data._id)
              setDescription(response.data.data.description)
              setDuration(response.data.data.duration)
              setTotalMarks(response.data.data.totalMarks)
              setTaskTitle(response.data.data.taskTitle)


          setIsLoading(false); 
          console.log('the data...',response.data.data) 
       
         
        } catch(error){
          console.error("error fetching data:" ,error)
          console.error(error.response)
        }
      }

     const solutions= async()=>{
      let sol={
        taskId: id,
        studentId:sessionStorage.getItem("studentId")
      }
      // console.log('TASK',taskId)
      try{
        const res = await axios.post('http://localhost:3000/mentor/solution/all',sol)
          // setUploadedSol(res.data.data)
          // setItem(res.data.data)
          setUploadedSol(res.data.data)
        console.log('sol data',res.data.data)

      }
       catch(error){
          console.error('the error',error)
       }
     }

      const handleSubmit= async ()=>{

        try{
          const formdata= new FormData();
            formdata.append('taskId',id);
            formdata.append('studentId',sessionStorage.getItem("studentId"));
            formdata.append('solution', solution)
    
        const response = await axios.post('http://localhost:3000/student/solution/upload' , formdata);
        // fetchData()
        if(response.data.success){
          setSolution(response.data.data)
          console.log(response.data.data);
        toast.success(response.data.message)
        nav('/student/event')
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
        // position="relative"
      />
    )} 

{!isLoading &&(
 
 <section id="speakers">
   <div className="section-header" style={{ marginTop: 70, height: 50 }}>
     <h2>Upload Solution</h2>
     {/* <p>Candidates!! Register yourself</p> */}
   </div>
   <div className="container" data-aos="fade-up" style={{ display: 'flex', flexWrap: 'wrap' }}>
   {/* {items?.map(item=> ( */}
       <div style={{ padding: 50, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>

           {/* <img src={'http://localhost:3000/' + item?.profilePic} style={{ width: '100%', height: 200 }} /> */}
           <div className='row'>
            <div className='col-md-12'>
             <h3>{taskTitle.toUpperCase()}</h3>
               </div>
             
            
            <div className='col-md-12'>
            <h4> <span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}}>Details</span>
             {description} 
             </h4>
             </div>
           
  
           <div className='col-md-6'>          
           <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black', marginRight:10}}>Duration</span>{duration}</p>
          
           {/* <div className='col-md-6'> */}
             <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black',marginRight:10}}>Total Marks</span>  {totalMarks}</p>
          </div>

             {uploadedSol?.length<=0 ? (
              <div>
              <input type='file' onChange={(e)=> setSolution(e.target.files[0])} required className='form-control'/>
              
              <button type='submit'  style={{backgroundColor:'rgb(14, 27, 77)',color:'white', padding:'10px 10px',width:'30%', marginLeft:'25%'}}
              onClick={() =>handleSubmit(id)}
               >
                Upload Solution
              </button>
              </div>
               ):(
              
              <p style={{backgroundColor:'rgb(14, 27, 77)',color:'white', padding:'10px 10px',width:'30%', marginLeft:'25%'}}>Solution Uploaded Successfully</p> )}
              

           </div>
       </div>
   {/* ))} */}
   </div>
 </section>
 
      )} 

    </>
  )
}

export default StuViewTask