const express = require('express')
const app = express()
var bodyparser = require('body-parser');
app.use(bodyparser.json());
const db = require('./Server/Config/db')
Port = 3000
const cron = require('node-cron');
const Event = require('./Server/API/Event/eventModel')







app.use(express.urlencoded({ extended: false }))


app.use(express.static('Server/Public/'))


app.use(express.json())


const cors = require('cors')
app.use(cors())
const seed = require('./Server/Config/seed')


app.get("/", (req, res) => {
    res.send("Welcome to server")
})

const adminroute = require('./Server/Routes/adminRoutes')
app.use('/admin', adminroute)

const mentorRoute = require('./Server/Routes/mentorRoutes')
app.use('/mentor', mentorRoute)

const studentRoute = require('./Server/Routes/studentRoutes')
app.use('/student', studentRoute)

// cron.schedule('* * * * *', async () => {
//     try {
//       const currentTime = new Date();
//       // Find events that need status update
//       const eventsToUpdate = await Event.find({
//         startTime: { $lte: currentTime },
//         endTime: { $gt: currentTime },
//       });
  
//       // Update statuses
//       eventsToUpdate.forEach(async (event) => {
//         if (event.status !== 2) {
//           event.status = 2;
//           await event.save();
//         }
//       });
  
//       // Find events that have ended
//       const eventsToEnd = await Event.find({ endTime: { $lte: currentTime } });
  
//       // Update statuses to 'END'
//       eventsToEnd.forEach(async (event) => {
//         if (event.status !== 3) {
//           event.status = 3;
//           await event.save();
//         }
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   });



  



app.listen(Port, (err) => {
    if (err) {
        console.log("Error Occured -", err);
    }
    else {
        console.log("server connected on Port " + Port)
    }
})