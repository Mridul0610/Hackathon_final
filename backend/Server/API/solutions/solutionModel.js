const mongoose = require('mongoose')
const solutionSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'task' },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'event' },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'student', },
    solution: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    marks: [{ mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'mentor' }, score: { type: Number }, remarks: { type: String } }],
    status: { type: Boolean, default: true }
})
module.exports = mongoose.model('solution', solutionSchema)