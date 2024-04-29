import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link, useNavigate,Navigate, useParams} from 'react-router-dom'
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import "../Form.css"
import Select from 'react-select'



const override= {
    display: "block",
    margin: "0 auto",
    marginTop: "250px",
    marginBottom: '200px',
    borderColor:"black",
    justifyContent: 'center',
    alignItems: 'center',
   
  };

function UpdateTask() {
    const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("black");
    const [eventId, setEventId]= useState()
    const [taskTitle,setTaskTitle]= useState("")
    const [description,setDescription]= useState()
    const [duration,setDuration]= useState()
    const [totalMarks,setTotalMarks]= useState()
    const [storeArray, setStoreArray]= useState([])
    const {id}= useParams();
    const nav = useNavigate()


    useEffect(()=>{
        let single={
            _id:id
        }
        const response = axios.post('http://localhost:3000/admin/task/single',single).then(
            response=>{
                console.log(response.data.data)
                setDescription(response.data.data.description)
                setDuration(response.data.data.duration)
                setTaskTitle(response.data.data.taskTitle)
                setTotalMarks(response.data.data.totalMarks)
                setEventId(response.data.data.eventId)
            
                 
            }
        )
        getAllEvents();
        setTimeout(() => {
            setIsLoading(false);
          }, 2000);
    },[])

    const storedToken = sessionStorage.getItem("token");
    if(!storedToken){
      alert("user not authenticated");
      return <Navigate to='/login-admin'/>
    
      
    }
    let token={
      _id:sessionStorage.getItem("_id"),
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
         try{
   
            const input = {
                 _id:id,
                  eventId:storeArray,
                  taskTitle:taskTitle,
                  description:description,
                  duration:duration,
                  totalMarks:totalMarks
                };
  
         const response = await axios.post('http://localhost:3000/admin/task/update', input, token)
         console.log(response.data.data); // log the response from the server
         toast.success(response.data.message)
          nav('/task')
        
         }catch(error){
          toast.error(error.data.message)
          console.error(error.response);
         }
      }  

      const getAllEvents = async(e)=>{
        //  e.preventDefault()
        // const selectedOption = selectedOption.push
         try{
           const response= await axios.post("http://localhost:3000/admin/event/all")
           console.log(response.data.data)
           setEventId(response.data.data)
          //  setMentor(response.data.data)
         }catch (error){
             console.error('error fetching data:',error)
         }
      
      }

      const selectedOption = (e)=> {
        console.log('the data',e)
        const arr=[] 
        e.forEach(e => {
          arr.push(e.value);
      
        setStoreArray(arr)
        console.log('the data:',e)
      });  
      
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
          {!isLoading&&( 
      <div className='box'>

      <form className='row' onSubmit={handleSubmit} style={{marginTop:100 ,color:'black', width:'40%', margin: '0 auto'}}>
      
        {/* <div className='form-group'>   */}
      <h1>Update Task</h1>

      <div className='col-md-6'>
                Task Title
            <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className='form-control'/>
        </div>
 
        <div className='col-md-6'>
                Event Title

            <input type="text" value={eventId?.eventTitle} onChange={(e) => setEventId(e.target.value)} className='form-control'/>
            {/* <Select 
            isMulti={true}
            options={eventId?.map((event)=>({
            value:event._id,
            label:event.eventTitle,
            }))}
            onChange={selectedOption}
            /> */}
        </div>


      <div className='col-md-12'>
        Description <input type="text" value={description}  onChange={(e) => setDescription(e.target.value)} className='form-control'/><br/>
        </div>

        <div className='col-md-6'>
        Duration <input type="text" value={duration}  onChange={(e) => setDuration(e.target.value)} className='form-control'/><br/>
        </div>

        <div className='col-md-6'>
        Total Marks <input type="number" min='0' value={totalMarks}  onChange={(e) => setTotalMarks(e.target.value)} className='form-control'/><br/>
        </div>

        <div className='btn' style={{display:'flex'}}>
        <button type="submit">Save</button>
        <Link to={'/task'}>
        <button style={{marginLeft:20, width:'100%'}}>Show Task List</button></Link>
        </div> 
        {/* </div> */}
      </form>
    </div>)}  
    </>
  )
}

export default UpdateTask