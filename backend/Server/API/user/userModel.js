const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'mentor' },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'student' },
    password: { type: String, default: '' },
    userType: { type: Number },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'true' }
})
module.exports = mongoose.model('user', userSchema)