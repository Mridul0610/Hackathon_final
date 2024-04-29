import React,{useState, useEffect} from 'react'
import axios from 'axios' 
import { Link, Navigate, useNavigate } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import Select from 'react-select'
import "../Form.css"

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


function AddTask() {
    const [isLoading, setIsLoading] = useState(true);
    let [color, setColor] = useState("black");
    const [eventId, setEventId]= useState([])
    const [event,setEvent]= useState()
    const [taskTitle,setTaskTitle]= useState()
    const [description,setDescription]= useState()
    const [duration,setDuration]= useState()
    const [totalMarks,setTotalMarks]= useState()
    const [storeArray, setStoreArray]= useState([])
    const nav = useNavigate()


    useEffect(() => {
      getAllEvent();
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);

    const handleSubmit= async(e)=>{
       e.preventDefault()

        try{
            const input = {
            //  _id:id,

              eventId:storeArray,
              taskTitle:taskTitle,
              description:description,
              duration:duration,
              totalMarks:totalMarks
            };
            const response= await axios.post("http://localhost:3000/admin/task/add",input)
            console.log(response.data.data);
            toast.success(response.data.message)
             nav('/task')
        }catch(error){
            console.error("error fetching data:" ,error)
            console.error(error.response)
        }
    }

    const getAllEvent = async(e)=>{
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
   />
   )}


{!isLoading &&(

    <div className='box'>
      <form className='row' onSubmit={handleSubmit} style={{marginTop:100 ,color:'black', width:'40%', margin: '0 auto'}}>
        {/* <div className='form-group'>   */}
      
        <h1> Add Task</h1>

        <div className='col-md-6'>
            <label>
                Task Title
            </label>
       <input type="text" onChange={(e) => setTaskTitle(e.target.value)} required  className='form-control'/>
        </div>
        
        <div className='col-md-6'>
             
        <label>
        Event Name </label>
        <Select
          isMulti={true}
          options = {eventId.map((event) => ({
          value:event._id,
          label: event.eventTitle,
          // className:"form-control"
       
        }))}  
         onChange={selectedOption}
        // onChange={(selectedOption) => setMentor(selectedOption)}
        // value={mentor}
        />

        </div>

        {/* <div className='col-md-6'> */}
        <label>
        Description </label><input type="text" onChange={(e) => setDescription(e.target.value)} className='form-control'/>
        {/* </div> */}

        <div className='col-md-6'>
        <label>
         Duration </label><input type="text" onChange={(e) => setDuration(e.target.value)} className='form-control'/>
        </div>

        <div className='col-md-6'>
        <label>
         Total Marks </label><input type="number" min={0} onChange={(e) => setTotalMarks(e.target.value)} className='form-control'/>
        </div>

        <button type="submit" style={{backgroundColor:'rgb(14, 27, 77)',color:'white'}}>Save</button>
        
      {/* </div> */}
      </form> 
      </div> 
)}
    </>
  )
}

export default AddTask