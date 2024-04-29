const ASSIGNEVENT = require('./assignEventModel')
const EVENT =  require('../Event/eventModel')


const addInEvent = async (req, res) => {
    let validation = ''
    if (!req.body.eventId || !req.body.studentId) {
        validation += 'Please make sure to fill out all fields.'
    }
    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        ASSIGNEVENT.findOne({ studentId: req.body.studentId, eventId: req.body.eventId }).then(async(event) => {
            if (event != null) {
                res.send({
                    success: false,
                    status: 500,
                    message: "You have already sent a request",
                   
                })
            }
            else{
                EVENT.findOne({ _id: req.body.eventId }).then((dataa) => {
                    if (dataa.availableSlots <= 0) {
                        return res.send({
                            success: false,
                            status: 500,
                            message: "No available slots for this event",
                        })
                    }
                })
                let total = await ASSIGNEVENT.countDocuments()
                let event = new ASSIGNEVENT()
                event.autoId = total + 1
                event.eventId = req.body.eventId
                event.studentId = req.body.studentId
                event.save().then((data) => {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Request sent",
                        data: data
                    })
        
                }).catch((err) => {
                    res.send({ success: false, status: 500, message: err.message })
        
                })

            }
        })
    }
}


const getAllAssignEvents = (req, res) => {
    ASSIGNEVENT.find(req.body).populate('studentId').populate('eventId').sort({ createdAt: -1 })
        .then((data) => {
            res.send({
                success: true,
                status: 200,
                message: "All Assigned Events Loaded",
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


const getSingleAssignEvent = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is required"
    }

    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        ASSIGNEVENT.findOne({ _id: req.body._id }).populate('eventId').populate('studentId')

            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 500, message: "Event Does not exist" })
                }
                else
                    res.send({ success: true, status: 200, message: "Single Event Loaded", data: data })
            })
            .catch((err) => {
                res.send({ success: false, status: 500, message: err.message })
            })
    }
}

const assignEventStatus = async(req, res) => {
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
        ASSIGNEVENT.findOne({ _id: req.body._id })
            .then(async (data) => {
                if (data == null) {
                    res.send({ success: false, status: 500, message: "Event Does not exist" })
                }
                else {
                    if (req.body.status == 'approve') {
                      await  EVENT.findOne({ _id: data.eventId }).then((event) => {
                            event.availableSlots -= 1
                            event.save().then(() => {
                                data.remarks = req.body.remarks
                                data.status = req.body.status
                                data.save().then(async () => {
                                    res.send({ success: true, status: 200, message: "Status Changed Successfull" })
                                }).catch((err) => {
                                    res.send({ success: false, status: 500, message: err.message })
                                })
                            })
                        })
                    }
                    else {
                        data.remarks = req.body.remarks
                        data.status = req.body.status
                        data.save().then(async () => {
                            res.send({ success: true, status: 200, message: "Status Changed Successfull" })
                        }).catch((err) => {
                            res.send({ success: false, status: 500, message: err.message })
                        })
                    }
                }
            })
            .catch((err) => {
                res.send({ success: false, status: 500, message: err.message })
            })
    }
}


module.exports = { addInEvent, getAllAssignEvents, getSingleAssignEvent, assignEventStatus }