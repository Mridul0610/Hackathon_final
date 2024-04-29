const Event = require('./eventModel')


const addEvent = async (req, res) => {
    let validation = ''
    if (!req.body.mentorsId) {
        validation = "mentorsId is required"
    }
    if (!req.body.startTime) {
        validation = "startTime is required"
    }
    if (!req.body.endTime) {
        validation = "endTime is required"
    }
    if (!req.body.slots) {
        validation = "slots is required"
    }
    if (!req.body.eventTitle) {
        validation = "eventTitle is required"
    }
    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        let total = await Event.countDocuments()
        let event = new Event()
        event.autoId = total + 1
        event.eventTitle = req.body.eventTitle
        event.mentorsId = req.body.mentorsId
        event.startTime = req.body.startTime
        event.endTime = req.body.endTime
        event.slots = req.body.slots
        event.availableSlots = req.body.slots
        event.description = req.body.description
        event.save().then((data) => {
            res.send({
                success: true,
                status: 200,
                message: "Event Added Successfully",
                data: data


            })

        }).catch((err) => {
            res.send({ success: false, status: 500, message: err.message })

        })

    }
}


const getAllEvents = (req, res) => {
    Event.find(req.body).populate('mentorsId').sort({ createdAt: -1 })
        .then((data) => {
            res.send({
                success: true,
                status: 200,
                message: "All Events Loaded",
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


const getSingleEvent = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is required"
    }

    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        Event.findOne({ _id: req.body._id }).populate('mentorsId')

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


const updateEventDetails = (req, res) => {
    let validation = ''
    if (!req.body._id)
        validation += '_id is required'
    if (!!validation)
        res.send({ success: false, status: 500, message: validation })
    else {
        Event.findOne({ _id: req.body._id })
            .then(async result => {
                if (result == null)
                    res.send({ success: false, status: 500, message: 'No Event Found' })
                else {
                    if (!!req.body.eventTitle)
                        result.eventTitle = req.body.eventTitle
                    if (!!req.body.startTime)
                        result.startTime = req.body.startTime
                    if (!!req.body.endTime)
                        result.endTime = req.body.endTime
                    if (!!req.body.mentorsId)
                        result.mentorsId = req.body.mentorsId
                    if (!!req.body.slots)
                        result.slots = req.body.slots
                    if (!!req.body.description) {
                        result.description = req.body.description
                    }
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


const deleteEvent = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is required"
    }

    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        Event.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false,
                        status: 500,
                        message: "Event Does not exist"
                    })
                }
                else {
                    Event.deleteOne({ _id: req.body._id })
                        .then((updatedData) => {
                            res.send({ success: true, status: 200, message: "Event Deleted", data: updatedData })
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

const eventStatus = (req, res) => {
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
        Event.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 500, message: "Event Does not exist" })
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

module.exports = { addEvent, getAllEvents, getSingleEvent, updateEventDetails, deleteEvent, eventStatus }
