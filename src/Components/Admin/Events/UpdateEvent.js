import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate,Navigate } from 'react-router-dom';
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
  };

function UpdateEvent() {
        const [isLoading, setIsLoading] = useState(true);
        let [color, setColor] = useState("black");
        const [allmentorsId,setAllMentorsId] = useState([]);
        const [selected_mentor, setSelectedMentor] = useState('')
        const [name, setName] = useState();
        const [email, setEmail] = useState();
        const [eventTitle, setEventTitle] = useState();
        const [slots, setSlots] = useState();
        const [description, setDescription] = useState();
        const [startTime, setStartTime] = useState('');
        const [endTime, setEndTime] = useState('');
        const [storeArray, setStoreArray]= useState([])
        // const [items, setItem] = useState([]);
        const [eventDate, setEventDate] = useState();
        const {id}= useParams();
        const nav = useNavigate()
        


        useEffect(()=>{
            let single={
              _id:id
            }
            const response = axios.post('http://localhost:3000/admin/event/single', single,token).then(
              response=>{
                console.log(response.data.data)
                // setSelectedMentor(response.data.data.mentorsId._id);
                // console.log('mentor id',response.data.data.mentorsId.map(e=>
                //   {e._id}))
                setName(response.data.data.name);
                setEmail(response.data.data.email);
                setDescription(response.data.data.description)
                setStartTime(response.data.data.startTime)
                setEndTime(response.data.data.endTime)
                setSlots(response.data.data.slots)
                setEventTitle(response.data.data.eventTitle)
                // setItem(response.data.data)
                // setMentorsId({ ...mentorData });
      
                const mentorIds = response.data.data.mentorsId.map(mentor => mentor._id);
                console.log('mentor ids:', mentorIds);
          
                setSelectedMentor(mentorIds);
      
              }
            )
            getAllMentors();
            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
          },[id])

          const getAllMentors = async(e)=>{
            //  e.preventDefault()
            // const selectedOption = selectedOption.push
             try{
               const response= await axios.post("http://localhost:3000/admin/mentor/all")
               console.log('all mentors',response.data.data)
               setAllMentorsId(response.data.data)
              //  setMentor(response.data.data)
             }catch (error){
                 console.error('error fetching data:',error)
             }
          
          }

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
       
             const formData= {
             _id: id,
             mentorsId:selected_mentor,
             name: name,
             email: email,
             slots:slots,
             startTime:formatDate(startTime),
             endTime: formatDate(endTime),
             eventTitle:eventTitle,
             description:description
             }
             const response = await axios.post('http://localhost:3000/admin/event/update', formData, token)
             console.log('updated data',response.data.data); // log the response from the server
             toast.success(response.data.message)
             nav('/event') 
            
             }catch(error){
              toast.error(error.data.message)
              console.error(error.response);
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
    {!isLoading&&( 

        <div className='box' >

        <form className='row' onSubmit={handleSubmit} style={{marginTop:100 ,color:'black', width:'40%', margin: '0 auto'}}>
        
          {/* <div className='form-group'>   */}
          <h1>Update Event</h1>
          <div className='col-md-6'>
                 Event Name
         <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} className='form-control'/></div>

     <div className='col-md-6'>   
        <label>
        Mentor Name </label>
        <Select
          isMulti={true}
          value={selected_mentor}
          // onChange={selectedOption}
          options = {allmentorsId.map((mentor) => ({
          value:mentor._id,
          label: mentor.name,
          // className:"form-control"
       
        }))}  
         
        onChange={(e)=>(selectedOption) => setSelectedMentor(selectedOption)}
        // value={mentor}
        />
         
         {/* <select className="form-control" value={selected_mentor} onChange={(e)=>{setSelectedMentor(e.target.value)}}>
                    {allmentorsId.map(
                        (e,index)=>{
                            // console.log('all mentors:',e)
                            return(
                                <>
                                <option key={e._id} value={e._id}>{e.name}</option>
                                </>
                            )
                        }
                     )}
                                         
          </select> */}

        </div>

         <div className='col-md-6'>
          Description <input type="text" value={description}  onChange={(e) => setDescription(e.target.value)} className='form-control'/><br/>
         </div>

         <div className='col-md-6'>
          Slots <input type="number" min='0' value={slots}  onChange={(e) => setSlots(e.target.value)} className='form-control'/><br/>
         </div>
          
         <div className='col-md-6'>
          Start Time <input type="datetime-local" value={startTime}  onChange={(e) => setStartTime(e.target.value)} className='form-control'/><br/>
         </div>

         <div className='col-md-6'>
          End Time <input type="datetime-local" value={endTime}  onChange={(e) => setEndTime(e.target.value)} className='form-control'/><br/>
         </div>

          <div className='btn' style={{display:'flex'}}>
          <button type="submit">Save</button>
          <Link to={'/event'}>
          <button style={{marginLeft:20, width:'100%'}}>Show Event List</button></Link>
          </div> 
          {/* </div> */}
        </form>
      </div>)}
    </>
  )
}

export default UpdateEvent