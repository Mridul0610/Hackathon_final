import React,{useState, useEffect} from 'react'
import axios from 'axios' 
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import * as qs from "qs"
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';


const override= {
    display: "block",
    margin: "0 auto",
    marginTop: "200px",
    marginBottom:'200px',
    borderColor:"black",
    justifyContent: 'center',
    alignItems: 'center',
    overflow:"hidden"
   
  };

function ViewSingleSolu() {
    const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("black");
    const [items, setItem] = useState([]);
    const [mentorId, setMentorId] = useState([])
    const [marks, setMarks] = useState([])
    const {id}= useParams();
    const nav = useNavigate()
    

    useEffect(() => {
        const storedMentorId= sessionStorage.getItem('mentorsId')  
        if(storedMentorId){
          setMentorId(storedMentorId)
        }
        // console.log(mentorId)
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

      const fetchData= async()=>{
        let single={
           _id:id,
          //  studentId:_id
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

      const handleSubmit = async (id,studentId)=>{
        
        try{
            const data={
               score:marks.score,
               remarks:marks.remarks,
               studentId:studentId,
               mentorId:sessionStorage.getItem('mentorId'),
               _id:id,
              //  _id:id
            }
        
          const response = await axios.post('http://localhost:3000/mentor/solution/updateMarks', data)
          if(response.data.success){
            console.log(response.data.data);
            toast.success(response.data.message)
            nav('/mentor/event')
          }
          else{
            toast.error(response.data.message)
          } 
}catch (error) {
    console.error("Error adding score:", error);
}
      }

      const handleMarksChange = (e) => {
        setMarks({ ...marks, score: e.target.value });
      };
      
      const handleRemarksChange = (e) => {
        setMarks({ ...marks, remarks: e.target.value });
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

<section id="speakers">
<div className="section-header" style={{ marginTop: 70, height: 50 }}>
  <h2>Upload Marks</h2>
</div>
<div className="container" data-aos="fade-up" style={{ display: 'flex', flexWrap: 'wrap' }}>
{items?.map(item=>(
    <div className='col-lg-12' key={item._id} style={{ padding: 50, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>

        <img src={'http://localhost:3000/' + item.solution} style={{ width: '50%', height: 300, margin:'0 auto' }} />
        <div className='row'>
         <div className='col-md-12'>
          <h3>{item.taskId.taskTitle.toUpperCase()}</h3>
            </div>
          
         
         <div className='col-md-12'>
         <h4> <span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}}>Task Details</span>
          {item.taskId?.description} 
          </h4>
          </div>
              
        <div className='col-md-6'>          
        <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black', marginRight:10}}>Duration</span>{item.taskId?.duration}</p>
       
        {/* <div className='col-md-6'> */}
          <p><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black',marginRight:10}}>Total Marks</span>  {item.taskId?.totalMarks}</p>
       </div>

        <h5><span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black' , marginRight:10}}>Student Name</span>
          {item.studentId?.name.toUpperCase()}
         <span className="badge badge-pill badge-info" style={{backgroundColor:'rgb(155, 184, 205)',color:'black', marginLeft:20, marginRight:10}}>
          College</span> 
          {item.studentId?.college} 
          
         </h5>

         <h2>Upload Marks</h2>
          <div className='col-md-6'>
         <label htmlFor='score'>Score</label> 
              <input type='number'min={0} onChange={handleMarksChange} value={item.marks?.score} required className='form-control'/>
              {/* {item.marks && item.marks.score> item.totalMarks &&(
                toast.error('score exceeds')
              )} */}
         </div> 
         
         <div className='col-md-6'>
         <label htmlFor='remarks'>Remarks</label>
             <input type='text' onChange={handleRemarksChange} value={item.marks?.remarks} required className='form-control'/>
         </div> 
         
            <button style={{backgroundColor:'rgb(14, 27, 77)', color:'white',width:'50%'}} type='submit' onClick={()=>handleSubmit(item._id,item.studentId?._id)}>Upload</button>
           

        </div>
    </div>
    ))}
</div>
</section>

   )} 

    </>
  )
}

export default ViewSingleSolu