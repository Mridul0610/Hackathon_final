const router = require('express').Router()
const userController = require('../API/user/userController');
const eventController = require('../API/Event/eventController');
const taskController = require('../API/Task/taskController');
const solutionController = require('../API/solutions/solutionController');



router.post('/login', userController.login)

//.............................middleWare ................................
router.use(require('../middleware/tokenChecker'))





// ......... Events..............
router.post('/event/all', eventController.getAllEvents)



// .............Task.....
router.post('/task/all', taskController.getAllTask)




// .............solutions......
router.post('/solution/all', solutionController.getAllSolutions)
router.post('/solution/single', solutionController.getSingleSolution)
router.post('/solution/updateMarks', solutionController.updateMarks)







router.all("*", (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})



module.exports = router