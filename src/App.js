import React from 'react'
import Home from './Components/Admin/Home'
// import IndexRouters from './Components/IndexRouters'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
// import Contact from './Contact';
import Speaker from './Components/Admin/Mentors/Speaker';
import Master from './Components/Layouts/Master';
import About from './Components/About';
import Events from './Components/Admin/Events/Events';
import Task from './Components/Admin/Task/Task';
import StuRequest from './Components/Admin/Student/StuRequest';
import AddMentor from './Components/Admin/Mentors/AddMentor';
import AdminLogin from './Components/Auth/AdminLogin';
import EmpBlankLayout from './Components/Layouts/EmpBlankLayout';
import UpdateMentor from './Components/Admin/Mentors/UpdateMentor';
import AddEvent from './Components/Admin/Events/AddEvent';
import UpdateEvent from './Components/Admin/Events/UpdateEvent';
import StuAssignedEvents from './Components/Admin/Student/StuAssignedEvents';
import AddTask from './Components/Admin/Task/AddTask';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import UpdateTask from './Components/Admin/Task/UpdateTask';
import RegisteredEvents from './Components/Admin/Events/RegisteredEvents';
import Result from './Components/Admin/Student/Result';
import ViewSingleEve from './Components/Admin/Student/ViewSingleEve';

/////////////////////////student//////////////////////////////////////////////////////////////

import StudentLayout from './Components/Layouts/StudentLayout';
import StudentLogin from './Components/Auth/StudentLogin';
import StuHome from './Components/Student/StuHome';
import StuEvent from './Components/Student/StuEvent';
import StuSpeaker from './Components/Student/StuSpeaker';
import StuTask from './Components/Student/StuTask';
import StuResult from './Components/Student/StuResult';
// import StuRegister from './Components/Student/StuRegister';
import StuEveRegister from './Components/Auth/StuEveRegister';
import StuViewEvent from './Components/Student/StuViewEvent';
import StuViewTask from './Components/Student/StuViewTask';
import EveHistory from './Components/Student/EveHistory';

/////////////////////////////////Mentor//////////////////////////////////////////////////////////////

import MentorLogin from './Components/Auth/MentorLogin';
import MentorLayout from './Components/Layouts/MentorLayout';
import MenHome from './Components/Mentor/MenHome';
import MenAssignedEve from './Components/Mentor/MenAssignedEve';
import AllSolution from './Components/Mentor/Student/AllSolution';
import AddMarks from './Components/Mentor/Student/AddMarks';
import MenTask from './Components/Mentor/MenTask';
import ViewSingleSolu from './Components/Mentor/Student/ViewSingleSolu';


function App() {
  return (
    <>
    {/* ///////////////////////////////////////admin////////////////////////////////////// */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Master/>}>
         {/* <Route path='/' element={<AdminLogin/>}></Route> */}
         <Route path='/' element={<Home/>}></Route>
          <Route path='/speaker' element={<Speaker/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/event' element={<Events/>}></Route>
          <Route path='/task' element={<Task/>}></Route>
          <Route path='/AddTask' element={<AddTask/>}></Route>
          <Route path='/UpdateTask/:id' element={<UpdateTask/>}></Route>
          <Route path='/StuRequest' element={<StuRequest/>}></Route>
          <Route path='/AddMentor' element={<AddMentor/>}></Route>
          <Route path='/UpdateMentor/:id' element={<UpdateMentor/>}></Route>
          <Route path='/AddEvent' element={<AddEvent/>}></Route>
          <Route path='/UpdateEvent/:id' element={<UpdateEvent/>}></Route>
          <Route path='/RegisteredEve' element={<RegisteredEvents/>}></Route>
          <Route path='/AssignedEvent' element={<StuAssignedEvents/>}></Route>
          <Route path='/Result' element={<Result/>}></Route>
          <Route path='/ViewSingleEve/:eventId' element={<ViewSingleEve/>}></Route>
        </Route>


{/* ////////////////////////////////////////student///////////////////////////////////////////////////////////// */}

        <Route path='/student' element={<StudentLayout/>}>
          <Route path='/student/' element={<StuHome/>}/>
          <Route path='/student/speaker' element={<StuSpeaker/>}/>
          <Route path='/student/event' element={<StuEvent/>}/>
          <Route path='/student/task/:eventId' element={<StuTask/>}/>
          <Route path='/student/result/:id' element={<StuResult/>}/>
          <Route path='/student/ViewEvent/:id' element={<StuViewEvent/>}/>
          <Route path='/student/ViewTask/:id' element={<StuViewTask/>}/>
          <Route path='/student/EveHistory' element={<EveHistory/>}/>
        </Route>

{/* ////////////////////////////////////////Mentor/////////////////////////////////////////////////////////////////////// */}

        <Route path='/mentor' element={<MentorLayout/>}>
          <Route path='/mentor' element={<MenHome/>}/>
          <Route path='/mentor/event' element={<MenAssignedEve/>}/>
          <Route path='/mentor/task/:eventId' element={<MenTask/>}/>
          <Route path='/mentor/solution/:taskId' element={<AllSolution/>}/>
          {/* <Route path='/mentor/addMarks/:id' element={<AddMarks/>}/> */}
          <Route path='/mentor/ViewSingle/:id' element={<ViewSingleSolu/>}/>
          
 
        </Route>


{/* /////////////////////////////////////////auth///////////////////////////////////////////////////////////////////////////////////////     */}


        <Route path='/login-admin' element={<EmpBlankLayout/>}>
           <Route path='/login-admin' element={<AdminLogin/>}> </Route>
           <Route path='/login-admin/student' element={<StudentLogin/>}> </Route>
           <Route path='/login-admin/register' element={<StuEveRegister/>}> </Route>
           <Route path='/login-admin/mentor' element={<MentorLogin/>}> </Route>

           
        </Route>

        

      </Routes>
      

   </BrowserRouter>
      <ToastContainer containerId="custom-toast-container"
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

<ToastContainer />
    </>
  )
}

export default App