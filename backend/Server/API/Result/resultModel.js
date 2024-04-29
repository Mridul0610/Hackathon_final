const mongoose = require('mongoose')
const resultSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'event' },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'task' },
    solutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'solution' },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'student' },
    marksObtained: { type: Number },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true }
})
module.exports = mongoose.model('result', resultSchema)