const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    userType: { type: Number, default: 3 },
    IdProof: { type: String, default: '' },
    college: { type: String, default: '' },
    contact: { type: Number, },
    password: { type: String, default: '' },
    // gender: { type: String, default: '' },
    address: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }
})
module.exports = mongoose.model('student', studentSchema)