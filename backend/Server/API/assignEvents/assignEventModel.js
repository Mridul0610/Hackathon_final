const mongoose = require('mongoose')
const assignEventSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'event', },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'student', },
    remarks: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }
})
module.exports = mongoose.model('AssignEvent', assignEventSchema)