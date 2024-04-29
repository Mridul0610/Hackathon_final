const Student = require('./studentModel')
const User = require('../user/userModel')
const bcrypt = require('bcryptjs')


const addStudent = async (req, res) => {

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
    if (!req.body.IdProof) {
        validation += "ID_PROOF is Required "
    }
    if (!req.body.contact) {
        validation += "contact is Required "
    }
    // if (!req.body.gender) {
    //     validation += "gender is Required "
    // }
    if (!req.body.address) {
        validation += "address is Required "
    }
    if (!req.body.college) {
        validation += "college is Required "
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
            let total = await Student.countDocuments()
            let student = new Student()
            student.autoId = total + 1
            student.name = req.body.name
            student.email = req.body.email
            student.password = bcrypt.hashSync(req.body.password, 10)
            student.IdProof = req.body.IdProof
            student.contact = req.body.contact
            student.address = req.body.address
            student.college = req.body.college
            student.gender = req.body.gender
            student.userType = 3
            student.save()
                .then((savedStudent) => {
                    if (savedStudent.status == 'pending') {
                        res.send({
                            success: true,
                            status: 202,
                            message: " Student added. Wait For Account verification !",
                            data: savedStudent
                        })
                    }
                }).catch((err) => {
                    res.send({ success: false, status: 500, message: err.message })

                })
        }
    }

}


const studentVarification = (req, res) => {
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
        Student.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 500, message: "Student Does not exist" })
                }
                else {
                    data.status = req.body.status
                    data.save().then(async () => {
                        if (data.status == 'true') {
                            User.findOne({ email: data.email }).then((studentData) => {
                                if (studentData == null) {
                                    let user = new User()
                                    user.name = data.name
                                    user.email = data.email
                                    user.studentId = data._id
                                    user.password = data.password
                                    user.userType = 3
                                    user.save().then(() => {
                                        return res.send({
                                            success: true,
                                            status: 200,
                                            message: "Student Verified",
                                        })

                                    }).catch(() => {
                                        res.send({ success: false, status: 500, message: err.message })
                                    })

                                }
                                else {
                                    return res.send({
                                        success: false,
                                        status: 500,
                                        message: "Student already Verified",
                                    })

                                }


                            }).catch(() => {
                                res.send({ success: false, status: 500, message: err.message })

                            })
                        }
                        else {
                            return res.send({
                                success: false,
                                status: 500,
                                message: "Student has been verified",
                            })
                        }
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


const getSingleStudent = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is required"
    }
    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        Student.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 500, message: "Student Does not exist" })
                }
                else
                    res.send({ success: true, status: 200, message: "Single Student Loaded", data: data })
            })
            .catch((err) => {
                res.send({ success: false, status: 500, message: err.message })
            })
    }
}

const getAllStudents = (req, res) => {
    Student.find(req.body).sort({ createdAt: -1 })
        .then((data) => {
            res.send({
                success: true,
                status: 200,
                message: "All Students Loaded",
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



const updateStudentsDetails = (req, res) => {
    let validation = ''
    if (!req.body._id)
        validation += '_id is required'
    if (!!validation)
        res.send({ success: false, status: 500, message: validation })
    else {
        Student.findOne({ _id: req.body._id })
            .then(async result => {
                if (result == null)
                    res.send({ success: false, status: 500, message: 'No Student Found' })
                else {
                    if (!!req.body.name)
                        result.name = req.body.name
                    if (!!req.body.contact)
                        result.contact = req.body.contact
                    if (!!req.body.gender)
                        result.gender = req.body.gender
                    if (!!req.body.address) {
                        result.address = req.body.address
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





module.exports = { addStudent, studentVarification, getSingleStudent, getAllStudents, updateStudentsDetails}
