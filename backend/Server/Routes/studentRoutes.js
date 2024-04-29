const router = require('express').Router()
const userController = require('../API/user/userController');
const studentController = require('../API/Student/studentController');
const assignEventController = require('../API/assignEvents/assignEventController');
const solutionController = require('../API/solutions/solutionController');
const resultController = require('../API/Result/resultController');
const multer = require('multer');




router.post('/login', userController.login)

//.............................middleWare ................................
router.use(require('../middleware/tokenChecker'))


// .............  ......
const studentStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Server/Public/studentsId/')
    },
    filename: (req, file, cb) => {
        let picname = Date.now() + file.originalname
        req.body.IdProof = 'studentsId/' + picname
        cb(null, picname)
    }
})

const uploades = multer({ storage: studentStorage })


router.post('/add', uploades.single('IdProof'), studentController.addStudent)
router.post('/single', studentController.getSingleStudent)



// ...... add in events .........
router.post('/addInEvent', assignEventController.addInEvent)
router.post('/assignedEvents', assignEventController.getAllAssignEvents)





// .......Solutions.....
const solutionStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Server/Public/solutions/')
    },
    filename: (req, file, cb) => {
        let picname = Date.now() + file.originalname
        req.body.solution = 'solutions/' + picname
        cb(null, picname)
    }
})

const Solution = multer({ storage: solutionStorage })
router.post('/solution/upload', Solution.single('solution'), solutionController.uploadSolution)




//......Result .....
router.post('/result/byTask', resultController.getResultByTask)
router.post('/result/singlByTask', resultController.singleStudentResultByTask)









router.all("*", (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})



module.exports = router