const Result = require('./resultModel')
const Solution = require('../solutions/solutionModel')
const Task = require('../Task/taskModel')


const getAllResult = (req, res) => {
    Result.find(req.body).populate('eventId').populate('taskId').populate('studentId').populate('solutionId').sort({ createdAt: -1 })
        .then((data) => {
            res.send({
                success: true,
                status: 200,
                message: "All Solutions Loaded",
                data: data,
                total: data.length
            })
        })
        .catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: err.message
            })
        })
}


const getResultByTask = async (req, res) => {
    let validation = ""

    if (!req.body.taskId) {
        validation = "taskId is required"
    }
    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        const task = Task.findById({ _id: req.body.taskId }).then(async(data) => {
            const topThreeStudents = await Result.find({ taskId: req.body.taskId }).sort({ marksObtained: -1 }).limit(3).populate('studentId').populate('eventId').populate('taskId').populate('solutionId');
            res.send({
                success: true, status: 200, message: 'Success', totalMarks: data.totalMarks, topStudents: topThreeStudents, total: topThreeStudents.length
            })
        })
    }
}

const getSingleResult = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is required"
    }

    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        Result.findOne({ _id: req.body._id }).populate('taskId').populate('studentId').populate('solutionId').populate('eventId')

            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 500, message: "Result Does not exist" })
                }
                else
                    res.send({ success: true, status: 200, message: "Result Loaded", data: data })
            })
            .catch((err) => {
                res.send({ success: false, status: 500, message: err.message })
            })
    }
}


const singleStudentResultByTask = (req, res) => {
    let validation = ""

    if (!req.body.taskId) {
        validation = "taskId is required"
    }
    if (!req.body.studentId) {
        validation = "studentId is required"
    }
    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        Result.find({ taskId: req.body.taskId, studentId: req.body.studentId }).populate('taskId').populate('studentId').populate('solutionId').populate('eventId')
            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 500, message: "Result Does not exist" })
                }
                else
                    res.send({ success: true, status: 200, message: "Result Loaded Successfully", data: data, total: data.length })
            })
            .catch((err) => {
                res.send({ success: false, status: 500, message: err.message })
            })
    }
}




module.exports = { getAllResult, getResultByTask, getSingleResult, singleStudentResultByTask }