const mongoose = require('mongoose')
const moment = require('moment');
const currentTime = moment();
const eventSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    eventTitle: { type: String, default: '' },
    mentorsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'mentor', }],
    startTime: {
        type: Date, 
        // validate: {
        //     validator: function (value) {
        //         return moment(value).isSameOrAfter(moment(), 'day'); // Check if the date is not in the past
        //     }, message: 'Date cannot be in the past'
        // }, 
        required: true
    },
    endTime: { type: Date, required: true },
    slots: { type: Number, default: 0, required: true },
    availableSlots: {type:Number, default:0},
    description: { type: String, default: 'No Description' },
    createdAt: { type: Date, default: Date.now },
    status: { type: Number, default: 1 } // 1-pending , 2-start , 3-end, 4-close
})
module.exports = mongoose.model('event', eventSchema)