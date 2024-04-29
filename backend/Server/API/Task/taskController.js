const Task = require('./taskModel')

const Event = require('../Event/eventModel')




const addTask = async (req, res) => {
    let validation = ''
    if (!req.body.eventId || !req.body.taskTitle || !req.body.totalMarks || !req.body.duration) {
        validation += 'Please make sure to fill out all fields.'
    }
    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        let event = await Event.findOne({ _id: req.body.eventId })
        if (event == null || event == undefined) {
            res.send({ success: false, status: 500, message: "Event Does Not Exists" })
        }
        else {
            let total = await Task.countDocuments()
            let task = new Task()
            task.autoId = total + 1
            task.taskTitle = req.body.taskTitle
            task.eventId = req.body.eventId
            task.description = req.body.description
            task.duration = req.body.duration
            task.totalMarks = req.body.totalMarks
            task.save().then((data) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "Task Added Successfully",
                    data: data
                })

            }).catch(() => {
                res.send({ success: false, status: 500, message: err.message })

            })
        }
    }
}


const getAllTask = (req, res) => {
    Task.find(req.body).populate('eventId').sort({ createdAt: -1 })
        .then((data) => {
            res.send({
                success: true,
                status: 200,
                message: "All Tasks Loaded",
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


const getSingleTask = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is required"
    }

    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        Task.findOne({ _id: req.body._id }).populate('eventId')

            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 500, message: "Task Does not exist" })
                }
                else
                    res.send({ success: true, status: 200, message: "Single Task Loaded", data: data })
            })
            .catch((err) => {
                res.send({ success: false, status: 500, message: err.message })
            })
    }
}

const updateTaskDetails = (req, res) => {
    let validation = ''
    if (!req.body._id)
        validation += '_id is required'
    if (!!validation)
        res.send({ success: false, status: 500, message: validation })
    else {
        Task.findOne({ _id: req.body._id })
            .then(async result => {
                if (result == null)
                    res.send({ success: false, status: 500, message: 'No Event Found' })
                else {
                    if (!!req.body.eventId)
                        result.eventId = req.body.eventId
                    if (!!req.body.taskTitle)
                        result.taskTitle = req.body.taskTitle
                    if (!!req.body.description)
                        result.description = req.body.description
                    if (!!req.body.duration)
                        result.duration = req.body.duration
                    if (!!req.body.totalMarks)
                        result.totalMarks = req.body.totalMarks
                    result.save()
                        .then(updatedRes => {
                            res.send({ success: true, status: 200, message: " Updated successfull", data: updatedRes })
                        })
                        .catch(error => {
                            res.send({ success: false, status: 500, message: error.message })
                        })
                }
            }).catch(error => {
                res.send({ success: false, status: 500, message: error.message })
            })
    }
}

const deleteTask = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is required"
    }

    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        Task.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false,
                        status: 500,
                        message: "Task Does not exist"
                    })
                }
                else {
                    Task.deleteOne({ _id: req.body._id })
                        .then((updatedData) => {
                            res.send({ success: true, status: 200, message: "Task Deleted", data: updatedData })
                        })
                        .catch((err) => {
                            res.send({ success: false, status: 500, message: err.message })
                        })
                }
            })
            .catch((err) => {
                res.send({ success: false, status: 500, message: err.message })
            })
    }
}

const taskStatus = (req, res) => {
    let validation = ""

    if (!req.body._id) {
        validation += "_id is required "
    }
    if (!req.body.status) {
        validation += " status is required"
    }

    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        Task.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 500, message: "Task Does not exist" })
                }
                else {
                    data.status = req.body.status
                    data.save().then(async () => {
                        res.send({ success: true, status: 200, message: "Status Changed Successfull" })
                    }).catch((err) => {
                        res.send({ success: false, status: 500, message: err.message })
                    })
                }
            })
            .catch((err) => {
                res.send({ success: false, status: 500, message: err.message })
            })
    }
}





module.exports = { addTask, getAllTask, getSingleTask,updateTaskDetails,deleteTask,taskStatus }