const router = require('express').Router()
const userController = require('../API/user/userController');
const mentorController = require('../API/Mentor/mentorController');
const eventController = require('../API/Event/eventController');
const taskController = require('../API/Task/taskController');
const studentController = require('../API/Student/studentController');
const assignEventController = require('../API/assignEvents/assignEventController');
const resultController = require('../API/Result/resultController');
const dashboardController = require('../API/Dashboard/dashboardController');

const multer = require('multer');

router.post('/login', userController.login)

//.............................middleWare ................................
router.use(require('../middleware/tokenChecker'))





// ......... Mentor..............
const mentorStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Server/Public/mentor/')
    },
    filename: (req, file, cb) => {
        let picname = Date.now() + file.originalname
        req.body.profilePic = 'mentor/' + picname
        cb(null, picname)
    }
})

const mentorProfile = multer({ storage: mentorStorage })
router.post('/mentor/add', mentorProfile.single('profilePic'), mentorController.addMentor)
router.post('/mentor/update', mentorProfile.single('profilePic'), mentorController.updateMentorDetails)
router.post('/mentor/disable', mentorController.deleteMentor)
router.post('/mentor/single', mentorController.getSingleMentor)
router.post('/mentor/all', mentorController.getAllMentors)




// .................. event.......
router.post('/event/add', eventController.addEvent)
router.post('/event/all', eventController.getAllEvents)
router.post('/event/single', eventController.getSingleEvent)
router.post('/event/update', eventController.updateEventDetails)
router.post('/event/delete', eventController.deleteEvent)
router.post('/event/status', eventController.eventStatus)



// ....................Task.........

router.post('/task/add', taskController.addTask)
router.post('/task/single', taskController.getSingleTask)
router.post('/task/all', taskController.getAllTask)
router.post('/task/update', taskController.updateTaskDetails)
router.post('/task/delete', taskController.deleteTask)
router.post('/task/status', taskController.taskStatus)



// ....... students............
router.post('/student/varification', studentController.studentVarification)
router.post('/student/all', studentController.getAllStudents)
router.post('/student/single', studentController.getSingleStudent)



// ...... student assign event..........

router.post('/student/eventStatus', assignEventController.assignEventStatus)
router.post('/student/allAssignEvents', assignEventController.getAllAssignEvents)
router.post('/student/singleAssignEvent', assignEventController.getSingleAssignEvent)


// .................Result.........
router.post('/result/all', resultController.getAllResult)


// ........... Dashboard........
router.post('/dashboard', dashboardController.dashboard)
router.post('/dashboard/upComingEvents', dashboardController.upComingEvents)








router.all("*", (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})



module.exports = router