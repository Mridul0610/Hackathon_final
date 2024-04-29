const Event = require('../Event/eventModel')
const Student = require('../Student/studentModel')
const Mentro = require('../Mentor/mentorModel')
const Students = require('../Student/studentModel')
const AssignEvent = require('../assignEvents/assignEventModel')



const dashboard = async (req, res) => {
    let totalEvents = await Event.countDocuments()
    let totalStudents = await Student.countDocuments()
    let totalMentors = await Mentro.countDocuments()
    let studentsVarification = await Students.countDocuments({ status: 'pending' })
    let studentsApprovelInEvents = await AssignEvent.countDocuments({ status: 'pending' })

    res.send({
        success: true,
        status: 200,
        message: 'Welcome Admin',
        totalEvents: totalEvents,
        totalStudents: totalStudents,
        totalMentors: totalMentors,
        pendingStudentsVerifications: studentsVarification,
        pendingEventsApprovel: studentsApprovelInEvents
    })

}

const upComingEvents = async (req, res) => {
    try {
        const today = new Date();
        await Event.find({ status: 1 }).populate('mentorsId').sort('startTime').limit(3).then((upcomingEvents) => {
            return res.send({
                success: true,
                status: 200,
                message: "Success",
                data: upcomingEvents,
                total:upcomingEvents.length
            })


        }).catch((err) => {
            res.send({ success: false, status: 404, message: err.message })
        })

    }
    catch (err) {
        res.send({
            success: false,
            status: 500,
            message: err.message
        })

    }
}


module.exports = { dashboard, upComingEvents }