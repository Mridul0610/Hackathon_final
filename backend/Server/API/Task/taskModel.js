const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    eventId: { type: mongoose.Schema.Types.ObjectId, default: null, ref:'event' },
    taskTitle: { type: String, default: '' },
    description: { type: String, default: '' },
    duration: { type: String, default: '' },
    totalMarks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true }
})
module.exports = mongoose.model('task', taskSchema)