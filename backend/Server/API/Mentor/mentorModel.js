const mongoose = require('mongoose')
const mentorSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    userType: { type: Number, default: 2 },
    profilePic: { type: String, default: '' },
    designation: { type: String, default: '' },
    description: { type: String, default: 'No Description' },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'true' }
})
module.exports = mongoose.model('mentor', mentorSchema)