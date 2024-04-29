const Solution = require('./solutionModel')
const Task = require('../Task/taskModel')
const Result = require('../Result/resultModel')


const uploadSolution = async (req, res) => {
    let validation = ''
    if (!req.body.taskId) {
        validation += 'Task ID is Required.'
    }
    if (!req.body.studentId) {
        validation += 'Student ID is Required.'
    }
    if (!req.body.solution) {
        validation += 'Solution is Required.'
    }
    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        Task.findOne({ _id: req.body.taskId }).then(async (data) => {
            if (data == null) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Task does not exist",
                })

            }
            else {
                let total = await Solution.countDocuments()
                let solution = new Solution()
                solution.autoId = total + 1
                solution.taskId = req.body.taskId
                solution.studentId = req.body.studentId
                solution.solution = req.body.solution
                solution.save().then((data) => {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Uploaded Successfully",
                        data: data
                    })

                }).catch((err) => {
                    res.send({ success: false, status: 500, message: err.message })

                })

            }
        }).catch((err) => {
            res.send({ success: false, status: 500, message: err.message })

        })

    }
}


const getAllSolutions = (req, res) => {
    Solution.find(req.body).populate('taskId').populate('studentId').sort({ createdAt: -1 })
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


const getSingleSolution = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is required"
    }

    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }
    else {
        Solution.findOne({ _id: req.body._id }).populate('taskId').populate('studentId')

            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 500, message: "Solution Does not exist" })
                }
                else
                    res.send({ success: true, status: 200, message: "Single Solution Loaded", data: data })
            })
            .catch((err) => {
                res.send({ success: false, status: 500, message: err.message })
            })
    }
}


const updateMarks = (req, res) => {

    let validation = ""
    if (!req.body._id) {
        validation += "_id is Required "
    }
    if (!req.body.mentorId) {
        validation += "mentorId is Required "
    }
    if (!req.body.score) {
        validation += "score is Required "
    }

    if (!!validation) {
        res.send({ success: false, status: 500, message: validation })
    }

    else {
        Solution.findOne({ _id: req.body._id }).then(async (data) => {
            if (data == null) {
                res.send({ success: false, status: 404, message: "Solution Does Not Exists" })
            }
            else {
                const existingMark = data.marks.find((mark) => mark.mentorId.equals(req.body.mentorId));
                if (existingMark) {
                    existingMark.score = req.body.score;
                    existingMark.save({ suppressWarning: true }).then(async (markss) => {
                        data.save().then(async () => {
                            await Result.findOne({ solutionId: req.body._id }).then(async (resultt) => {
                                let totalMarks = data.marks.reduce((acc, mark) => acc + mark.score, 0);
                                resultt.marksObtained = totalMarks;
                                await resultt.save().then(() => {
                                    res.send({ success: true, status: 200, message: 'Marks Updated', data: markss });

                                }).catch(() => {
                                    console.error(error);
                                    res.send({ success: false, status: 500, message: 'Internal Server Error', error: error });

                                })
                            })

                        }).catch((error) => {
                            console.error(error);
                            res.send({ success: false, status: 500, message: 'Internal Server Error', error: error });
                        });
                    }).catch((error) => {
                        console.error(error);
                        res.send({ success: false, status: 500, message: 'Internal Server Error', error: error });
                    });

                }
                else {
                    data.marks.push({ mentorId: req.body.mentorId, score: req.body.score, remarks: req.body.remarks })

                    await data.save().then(async () => {

                        await Result.findOne({ solutionId: req.body._id }).then(async (Res) => {
                            if (Res == null) {
                                let result = new Result()
                                result.solutionId = req.body._id
                                result.taskId = data.taskId
                                result.studentId = data.studentId
                                await Task.findOne({ _id: data.taskId }).then((task) => {
                                    result.eventId = task.eventId
                                }).catch((err) => {
                                    res.send({ success: false, status: 500, message: err.message })

                                })

                                let totalScore = data.marks.reduce((acc, mark) => acc + mark.score, 0);

                                result.marksObtained = totalScore

                                await result.save().then(() => {

                                    res.send({ success: true, status: 200, message: 'Marks Updated' });

                                }).catch((err) => {
                                    res.send({ success: false, status: 500, message: err.message })
                                })

                            }
                            else {
                                await Result.findOne({ solutionId: req.body._id }).then(async (Resu) => {
                                    await Solution.findOne({ _id: req.body._id }).then((doc) => {
                                        totalscore = doc.marks.reduce((acc, mark) => acc + mark.score, 0);
                                        Resu.marksObtained = totalscore
                                        Resu.save().then(() => {
                                            res.send({ success: true, status: 200, message: 'Marks Updated' });
                                        })
                                    })
                                })
                            }

                        }).catch((err) => {
                            res.send({ success: false, status: 500, message: err.message })

                        })
                    }).catch(error => {
                        res.send({ success: false, status: 500, message: error.message })
                    })

                }
            }
        }).catch(error => {
            res.send({ success: false, status: 500, message: error.message })
        })
    }
}







module.exports = { uploadSolution, getAllSolutions, getSingleSolution, updateMarks }