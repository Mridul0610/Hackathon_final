const Mentor = require('./mentorModel')
const User = require('../user/userModel')
const bcrypt = require('bcryptjs')


const addMentor = async (req, res) => {
    try{
        let validation = ""
        if (!req.body.name) {
            validation += "Name is Required "
        }
        if (!req.body.email) {
            validation += "email is Required "
        }
        if (!req.body.password) {
            validation += "password is Required "
        }
        if (!req.body.profilePic) {
            validation += "profilePic is Required "
        }
        if (!req.body.designation) {
            validation += "designation is Required "
        }
    
        if (!!validation) {
            res.send({ success: false, status: 500, message: validation })
        }
    
        else {
            let prev = await User.findOne({ email: req.body.email })
            if (prev != null) {
                res.send({ success: false, status: 500, message: "Email Already Exists" })
            }
            else {
                let total = await Mentor.countDocuments()
                let mentor = new Mentor()
                mentor.autoId = total + 1
                mentor.name = req.body.name
                mentor.email = req.body.email
                mentor.profilePic = req.body.profilePic
                mentor.designation = req.body.designation
                mentor.description = req.body.description
                mentor.userType = 2
                mentor.save().then((mentorData) => {
                    let user = new User()
                    user.name = req.body.name
                    user.email = req.body.email
                    user.password = bcrypt.hashSync(req.body.password, 10)
                    user.mentorId = mentorData._id
                    user.userType = 2
                    user.save().then(() => {
                        return res.send({
                            success: true,
                            status: 200,
                            message: "Mentor Added Successfully",
                            data: mentorData
                        })
                    }).catch((err) => {
                        res.send({ success: false, status: 500, message: err.message })
    
                    })
    
                })
                    .catch((err) => {
                        res.send({ success: false, status: 500, message: err.message })
                    })
            }
        }

    }
    catch(err){
        res.send({ success: false, status: 500, message: err.message })

    }
   
}



const getSingleMentor = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is required"
    }

    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        Mentor.findOne({ _id: req.body._id })

            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 500, message: "Mentor Does not exist" })
                }
                else
                    res.send({ success: true, status: 200, message: "Single Mentor Loaded", data: data })
            })
            .catch((err) => {
                res.send({ success: false, status: 500, message: err.message })
            })
    }
}

const getAllMentors = (req, res) => {
    Mentor.find(req.body).sort({ createdAt: -1 })

        .then((data) => {
            res.send({
                success: true,
                status: 200,
                message: "All Mentors Loaded",
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


const updateMentorDetails = (req, res) => {
    let validation = ''
    if (!req.body._id)
        validation += '_id is required'
    if (!!validation)
        res.send({ success: false, status: 500, message: validation })
    else {
        Mentor.findOne({ _id: req.body._id })
            .then(async result => {
                if (result == null)
                    res.send({ success: false, status: 500, message: 'No Mentor Found' })
                else {
                    if (!!req.body.name)
                        result.name = req.body.name
                    if (!!req.body.email)
                        result.email = req.body.email
                    if (!!req.body.designation)
                        result.designation = req.body.designation
                    if (!!req.body.description)
                        result.description = req.body.description
                    if (!!req.body.profilePic) {
                        // fs.unlinkSync('Server/Public/' + result.profilePic)
                        result.profilePic = req.body.profilePic
                    }

                    let prevMentor = await Mentor.findOne({ $and: [{ email: req.body.email }, { _id: { $ne: result._id } }] })
                    if (!!prevMentor)
                        res.send({ success: false, status: 500, message: 'Mentor Already exists with same email' })
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


const deleteMentor = (req, res) => {
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
        Mentor.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 500, message: "Mentor Does not exist" })
                }
                else {
                    data.status = req.body.status
                    data.save().then(async () => {
                        await User.findOne({ mentorId: req.body._id }).then((userData) => {
                            if (userData == null) {
                                res.send({ success: false, status: 500, message: "User Does not exist" })

                            }
                            else {
                                userData.status = req.body.status
                                userData.save().then((updatedData) => {
                                    res.send({ success: true, status: 200, message: "Updated Successfull" })
                                })
                                    .catch((err) => {
                                        res.send({ success: false, status: 500, message: err.message })
                                    })
                            }
                        })
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





module.exports = { addMentor,getSingleMentor,getAllMentors,updateMentorDetails,deleteMentor }

